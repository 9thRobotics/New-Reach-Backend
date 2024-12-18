const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.post("/buyTokens", (req, res) => {
    const { recipient, amount } = req.body;
    if (!recipient || !amount) {
        return res.status(400).send("Missing recipient or amount");
    }
    res.status(200).send(`Tokens purchased for recipient: ${recipient}, amount: ${amount}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
