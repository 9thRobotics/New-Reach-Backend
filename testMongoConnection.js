const mongoose = require('mongoose'); // Remove this line

const connectDB = require('../../config/db'); // Add this line
connectDB(); // Call this at the start of your file

// Replace with your actual MongoDB connection string
const mongoURI = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoURI, {})
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));
