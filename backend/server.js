require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { errorHandler } = require("./middleware/errorMiddleware");
const { startCronJobs } = require("./services/cronService");

const app = express();

// 1. Middleware Settings
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

// 2. Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

startCronJobs();

// 3. Static Files (Uploads)
const uploadsPath = path.join(__dirname, "uploads", "files");
app.use("/api/uploads/files", express.static(uploadsPath));
app.use("/uploads/files", express.static(uploadsPath));
app.use("/api/uploads", express.static(uploadsPath));
app.use("/uploads", express.static(uploadsPath));

// 4. Static Files (Frontend Build Path)

const buildPath = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(buildPath));

// 5. API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/config", require("./routes/configRoutes"));

// 6. Catch-all Middleware (EXPRESS 5 FIX)

app.use((req, res, next) => {
  
  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      success: false,
      message: `API Route ${req.path} not found`,
    });
  }

  
  res.sendFile(path.join(buildPath, "index.html"), (err) => {
    if (err) {
    
      next();
    }
  });
});

// 7. Error Handling Middleware
app.use(errorHandler);

// 8. Server Start
// 8. Server Start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`[DEBUG] Server restarted at ${new Date().toISOString()} (Log Check)`);
});