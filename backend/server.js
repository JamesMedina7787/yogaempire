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
  const { title, description, startTime, endTime, createdBy } = req.body;
  if (!title || !startTime || !endTime || !createdBy) {
    return res.status(400).json({ error: 'Title, startTime, endTime, and createdBy are required.' });
  }

  try {
    const event = await Event.create({ title, description, startTime, endTime, createdBy });
    res.status(201).json({ message: 'Event created successfully!', event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while creating the event.' });
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

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
