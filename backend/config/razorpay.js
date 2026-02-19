const Razorpay = require("razorpay");
require("dotenv").config();

// Real Razorpay Instance 
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpayInstance;