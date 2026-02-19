const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { 
  getUploadStatus, 
  uploadChunk, 
  mergeChunks, 
  downloadOrderZip,
  checkFileAvailability 
} = require("../controllers/uploadController");

router.get("/status", getUploadStatus);
router.post("/chunk", uploadChunk);
router.post("/merge", mergeChunks);
router.get("/download-zip/:orderId", downloadOrderZip);
router.get("/check-files/:orderId", checkFileAvailability);

module.exports = router;