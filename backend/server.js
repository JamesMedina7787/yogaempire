require('dotenv').config();
const express = require('express');
const axios = require('axios'); // Ensure axios is installed with `npm install axios`
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

// Initialize Express app
const app = express();

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER || 'root',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'workshops',
  password: process.env.DB_PASSWORD || 'CupStack54',
  port: process.env.DB_PORT || 5432,
});

pool.connect()
  .then(() => console.log('PostgreSQL connected'))
  .catch((err) => console.error('PostgreSQL connection error:', err));

// Middleware
app.use(express.json());

// Zoom API example route
app.post('/api/create-meeting', async (req, res) => {
  try {
    const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', req.body, {
      headers: {
        Authorization: `Bearer ${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`,
        'Content-Type': 'application/json',
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create Zoom meeting' });
  }
});

// Define routes (replace with your actual route files or handlers)
const authRoutes = require('./routes/auth'); // Replace with actual auth route file
const workshopRoutes = require('./routes/workshops'); // Replace with actual workshop route file
const classRoutes = require('./routes/class'); // Replace with actual class route file

app.use('/api/auth', authRoutes);
app.use('/workshops', workshopRoutes);
app.use('/classes', classRoutes);

// Start the server
const PORT = process.env.PORTT || 3001;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
