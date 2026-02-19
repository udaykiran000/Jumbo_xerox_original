const Order = require("../models/Order");
const mongoose = require("mongoose");
const razorpayInstance = require("../config/razorpay");
const {
  calculateBackendPrice,
  DELIVERY_CHARGE,
} = require("../utils/priceCalculator");

/**
 * ORDER CONTROLLER - JUMBO XEROX
 * Integrity: Restored original validations for Quick Print, Plan Printing, and Business Cards.
 * Logic Update: Enforced Online-only payment and added Resume Payment feature.
 */

// 1. CREATE NEW ORDER (Restored Original Validations)
exports.createOrder = async (req, res) => {
  console.log("\n--- [START] New Order Request ---");
  try {
    const { files, details, totalAmount, deliveryMode, serviceType } = req.body;

    // Log for debugging (Restored)
    console.log("SERVICE TYPE:", serviceType);
    console.log("RAW BODY DETAILS:", JSON.stringify(details, null, 2));

    const pages = Number(details.pages || details.totalPages) || 0;
    const copies = Number(details.qty || details.copies) || 1;

    // Basic Validations (Restored)
    if (pages <= 0 || copies <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or copy count. Must be greater than 0.",
      });
    }

    // 2. Service Specific Validations (INTEGRITY RESTORED)
    console.log("[STEP 2] validating service specific details");
    let isMissing = false;
    let missingInfo = {};

    if (serviceType === "Quick Print") {
      if (!details.printType || !details.size || !details.media) {
        isMissing = true;
        missingInfo = {
          printType: details.printType,
          size: details.size,
          media: details.media,
        };
      }
    } else if (serviceType === "Plan Printing") {
      if (!details.size || !details.media) {
        isMissing = true;
        missingInfo = { size: details.size, media: details.media };
      }
    } else if (serviceType === "Business Card") {
      if (!details.paper || !details.lamination || !details.sides) {
        isMissing = true;
        missingInfo = {
          paper: details.paper,
          lamination: details.lamination,
          sides: details.sides,
        };
      }
    }

    if (isMissing) {
      console.error("ORDER-FAIL: Missing required fields", missingInfo);
      return res.status(400).json({
        success: false,
        message: `Missing required fields for ${serviceType}.`,
      });
    }

    // 3. Price Calculation Logic (Restored)
    console.log("[STEP 3] Calculating Price");
    let basePrice = calculateBackendPrice(serviceType, pages, copies, details);

    if (basePrice === -1) {
      return res.status(400).json({
        success: false,
        message: `Invalid configuration for ${serviceType}.`,
      });
    }

    let serverSidePrice = basePrice;
    if (deliveryMode === "Delivery") {
      serverSidePrice += DELIVERY_CHARGE; // 90rs logic
    }

    // Security Check: Price Mismatch Validation (Restored)
    if (Math.abs(serverSidePrice - totalAmount) > 5) {
      return res.status(400).json({
        success: false,
        message: `Price mismatch detection. Please try again.`,
      });
    }

    // DB Preparation (Enforced Online Only)
    console.log("[STEP 4] Preparing DB Object");
    if (!req.user || !req.user._id) {
       throw new Error("User not authenticated or req.user missing");
    }

    const baseOrderData = {
      user: req.user._id,
      files,
      serviceType: serviceType,
      details: { ...details, pages, copies },
      totalAmount: serverSidePrice,
      paymentMethod: "Online", // Enforced for Digital Integrity
      deliveryMode,
      shippingAddress: req.body.shippingAddress || null,
      pickupDetails: req.body.pickupDetails || null,
      paymentStatus: "Pending",
      status: "Pending",
    };

    // 4. Handle Online Payment (Razorpay)
    console.log("[STEP 5] Preparing Payment");
    const options = {
      amount: Math.round(serverSidePrice * 100), // Convert to Paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    // Create Razorpay Order
    console.log("[STEP 5.1] Calling Razorpay API");
    
    let rzpOrder;
    try {
      if (process.env.PAYMENT_TEST_MODE === "true") {
         console.log("[PAYMENT-TEST] Generatng Mock Razorpay Order...");
         rzpOrder = {
            id: `order_test_${Date.now()}`,
            entity: "order",
            amount: options.amount,
            amount_paid: 0,
            amount_due: options.amount,
            currency: "INR",
            receipt: options.receipt,
            status: "created",
            attempts: 0,
            notes: [],
            created_at: Math.floor(Date.now() / 1000),
         };
      } else {
         rzpOrder = await razorpayInstance.orders.create(options);
         console.log("Razorpay Response Success");
      }
    } catch (rzpError) {
      console.error("Razorpay API Failed:", rzpError);
      throw new Error(`Razorpay Creation Failed: ${rzpError.message}`);
    }
    
    console.log("[STEP 6] Saving to DB");
    
    // Save Order to MongoDB with Razorpay ID
    const newOrder = await Order.create({
      ...baseOrderData,
      razorpayOrderId: rzpOrder.id,
    });

    console.log("SUCCESS: Online Order Ready, Razorpay ID:", rzpOrder.id);

    return res.status(201).json({
      success: true,
      razorpayOrder: rzpOrder,
      order: newOrder,
    });
  } catch (error) {
    console.error("CRITICAL ORDER ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. RESUME PAYMENT (Integrated for Dashboard 'Pay Now' Feature)
exports.resumePayment = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    if (order.paymentStatus === "Paid")
      return res.status(400).json({ message: "Order already paid" });

    // Check if assets were purged by Cron (Security Handshake)
    if (order.filesDeleted) {
      return res.status(400).json({
        success: false,
        message: "Payment window closed: Files purged after 24h limit.",
      });
    }

    const options = {
      amount: Math.round(order.totalAmount * 100),
      currency: "INR",
      receipt: `re_receipt_${Date.now()}`,
    };

    const rzpOrder = await razorpayInstance.orders.create(options);
    order.razorpayOrderId = rzpOrder.id; // Refresh Razorpay Order ID
    await order.save();

    res.json({
      success: true,
      razorpayOrder: rzpOrder,
      order,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to resume payment session." });
  }
};

// 3. FETCH USER ORDERS (Restored original lean query)
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .lean();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};
