const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Import User model
const jwt = require("jsonwebtoken"); // Optional: For token-based authentication
const router = express.Router();

// Environment variables for JWT (if used)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, password: hashedPassword, role });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User registered successfully.",
      user: { id: savedUser._id, username: savedUser.username, role: savedUser.role },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to register user." });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    // Generate a token (optional)
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful.",
      user: { id: user._id, username: user.username, role: user.role },
      token, // Send token if using JWT
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Failed to log in." });
  }
});

module.exports = router;
