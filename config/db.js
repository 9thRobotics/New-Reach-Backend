// In config/db.js
const mongoose = require('mongoose');
require('dotenv').config();
const url = require('url');

const mongoURI = process.env.MONGO_URI;

// Optional: Setup proxy if needed
const proxyUrl = process.env.QUOTAGUARDSTATIC_URL;
const proxyDetails = new url.URL(proxyUrl);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      // Connection options (if proxy needed)
      // proxy: {
      //   host: proxyDetails.hostname,
      //   port: parseInt(proxyDetails.port),
      //   auth: {
      //     username: proxyDetails.username,
      //     password: proxyDetails.password,
      //   },
      // },
    });
    console.log('✅ MongoDB connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
