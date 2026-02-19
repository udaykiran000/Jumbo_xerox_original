require("dotenv").config();
const { sendSMS } = require("../services/smsService");

const testSMS = async () => {
  const phone = "9876543210"; // Replace with user's phone if known, or ask. 
  // Ideally, I'd ask the user for a number, but for now I'll use a placeholder or try to read from a recent log if possible.
  // Actually, let's use a dummy number that is valid format. 
  // Better: I will ask the user to run this script with their number.
  
  // For this script to be useful immediately without user input, I'll use the format check primarily.
  // However, to test the Gateway, I need a real number. 
  // I will make the script take a command line argument.
  
  const targetPhone = process.argv[2];

  if (!targetPhone) {
    console.log("Usage: node scripts/test-sms-real.js <mobile_number>");
    process.exit(1);
  }

  console.log(`Testing SMS to ${targetPhone}...`);
  console.log("Environment Config:");
  console.log("BASE_URL:", process.env.SMS_BASE_URL);
  console.log("USERNAME:", process.env.SMS_USERNAME);
  console.log("SENDER_ID:", process.env.SMS_SENDER_ID);
  
  // Normalize internally for the script's debug URL too, to match sendSMS logic
  const normalize = (p) => {
      let cleaned = p.toString().replace(/\D/g, "");
      if (cleaned.length === 10) return "91" + cleaned;
      return cleaned;
  };
  const intlTarget = normalize(targetPhone);

  const params = {
    username: process.env.SMS_USERNAME,
    apikey: process.env.SMS_API_KEY,
    mobile: intlTarget, // Use normalized number (91...)
    senderid: process.env.SMS_SENDER_ID, // Matches old working file
    templateid: process.env.SMS_TEMPLATE_ID,
    message: `Dear User, Your Jumbo Xerox App verification OTP Code is 123456. Please do not share this OTP with anyone.`,
  };

  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `${process.env.SMS_BASE_URL}?${queryString}`;
  
  console.log("--- DEBUG URL (Copy and try in browser if script fails) ---");
  console.log(fullUrl);
  console.log("-----------------------------------------------------------");

  try {
    const response = await sendSMS(targetPhone, "123456");
    console.log("SMS Sent Successfully!");
    console.log("Response:", JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("SMS Failed:", error.message);
    if (error.response) {
      console.error("API Response Status:", error.response.status);
      console.error("API Response Data:", error.response.data);
    }
  }
};

testSMS();
