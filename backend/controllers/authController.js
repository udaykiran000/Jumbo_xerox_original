const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendSMS } = require("../services/smsService");



// UPDATED: generateToken now accepts 'phone' to sync with Frontend Auth State
const generateToken = (id, name, role, phone) => {
  return jwt.sign({ id, name, role, phone }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// PHASE 1: Pre-Registration & OTP Trigger (Handshake)
exports.registerRequest = async (req, res) => {
  console.log("\n--- [START] Register OTP Request ---");
  const { name, email, phone, password } = req.body;

  try {
    // Check if user already exists (Email or Phone collision check)
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or Phone already registered.",
      });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Clear old session and save fresh OTP
    await OTP.findOneAndDelete({ phone });
    await OTP.create({ phone, otp: otpCode });

    // Send SMS via Verified Gateway (Production Mode)
    // Check Granular Flag: OTP_TEST_MODE
    if (process.env.OTP_TEST_MODE !== "true") {
      await sendSMS(phone, otpCode);
      res.json({ success: true, message: "Verification code sent to mobile." });
    } else {
      // Test Mode: Return OTP in response
      console.log(`[TEST-MODE] OTP for ${phone}: ${otpCode}`);
      res.json({
        success: true,
        message: "Test Mode: OTP captured.",
        otp: otpCode, // Send to frontend
      });
    }
    console.log(`DEBUG: OTP ${otpCode} sent to ${phone}`);
  } catch (error) {
    console.error("DEBUG: Register Request Error ->", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// PHASE 2: Verification & Account Creation (Finalizing Identity)
exports.registerVerify = async (req, res) => {
  console.log("\n--- [START] Register Final Verification ---");
  const { name, email, phone, password, otp } = req.body;

  try {
    // 1. Logic Integrity: Verify OTP existence
    const otpRecord = await OTP.findOne({ phone, otp });
    if (!otpRecord) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or Expired OTP" });
    }

    // 2. Hash Security Key
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create User (Identity is now verified)
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "user",
    });

    // 4. Maintenance: Cleanup verified OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    // 5. Holistic Sync: Token now carries 'phone' field for Frontend bypass
    const token = generateToken(user._id, user.name, user.role, user.phone);

    console.log(`SUCCESS: User ${user.email} verified and created.`);
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
    console.error("DEBUG: Register Verify Error ->", error.message);
    res
      .status(500)
      .json({ success: false, message: "Registration Finalization Failed" });
  }
};

// LOGIN LOGIC (Standard Credentials Check)
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Holistic Sync: Passing phone to token so Checkout knows it's a verified profile
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
    res.status(500).json({ message: error.message });
  }
};
