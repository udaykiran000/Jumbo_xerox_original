const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/auth';
const TEST_PHONE = '8886295065'; // Using the number you confirmed works

async function testOTPLogin() {
    console.log("1. Requesting OTP for Login...");
    try {
        const reqRes = await axios.post(`${BASE_URL}/login-otp-request`, { phone: TEST_PHONE });
        console.log("Response:", reqRes.data);
    } catch (err) {
        console.error("Request Failed:", err.response ? err.response.data : err.message);
        return;
    }

    // In a real scenario, we'd wait for SMS.
    // For this test, I'll ask you to enter the OTP you receive manually if needed, 
    // OR we can manually inspect the DB. 
    // Since I can't interactively ask for input easily in this script run mode, 
    // I will stop here and ask you to verify you got the SMS.
    console.log("\nIf you received an SMS, the Request endpoint is working.");
    console.log("To fully test verify, you would use:");
    console.log(`curl -X POST ${BASE_URL}/login-otp-verify -H "Content-Type: application/json" -d '{"phone": "${TEST_PHONE}", "otp": "<YOUR_OTP>"}'`);
}

testOTPLogin();
