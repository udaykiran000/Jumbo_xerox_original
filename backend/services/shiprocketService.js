const axios = require("axios");

let token = null;

const authenticate = async () => {
  if (process.env.SHIPROCKET_TEST_MODE === "true") {
    console.log("[SHIPROCKET-TEST] Skipping Authentication");
    return "TEST_TOKEN";
  }

  try {
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }
    );
    token = response.data.token;
    return token;
  } catch (error) {
    console.error(
      "Shiprocket Auth Error:",
      error.response?.data || error.message
    );
    throw new Error("Shiprocket Authentication Failed");
  }
};

const createOrder = async (order) => {
  if (process.env.SHIPROCKET_TEST_MODE === "true") {
    console.log("[SHIPROCKET-TEST] Creating Mock Order for:", order._id);
    return {
      shipment_id: `MOCK_SHIP_${Math.floor(Math.random() * 100000)}`,
      order_id: `MOCK_ORDER_${Math.floor(Math.random() * 100000)}`,
    };
  }

  if (!token) await authenticate();

  // Map your Order model to Shiprocket structure
  // This is a minimal example; you may need to map more fields
  const orderData = {
    order_id: order._id,
    order_date: new Date(order.createdAt).toISOString().split("T")[0],
    pickup_location: "Primary", // You need to set this in Shiprocket Panel
    billing_customer_name: order.user.name,
    billing_last_name: "",
    billing_address: order.shippingAddress.street,
    billing_address_2: "",
    billing_city: order.shippingAddress.city,
    billing_pincode: order.shippingAddress.pincode,
    billing_state: "Maharashtra", // Needs to be dynamic or fixed based on your region
    billing_country: "India",
    billing_email: "customer@example.com", // Add email to your User model if needed
    billing_phone: order.user.phone,
    shipping_is_billing: true,
    order_items: [
      {
        name: "Print Service",
        sku: "PRINT_SRV",
        units: 1,
        selling_price: order.totalAmount,
      },
    ],
    payment_method: order.paymentStatus === "Paid" ? "Prepaid" : "COD",
    sub_total: order.totalAmount,
    length: 10,
    breadth: 10,
    height: 10,
    weight: 0.5,
  };

  try {
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      orderData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      await authenticate(); // Retry once
      return createOrder(order);
    }
    console.error(
      "Shiprocket Order Error:",
      error.response?.data || error.message
    );
    throw new Error("Shiprocket Order Creation Failed");
  }
};

const generateAWB = async (shipmentId) => {
  if (process.env.SHIPROCKET_TEST_MODE === "true") {
    console.log("[SHIPROCKET-TEST] Generating Mock AWB for:", shipmentId);
    return {
      awb_code: `MOCK_AWB_${Math.floor(Math.random() * 1000000000)}`,
      courier_name: "Test Courier Service",
    };
  }

  if (!token) await authenticate();

  try {
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/courier/assign/awb",
      { shipment_id: shipmentId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.response.data;
  } catch (error) {
    console.error("Shiprocket AWB Error:", error.response?.data || error.message);
    throw new Error("Shiprocket AWB Generation Failed");
  }
};

module.exports = { authenticate, createOrder, generateAWB };
