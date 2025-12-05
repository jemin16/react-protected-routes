const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

// GET /api/users/profile
router.get("/profile", auth, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
