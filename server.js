// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());

// Import Routes
const refillRoutes = require('./routes/refills');
const contactRoutes = require('./routes/contact'); // Import the contact routes

// Register Routes
app.use('/api/refills', refillRoutes);
app.use('/api', contactRoutes); // Register the contact route

// MongoDB connection and server start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

// Basic test route
app.get('/', (req, res) => {
  res.send('Hello from ALBOPHAR backend!');
});