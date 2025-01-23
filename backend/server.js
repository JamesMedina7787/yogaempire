require("dotenv").config();
const cors = require("cors");
const express = require("express");
const axios = require("axios");
const { Pool } = require("pg");

const app = express();

// Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Frontend URL from .env
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies and credentials
  })
);

// Allow preflight requests for all routes
app.options("*", cors());

// Middleware
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "postgres",
  password: process.env.DB_PASSWORD || "",
  port: process.env.DB_PORT || 5432,
});

// Log database connection status and start the server
pool.connect()
  .then(() => {
    console.log("PostgreSQL connected");
    const PORT = process.env.BACKEND_PORT || 3001;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("PostgreSQL connection error:", err);
    process.exit(1); // Exit the application if the DB connection fails
  });

// Test database connection route
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT 1");
    res.status(200).json({ success: true, message: "Database connection is working!" });
  } catch (err) {
    console.error("Database connection error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Zoom API example route
app.post("/api/create-meeting", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${process.env.ZOOM_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error creating Zoom meeting:", error.message);
    res.status(500).json({ error: "Failed to create Zoom meeting" });
  }
});

// Import and use routes
const authRoutes = require("./routes/auth");
const workshopRoutes = require("./routes/workshops");
const classRoutes = require("./routes/class");

app.use("/api/auth", authRoutes);
app.use("/workshops", workshopRoutes);
app.use("/classes", classRoutes);

// Log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});
