const express = require("express");
const router = express.Router();

// GET api/users
// Test Route
// public
router.get("/", (req, res) => res.send("Profile Router"));

module.exports = router;
