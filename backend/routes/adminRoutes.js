const express = require("express");
const router = express.Router();
const {
  getAdminStats,
  getAllOrders,
  getOrdersForDeletion,
  getOrderById,
  getAllUsers,
  addUser,
  deleteUser,
  changeAdminPassword,
  updateAdminProfile,
  deleteFilesManually,
  getContactMessages,
  markMessageRead,
  adminSearch,
  createPublicContact,
  sendOrderOTP,
  verifyOrderOTP,
  updateOrderStatus,
  toggleUserStatus,
  createShipment,
  getShipmentLabel,
  getShipmentTracking,
} = require("../controllers/adminController");

const { downloadOrderZip } = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// --- 1. PUBLIC ROUTES (No Token Required) ---
router.post("/public/contact", createPublicContact);

// --- 2. OTP ROUTES (Accessible by any LOGGED-IN user) ---
router.post("/otp/send", protect, sendOrderOTP);
router.post("/otp/verify", protect, verifyOrderOTP);

// --- 3. PROTECTED ADMIN ROUTES (Only for Admin Role) ---
router.use(protect, admin);

router.get("/stats", getAdminStats);
router.get("/search", adminSearch);

router.get("/orders", getAllOrders);
router.get("/orders-for-deletion", getOrdersForDeletion);
router.get("/order/:id", getOrderById);
router.put("/order/:id", updateOrderStatus);
router.delete("/order/files/:orderId", deleteFilesManually);

// Shipment Routes
router.post("/shipment/create", createShipment);
router.get("/shipment/label/:orderId", getShipmentLabel);
router.get("/shipment/track/:orderId", getShipmentTracking);

// Dedicated Zip Download Route
router.get("/download-zip/:orderId", downloadOrderZip);

// User Management Routes
router.get("/users", getAllUsers);
router.post("/users", addUser);
router.patch("/user/toggle/:id", toggleUserStatus); // Logic Consolidated Here
router.delete("/user/:id", deleteUser);

// Admin Profile & Settings
router.put("/profile/update", updateAdminProfile);
router.post("/settings/change-password", changeAdminPassword);

// Contact Messages
router.get("/messages", getContactMessages);
router.patch("/messages/:id/read", markMessageRead);

module.exports = router;
