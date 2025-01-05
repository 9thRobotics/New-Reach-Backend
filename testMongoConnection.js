require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'MONGO_URI=mongodb+srv://phillipdfilkins:Jezebell%23666@cluster0.mongodb.net/ new-reach-backend retryWrites=true&w=majority';

async function testConnection() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Successfully connected to MongoDB!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

testConnection();
