const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    files: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    serviceType: { type: String, default: "Quick Print" },

    details: {
      pages: { type: Number, required: true },
      copies: { type: Number, default: 1 },
      printType: String,
      size: String,
      media: String,
      binding: String,
      lamination: String,
      cover: String,
      orientation: String, // Orientation added
      instructions: String,
    },

    totalAmount: { type: Number, required: true },

    deliveryMode: {
      type: String,
      enum: ["Pickup", "Delivery"],
      default: "Pickup",
    },

    // Snapshot for Home Delivery
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },

    // Snapshot for Store Pickup (Humanised Feature)
    pickupDetails: {
      name: String,
      phone: String,
    },

    paymentMethod: { type: String, enum: ["Online", "Cash"], required: true },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Cancelled", "Archived"],
      default: "Pending",
    },

    razorpayOrderId: { type: String },
    paymentId: { type: String },
    shipmentId: { type: String },
    awbNumber: { type: String },
    courierName: { type: String },
    filesDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
