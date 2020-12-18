const express = require("express");
const router = express.Router();

// Middleware
const auth = require("../../middleware/auth");

// Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// ------------Routes ------------

// ----Get current useres profile
// GET api/profile/
// private
router.get("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["username", "image"]);
    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

//
