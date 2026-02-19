const express = require("express");
const router = express.Router();
const {
  registerRequest,
  registerVerify,
  login,
} = require("../controllers/authController");

/**
 * AUTHENTICATION ROUTES
 * System: Jumbo Xerox Identity Management
 */

// 1. Signup Phase 1: Validate details and trigger OTP
// Logic: Checks for existing user and sends SMS via smslogin.co
router.post("/register-request", registerRequest);

// 2. Signup Phase 2: Verify OTP and create final User record
// Logic: Hashes password and generates JWT token upon successful verification
router.post("/register-verify", registerVerify);

// 3. Standard Login
// Logic: Traditional email/password authentication
router.post("/login", login);

// 4. OTP Login (Request & Verify)
const { loginOTPRequest, loginOTPVerify } = require("../controllers/authController");
router.post("/login-otp-request", loginOTPRequest);
router.post("/login-otp-verify", loginOTPVerify);

module.exports = router;
