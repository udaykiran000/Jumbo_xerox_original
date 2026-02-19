const parseBool = (val) => String(val).toLowerCase().trim() === "true";

exports.getConfig = (req, res) => {
  /* console.log("[DEBUG-CONFIG] Env Vars Check:", {
    OTP: process.env.OTP_TEST_MODE,
    PAYMENT: process.env.PAYMENT_TEST_MODE,
    SHIPPING: process.env.SHIPPING_MODE
  }); */
  
  res.json({
    otpTestMode: parseBool(process.env.OTP_TEST_MODE),
    paymentTestMode: parseBool(process.env.PAYMENT_TEST_MODE),
    shippingMode: process.env.SHIPPING_MODE,
  });
};
