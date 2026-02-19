require("dotenv").config();
const mongoose = require("mongoose");
const Order = require("./models/Order");
const Contact = require("./models/Contact");

const checkCounts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB");

    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    const unreadMessages = await Contact.countDocuments({ isRead: false });
    const pendingShipments = await Order.countDocuments({
      paymentStatus: "Paid",
      status: "Completed",
      deliveryMode: "Delivery",
      shipmentId: { $in: [null, ""] },
    });

    console.log("--- NOTIFICATION COUNTS ---");
    console.log("Pending Orders:", pendingOrders);
    console.log("Unread Messages:", unreadMessages);
    console.log("Pending Shipments:", pendingShipments);
    console.log("---------------------------");

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
};

checkCounts();
