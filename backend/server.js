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
const { authenticate, authorizeAdmin } = require('./middleware/authenticate');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3001;
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, ZOOM_API_KEY, ZOOM_API_SECRET } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false,
});

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

const ZoomClass = sequelize.define('ZoomClass', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  topic: { type: DataTypes.STRING, allowNull: false },
  startTime: { type: DataTypes.DATE, allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false },
  joinUrl: { type: DataTypes.STRING, allowNull: false },
  hostUrl: { type: DataTypes.STRING, allowNull: false },
  createdBy: { type: DataTypes.UUID, allowNull: false }
}, {
  timestamps: true,
  freezeTableName: true
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
})();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

app.post('/register', async (req, res) => {
  const { name, password, role } = req.body;
  if (!name || !password || !role) return res.status(400).json({ error: 'All fields are required: name, password, role' });
  const allowedRoles = ['admin', 'client'];
  if (!allowedRoles.includes(role)) return res.status(400).json({ error: `Role must be one of: ${allowedRoles.join(', ')}` });
  try {
    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) return res.status(409).json({ error: 'User with this name already exists.' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, password: hashedPassword, role });
    res.status(201).json({ message: 'User registered successfully!', user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
});

app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) return res.status(400).json({ error: 'Name and password are required.' });
  try {
    const user = await User.findOne({ where: { name } });
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: 'Invalid credentials.' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful!', token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred during login.' });
  }
});

app.post('/events', authenticate, authorizeAdmin, async (req, res) => {
  const { title, description, start, end, color } = req.body;
  if (!title || !start || !end) return res.status(400).json({ error: 'Title, start, and end times are required' });
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    const event = await Event.create({ title, description, startTime: start, endTime: end, color, createdBy: req.user.id });
    res.status(201).json({ message: 'Event created successfully!', event });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

app.post('/media', authenticate, authorizeAdmin, upload.single('media'), async (req, res) => {
  const { title, createdBy } = req.body;
  if (!req.file || !title || !createdBy) return res.status(400).json({ error: 'Title, media file, and createdBy are required.' });
  try {
    const media = await Media.create({ title, url: `/uploads/${req.file.filename}`, createdBy });
    res.status(201).json({ message: 'Media uploaded successfully!', media });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload media.' });
  }
});

app.get('/media', authenticate, async (req, res) => {
  try {
    const mediaList = await Media.findAll();
    res.status(200).json(mediaList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch media.' });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running.' });
});

app.post("/upload", upload.single("media"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ url: fileUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload file" });
  }
});

app.get('/zoom/classes', authenticate, async (req, res) => {
  try {
    const classes = await ZoomClass.findAll({ order: [['startTime', 'ASC']] });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Zoom classes.' });
  }
});

app.post('/zoom/create-meeting', authenticate, async (req, res) => {
  const { topic, start_time, duration } = req.body;
  if (!topic || !start_time || !duration) return res.status(400).json({ error: 'All fields (topic, start_time, duration) are required.' });
  const generateZoomToken = () => jwt.sign({ iss: ZOOM_API_KEY, exp: Math.floor(Date.now() / 1000) + 3600 }, ZOOM_API_SECRET);
  const token = generateZoomToken();
  try {
    const zoomRequestData = {
      topic,
      type: 2,
      start_time: new Date(start_time).toISOString(),
      duration,
      timezone: 'UTC',
      settings: { join_before_host: true, approval_type: 0 },
    };
    const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', zoomRequestData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const newClass = await ZoomClass.create({
      topic,
      startTime: new Date(start_time),
      duration,
      joinUrl: response.data.join_url,
      hostUrl: response.data.start_url,
      createdBy: req.user.id,
    });
    res.status(201).json({ message: 'Meeting created successfully!', join_url: response.data.join_url, host_url: response.data.start_url });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Zoom meeting.' });
  }
});

app.get('/events', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.put('/events/:id', authenticate, authorizeAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, description, start, end, color } = req.body;
  try {
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    await event.update({ title, description, start, end, color });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

app.delete('/events/:id', authenticate, authorizeAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    await event.destroy();
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
