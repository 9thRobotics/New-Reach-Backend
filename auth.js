const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

// Dummy user data (for testing)
const storedPassword = bcrypt.hashSync('password123', 10);

// Authentication route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Basic username and password check
    if (username === 'testuser' && await bcrypt.compare(password, storedPassword)) {
        const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

module.exports = router;
