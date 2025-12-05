const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserProfile };
