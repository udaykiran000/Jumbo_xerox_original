const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true }, // Order, Merge, Cleanup, User
  message: { type: String, required: true },
  status: { type: String, default: "success" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Activity", activitySchema);
