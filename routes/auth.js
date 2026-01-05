const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Test Route
router.get("/", (req, res) => {
  res.json({ message: "Auth route is working" });
});

// Register Route (Example)
router.post("/register", async (req, res) => {
  // Add your registration logic here using bcrypt.hash
  res.json({ message: "User registered (placeholder)" });
});

module.exports = router;
