require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // Add this line

const app = express();
const port = 3000;

const infuraUrl = process.env.INFURA_URL;
const mongoURI = process.env.MONGO_URI; // Add this line

// Add the MongoDB connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.get('/', (req, res) => {
  res.send(`Connected to Infura at ${infuraUrl}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
