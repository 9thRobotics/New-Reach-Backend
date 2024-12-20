const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Simple route to check if the server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Endpoint for purchasing tokens
app.post('/buyTokens', async (req, res) => {
    const { recipient, amount } = req.body;

    if (!recipient || !amount) {
        return res.status(400).send('Missing recipient or amount');
    }

    try {
        // Add logic to interact with your smart contract here
        res.status(200).send(`Bought ${amount} tokens for ${recipient}`);
    } catch (error) {
        res.status(500).send('Error processing transaction');
    }
});

// Define the port from the .env file or use a default
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
