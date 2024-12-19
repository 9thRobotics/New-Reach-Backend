const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Test route to check if the server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Route to handle token purchase
app.post('/buyTokens', async (req, res) => {
    const { recipient, amount } = req.body;

    // Validate input
    if (!recipient || !amount) {
        return res.status(400).send('Missing recipient or amount');
    }

    try {
        // Add logic to interact with your smart contract here
        res.status(200).send(`Bought ${amount} tokens for ${recipient}`);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('Error processing transaction');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
