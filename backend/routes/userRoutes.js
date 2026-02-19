const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  addAddress,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/address", protect, addAddress);

module.exports = router;
