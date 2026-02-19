const User = require("../models/User");

// Get Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Profile (Name & Phone)
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      const updatedUser = await user.save();
      res.json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ message: "Update Failed" });
  }
};

// Add Address
exports.addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.addresses.push(req.body);
    await user.save();
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: "Address add failed" });
  }
};
