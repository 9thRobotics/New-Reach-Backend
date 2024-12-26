const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World! This is new-reach-backend.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Authentication route
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    // Dummy user data for testing
    const storedPassword = await bcrypt.hash('password123', 10);

    if (username === 'testuser' && await bcrypt.compare(password, storedPassword)) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
