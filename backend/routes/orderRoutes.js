const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  resumePayment,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

/**
 * ORDER ROUTING SYSTEM
 * Logical Connectivity: Synchronized with UserDashboard API calls
 */

// Global Middleware to protect all order routes
router.use(protect);

// @route   POST /api/orders/
// @desc    Initiate a new print order (Strictly Online)
router.post("/", createOrder);

// @route   GET /api/orders/my-orders
// @desc    Fetch history for the logged-in user
// FIX: Using hyphen to match frontend Dashboard request
router.get("/my-orders", getMyOrders);

// @route   POST /api/orders/resume-payment/:id
// @desc    Renew Razorpay session for pending orders
router.post("/resume-payment/:id", resumePayment);

module.exports = router;
