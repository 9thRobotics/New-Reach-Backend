const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://phillipdfilkins:5ns7Vy51BbfMcgJY@cluster0.yt6an.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Replace <username> and <password> with your actual credentials
mongoose.connect(mongoURI, {})
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));
