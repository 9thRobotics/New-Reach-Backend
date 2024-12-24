// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Debug: Log environment variables (optional, for testing purposes)
console.log('Environment Variables:', {
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY, // Example environment variable
  WALLET_ADDRESS: process.env.WALLET_ADDRESS,
});

// Default route
app.get('/', (req, res) => {
  res.send('Reach Backend is running!');
});

// Example endpoint for testing
app.get('/test', (req, res) => {
  res.json({ message: 'This is a test endpoint.' });
});

// Start the server
const PORT = process.env.PORT || 5000; // Default to port 5000 if not defined
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
