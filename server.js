const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const purchaseRoute = require('./routes/purchase');

// Initialize Express app
const app = express();

// Configure environment variables
dotenv.config();

// Enable CORS for specified origin
app.use(cors({
  origin: 'https://9throbotics.github.io/Reach-Frontend/', // Replace with your frontend's URL
  methods: ['GET', 'POST'], // Specify allowed methods
}));

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/purchase', purchaseRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
