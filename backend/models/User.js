const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    role: { type: String, default: "user" },
    addresses: [
      // Address array
      {
        street: String,
        city: String,
        state: String,
        pincode: String,
        isDefault: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
