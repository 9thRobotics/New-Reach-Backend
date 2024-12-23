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
const API_BASE_URL = " https://reach-token-heroku-app-f5aa74057eec.herokuapp.com/
";

fetch(`${API_BASE_URL}/endpoint`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
