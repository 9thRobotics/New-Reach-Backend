const mongoose = require('mongoose');
const url = require('url');
require('dotenv').config(); // Load environment variables

// Load MongoDB URI from .env or GitHub secret
const mongoURI = process.env.MONGO_URI;

// Optional: If you are using QuotaGuard or other proxy, set it up here
const proxyUrl = process.env.QUOTAGUARDSTATIC_URL;
let options = {};

if (proxyUrl) {
  const proxyDetails = new url.URL(proxyUrl);
  options = {
    proxy: {
      host: proxyDetails.hostname,
      port: parseInt(proxyDetails.port),
      auth: {
        username: proxyDetails.username,
        password: proxyDetails.password,
      },
    },
  };
}

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      // You can add more options as needed here
      // useNewUrlParser and useUnifiedTopology are deprecated in Mongoose 6+
      // So typically left out unless using an older driver
      ...options, // Add proxy options if needed
    });
    console.log('✅ MongoDB connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit the app if MongoDB connection fails
  }
};

module.exports = connectDB;
