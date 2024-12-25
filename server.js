const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/reach-backend')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Authentication route
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    // Dummy user data for testing
    const storedPassword = await bcrypt.hash('password123', 10);

    if (username === 'testuser' && await bcrypt.compare(password, storedPassword)) {
        const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Test route
app.get('/api/test', (req, res) => {
    res.status(200).send('API is working!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
