const express = require("express");
const router = express.Router();

// GET api/users
// Test Route
// public
router.get("/", (req, res) => res.send("Recipe Router"));

module.exports = router;
