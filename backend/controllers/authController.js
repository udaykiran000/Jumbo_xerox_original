const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendSMS } = require("../services/smsService");

// Generate JWT Token with user identity
const generateToken = (id, name, role, phone) => {
  return jwt.sign({ id, name, role, phone }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// PHASE 1: Pre-Registration & OTP Trigger
exports.registerRequest = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // 1. Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or Phone already registered.",
      });
    }

    // 2. Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Update or Create OTP record in Database
    await OTP.findOneAndDelete({ phone });
    await OTP.create({ phone, otp: otpCode });

    // 4. Handle SMS Delivery based on Test Mode Flag
    if (process.env.OTP_TEST_MODE === "true") {
      console.log(`[TEST-MODE] OTP for ${phone}: ${otpCode}`);
      return res.json({
        success: true,
        message: "Test Mode: OTP captured.",
        otp: otpCode, // Only sent to frontend for testing
      });
    } else {
      await sendSMS(phone, otpCode);
      return res.json({ 
        success: true, 
        message: "Verification code sent to mobile." 
      });
    }
  } catch (error) {
    console.error("Register Request Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// PHASE 2: Verification & Account Creation
exports.registerVerify = async (req, res) => {
  const { name, email, phone, password, otp } = req.body;

  try {
    // 1. Validate OTP from Database
    const otpRecord = await OTP.findOne({ phone, otp });
    if (!otpRecord) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid or Expired OTP" 
      });
    }

    // 2. Security: Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create Verified User
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "user",
    });

    // 4. Cleanup: Remove used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    // 5. Generate session token
    const token = generateToken(user._id, user.name, user.role, user.phone);

    res.json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Register Verify Error:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Registration Finalization Failed" 
    });
  }
};

// LOGIN LOGIC
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.name, user.role, user.phone);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// -------------------------------------------------------------------------
// NEW: OTP LOGIN FLOW (Request)
// -------------------------------------------------------------------------
exports.loginOTPRequest = async (req, res) => {
  const { phone } = req.body;
  
  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "Mobile number not registered." });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP (Reuse Schema)
    await OTP.findOneAndDelete({ phone });
    await OTP.create({ phone, otp: otpCode });

    if (process.env.OTP_TEST_MODE === "true") {
      console.log(`[TEST-MODE] OTP for ${phone}: ${otpCode}`);
      return res.json({
        success: true,
        message: "Test Mode: OTP captured.",
        otp: otpCode,
      });
    } else {
      // Send real SMS
      await sendSMS(phone, otpCode);
      return res.json({ 
        success: true, 
        message: "OTP sent to your mobile." 
      });
    }

  } catch (error) {
    console.error("Login OTP Request Error:", error.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// -------------------------------------------------------------------------
// NEW: OTP LOGIN FLOW (Verify)
// -------------------------------------------------------------------------
exports.loginOTPVerify = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const otpRecord = await OTP.findOne({ phone, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or Expired OTP" });
    }

    const user = await User.findOne({ phone });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Cleanup
    await OTP.deleteOne({ _id: otpRecord._id });

    // Generate Token
    const token = generateToken(user._id, user.name, user.role, user.phone);

    res.json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token,
    });

  } catch (error) {
    console.error("Login OTP Verify Error:", error.message);
    res.status(500).json({ message: "Login failed" });
  }
};