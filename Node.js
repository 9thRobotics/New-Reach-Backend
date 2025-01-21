
const mongoose = require('mongoose');

// Replace `process.env.MONGO_URI` with your connection string if you're not using environment variables
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {})
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
