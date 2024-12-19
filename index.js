const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server is running!');
});
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
    
});
app.post('/buyTokens', async (req, res) => {
    const { recipient, amount } = req.body;
    if (!recipient || !amount) {
        return res.status(400).send('Missing recipient or amount');
    }

    try {
        // Logic to interact with your smart contract
        res.status(200).send(`Bought ${amount} tokens for ${recipient}`);
    } catch (error) {
        res.status(500).send('Error processing transaction');
    }
});
