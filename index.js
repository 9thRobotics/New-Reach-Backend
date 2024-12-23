const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables from .env

const app = express();
app.use(cors());
app.use(express.json());

console.log(`Server is starting...`);

// Debug: Log environment variables
console.log('Environment Variables:', {
  PRIVACY_KEY: process.env.PRIVACY_KEY,
  WALLET_ADDRESS: process.env.WALLET_ADDRESS,
  PORT: process.env.PORT || 3000,
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
