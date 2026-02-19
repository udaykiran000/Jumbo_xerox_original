const Setting = require("../models/Setting");

// Get visitor count
exports.getVisitorCount = async (req, res) => {
  try {
    let visitorSetting = await Setting.findOne({ key: "visitorCount" });
    
    // If not exists, create it with initial value
    if (!visitorSetting) {
      visitorSetting = await Setting.create({
        key: "visitorCount",
        value: 664, // Initial value as per frontend default
        description: "Total count of website visitors",
      });
    }

    res.status(200).json({ count: visitorSetting.value });
  } catch (error) {
    console.error("Error fetching visitor count:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Increment visitor count
exports.incrementVisitorCount = async (req, res) => {
  try {
    const visitorSetting = await Setting.findOneAndUpdate(
      { key: "visitorCount" },
      { $inc: { value: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    
    // Check if it was upserted (created new) and if value is 1 (meaning it started from 0, but we want 664 + 1)
    // Actually simpler: if upserted logic above might start at 1 if default not set correctly in update.
    // Let's ensure if it was just created it starts higher if needed, but for now standard increment is fine.
    // To respect the initial "664", we can rely on getVisitorCount creating it first, or just handle it here.
    
    if (visitorSetting.value === 1) {
        // If it was *just* created by this increment, it might be 1. 
        // Let's force it to 665 (664 + 1) if we want to maintain that base.
        // However, for simplicity, let's just let it be a strict counter. 
        // If user wants to seed it, they can. Or we can Seed it here.
         await Setting.findOneAndUpdate(
            { key: "visitorCount", value: 1 }, 
            { value: 665 } // 664 + 1
         );
         return res.status(200).json({ count: 665 });
    }

    res.status(200).json({ count: visitorSetting.value });
  } catch (error) {
    console.error("Error incrementing visitor count:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
