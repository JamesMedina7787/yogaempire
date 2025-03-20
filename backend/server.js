require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { authenticate, authorizeAdmin } = require('./middleware/authenticate'); // Middleware for auth
const jwt = require('jsonwebtoken'); // Add this at the top of your file if not already included



// Initialize Express app
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS with dynamic origin handling
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Serve uploaded media files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Environment variables
const PORT = process.env.PORT || 3001;
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, ZOOM_API_SECRET } = process.env;

// Initialize Sequelize for PostgreSQL
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false,
});

// Define Models
const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: uuidv4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'client'), allowNull: false, defaultValue: 'client' },
});

const Event = sequelize.define('Event', {
  id: { type: DataTypes.UUID, defaultValue: uuidv4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  startTime: { type: DataTypes.DATE, allowNull: false },
  endTime: { type: DataTypes.DATE, allowNull: false },
  createdBy: { type: DataTypes.UUID, allowNull: false },
});

const Media = sequelize.define('Media', {
  id: { type: DataTypes.UUID, defaultValue: uuidv4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  createdBy: { type: DataTypes.UUID, allowNull: false },
});

// Sync the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database.');
    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
})();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Routes

// User Registration
app.post('/register', async (req, res) => {
  const { name, password, role } = req.body;

  if (!name || !password || !role) {
    return res.status(400).json({ error: 'All fields are required: name, password, role' });
  }

  const allowedRoles = ['admin', 'client'];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ error: `Role must be one of: ${allowedRoles.join(', ')}` });
  }

  try {
    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this name already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, password: hashedPassword, role });
    res.status(201).json({ message: 'User registered successfully!', user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: 'Name and password are required.' });
  }

  try {
    const user = await User.findOne({ where: { name } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role }, // Include ID and role in payload
      process.env.JWT_SECRET,          // Secret key
      { expiresIn: '1h' }              // Corrected "expiresIn"
    );

    // Send response with token and user details
    res.status(200).json({
      message: 'Login successful!',
      token, // Include the token in the response
      user: { id: user.id, name: user.name, role: user.role }
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
});


// Admin: Create Event
app.post('/events', authenticate, authorizeAdmin, async (req, res) => {
  console.log("✅ POST /events hit successfully");
  console.log("🔹 User Authenticated:", req.user);
  console.log("Incoming event request:", req.body);

  const { title, description, start, end, color } = req.body;

  if (!title || !start || !end) {
    return res.status(400).json({ error: 'Title, start, and end times are required' });
  }

  try {
    if (!req.user || !req.user.id) {
      console.warn("⚠️ User is missing or unauthorized:", req.user);
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    const event = await Event.create({
      title,
      description,
      startTime: start,  // 🔄 Corrected field names
      endTime: end,
      color,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: 'Event created successfully!', event });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});





// Admin: Upload Media
app.post('/media', authenticate, authorizeAdmin, upload.single('media'), async (req, res) => {
  const { title, createdBy } = req.body;
  if (!req.file || !title || !createdBy) {
    return res.status(400).json({ error: 'Title, media file, and createdBy are required.' });
  }

  try {
    const media = await Media.create({ title, url: `/uploads/${req.file.filename}`, createdBy });
    res.status(201).json({ message: 'Media uploaded successfully!', media });
  } catch (err) {
    console.error('Error uploading media:', err);
    res.status(500).json({ error: 'Failed to upload media.' });
  }
});

// Fetch Media (Authenticated Users)
app.get('/media', authenticate, async (req, res) => {
  try {
    const mediaList = await Media.findAll();
    res.status(200).json(mediaList);
  } catch (err) {
    console.error('Error fetching media:', err);
    res.status(500).json({ error: 'Failed to fetch media.' });
  }
});

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running.' });
});

// Debugging Route to Test Login API
app.get("/test-login", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "admin", // Replace with a valid username
        password: "adminpassword", // Replace with the correct password
      }),
    });

    const data = await response.json(); // Parse the response JSON
    console.log("Response from /login:", data); // Log the response
    res.status(200).json(data); // Return the response to the client
  } catch (err) {
    console.error("Error testing /login:", err);
    res.status(500).json({ error: "Failed to test login endpoint." });
  }
});

//the admin page 


// Route for media uploads (USE EXISTING UPLOAD CONFIG)
app.post("/upload", upload.single("media"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

app.post('/zoom/create-meeting', authenticate, async (req, res) => {
  const { topic, start_time, duration } = req.body;

  if (!topic || !start_time || !duration) {
    return res.status(400).json({ error: 'All fields (topic, start_time, duration) are required.' });
  }

  const generateZoomToken = () => {
    const payload = {
      iss: process.env.ZOOM_API_KEY,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
    };
  
    return jwt.sign(payload, process.env.ZOOM_API_SECRET);
  };
  

  const token = generateZoomToken();

  try {
    const zoomRequestData = {
      topic,
      type: 2, // Scheduled meeting
      start_time, // Must be in UTC and ISO8601 format (e.g., "2024-02-20T15:00:00Z")
      duration, // in minutes
      timezone: 'UTC',
      settings: {
        join_before_host: true,
        approval_type: 0, // Automatically approve
      },
    };

    console.log("🔹 Sending Zoom Meeting Request:", zoomRequestData);

    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      zoomRequestData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("✅ Zoom Meeting Created:", response.data);
    res.status(201).json({
      message: 'Meeting created successfully!',
      join_url: response.data.join_url,
      meeting_id: response.data.id
    });

  } catch (error) {
    console.error("❌ Error Creating Zoom Meeting:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to create Zoom meeting.' });
  }
});


// THIS IS THE CALENDAR


// Get all events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Create a new event (Admin Only)
app.post('/events', authenticate, authorizeAdmin, async (req, res) => {
  console.log("🔹 Received request to add event:", req.body); 

  const { title, description, startTime, endTime, color } = req.body;

  if (!title || !startTime || !endTime) {
    console.warn("⚠️ Missing required fields:", { title, startTime, endTime });
    return res.status(400).json({ error: 'Title, startTime, and endTime are required' });
  }

  try {
    const event = await Event.create({
      title,
      description,
      startTime, // ✅ Match frontend field names
      endTime,
      color: color || 'gray',
      createdBy: req.user.id,
    });

    console.log("✅ Event successfully created:", event);
    res.status(201).json(event);
  } catch (err) {
    console.error("❌ Error creating event:", err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});


// Update an event (Admin Only)
app.put('/events/:id', authenticate, authorizeAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, description, start, end, color } = req.body;

  try {
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    await event.update({ title, description, start, end, color });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete an event (Admin Only)
app.delete('/events/:id', authenticate, authorizeAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    await event.destroy();
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
