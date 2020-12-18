const express = require("express");
const router = express.Router();

// Middleware
const auth = require("../../middleware/auth");

// Packages
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// Models
const User = require("../../models/User");

// ------------Routes ------------

// ----Register User
// POST api/auth/register
// public
router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Email need to be valid").isEmail(),
    check("password", "Password needs to be at least 6 chars long").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check if user is unique
    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email is already in use" }] });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // Save new User
      user = new User({
        username,
        email,
        passwordHash
      });

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      //Create Profile
      const profile = new Profile({ user: user.id });
      await profile.save();

      // Return Token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// ----Login User
// POST api/auth/login
// private
router.post(
  "/login",
  [
    check("email", "Include a valid Email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Return Token
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500, "Server Error");
    }
  }
);

// ----Get logged in user from token
// GET api/auth
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

module.exports = router;
