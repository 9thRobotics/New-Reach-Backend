const mongoose = require('mongoose');

// Your MongoDB Atlas connection string
const mongoURI = "mongodb+srv://phillipdfilkins:5ns7Vy51BbfMcgJY@cluster0.yt6an.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));
