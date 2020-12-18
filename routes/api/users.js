const express = require("express");
const router = express.Router();

// Middleware
const auth = require("../../middleware/auth");

// Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

router.delete("/", auth, async (req, res) => {
  try {
    // Delete Profile + User
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User deleted " });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
