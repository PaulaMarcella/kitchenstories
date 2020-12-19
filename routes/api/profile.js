const express = require("express");
const router = express.Router();

// Packages

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
    })
      .populate("user", ["username", "image"])
      .populate("savedRecipes");
    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ----Get all profiles
// GET api/profile/all
router.get("/all", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "username",
      "image"
    ]);
    if (!profiles)
      return res.status(400).json({ msg: "No Profiles not found" });
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ----Get some useres profile by Id
// GET api/profile/:userId
router.get("/user/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId
    }).populate("user", ["username", "image"]);
    if (!profile)
      return res.status(400).json({ msg: "Profile for user not found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ---- Edit current users profile
// PATCH api/profile/
// private
router.patch("/", auth, async (req, res) => {
  const { bio, favoritefoods, youtube, facebook, instagram } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (bio) profileFields.bio = bio;

  if (favoritefoods) {
    profileFields.favoritefoods = favoritefoods
      .split(",")
      .map((food) => food.trim());
  }

  //Build social Object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
