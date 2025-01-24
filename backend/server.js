// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Express app
const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies and authorization headers if needed
}));

// Environment variables
const PORT = process.env.PORT || 3001;
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Initialize Sequelize for PostgreSQL
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false,
});

// Define User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'client'),
    allowNull: false,
    defaultValue: 'client',
  },
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
    process.exit(1); // Exit the process if the database connection fails
  }
})();

// Routes
// Registration route
app.post('/register', async (req, res) => {
  const { name, password, role } = req.body;

  // Input validation
  if (!name || !password || !role) {
    return res.status(400).json({ error: 'All fields are required: name, password, role' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const user = await User.create({
      name,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'User registered successfully!', user: { name: user.name, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
