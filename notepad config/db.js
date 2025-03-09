const mongoose = require('mongoose');

// Load MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI || "mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database_name>?retryWrites=true&w=majority";

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {});
        console.log('✅ MongoDB Connected Successfully!');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1); // Stop the app if it can't connect
    }
};

module.exports = connectDB;
