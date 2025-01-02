const express = require('express');
const router = express.Router();

// Mock token data
let tokenBalance = 1000000; // Total available tokens for sale
const tokenPrice = 27; // Price per token in USD

// Endpoint to get token details
router.get('/', (req, res) => {
    res.json({
        totalTokensAvailable: tokenBalance,
        tokenPriceUSD: tokenPrice,
        message: 'Welcome to the Reach Token API',
    });
});

// Endpoint to purchase tokens
router.post('/purchase', (req, res) => {
    const { amount } = req.body;

    // Validate request body
    if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({
            error: 'Invalid request. Please provide a valid amount of tokens to purchase.',
        });
    }

    // Check if enough tokens are available
    if (amount > tokenBalance) {
        return res.status(400).json({
            error: 'Insufficient tokens available for purchase.',
        });
    }

    // Calculate total price
    const totalPrice = amount * tokenPrice;

    // Simulate token purchase (deduct tokens and respond)
    tokenBalance -= amount;

    res.json({
        message: 'Token purchase successful!',
        tokensPurchased: amount,
        totalPriceUSD: totalPrice,
        tokensRemaining: tokenBalance,
    });
});

module.exports = router;
