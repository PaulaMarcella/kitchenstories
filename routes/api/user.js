const express = require("express");
const router = express.Router();

// Packages

// Middleware
const auth = require("../../middleware/auth");

// Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// ----Load logged in user from token
// GET api/user
// private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500, "Server Error");
  }
});

// ----Load logged in user from token
// DELETE api/user/
// private
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
