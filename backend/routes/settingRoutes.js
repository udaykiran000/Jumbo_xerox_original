const express = require("express");
const router = express.Router();
const { getVisitorCount, incrementVisitorCount } = require("../controllers/settingController");

router.get("/visitor-count", getVisitorCount);
router.post("/visitor-count", incrementVisitorCount);

module.exports = router;
