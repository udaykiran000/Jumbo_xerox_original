module.exports = {
  sendSMS: async (phone, message) => {
    console.log(`Mock SMS to ${phone}: ${message}`);
    return true;
  },
};
