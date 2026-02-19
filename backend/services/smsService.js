const axios = require("axios");

// SMS GATEWAY CONFIG
const SMS_CONFIG = {
  username: process.env.SMS_USERNAME,
  apikey: process.env.SMS_API_KEY,
  sender: process.env.SMS_SENDER_ID,
  templateid: process.env.SMS_TEMPLATE_ID,
  campid: process.env.SMS_CAMP_ID, // Added from your old project
  baseUrl: process.env.SMS_BASE_URL,
};

/**
 * Normalize phone to 12 digits (91 prefix)
 */
const normalizePhone = (phone) => {
  let p = phone.toString().replace(/\D/g, ""); 
  if (p.length === 10) return "91" + p;
  if (p.length === 12 && p.startsWith("91")) return p;
  return null;
};

/**
 * Send OTP via smslogin.co API using Campaign ID
 */
const sendSMS = async (mobile, otpCode) => {
  const intlMobile = normalizePhone(mobile);
  
  if (!intlMobile) {
    console.error("[DEBUG-SMS-ERR]: Invalid phone format:", mobile);
    throw new Error("Invalid phone number format");
  }

  // CRITICAL: Ensure this matches your DLT approved template exactly
  const message = `Dear User, Your Jumbo Xerox App verification OTP Code is ${otpCode}. Please do not share this OTP with anyone.`;

  try {
    const response = await axios.get(SMS_CONFIG.baseUrl, {
      params: {
        username: SMS_CONFIG.username,
        apikey: SMS_CONFIG.apikey,
        mobile: intlMobile,
        senderid: SMS_CONFIG.sender, // Changed from 'sender' to 'senderid' based on reference
        templateid: SMS_CONFIG.templateid,
        message: message,
        // type: "text" // Reference file does not have 'type', removing it to be safe
      },
    });

    // If successful, response usually contains a message ID or success status
    return response.data;
  } catch (error) {
    console.error("SMS Gateway Error:", error.message);
    throw new Error("SMS Gateway Connection Failed");
  }
};

module.exports = { sendSMS };