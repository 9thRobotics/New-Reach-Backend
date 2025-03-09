const express = require('express');
const router = express.Router();
const Token = require('../models/Token'); // Make sure this model exists

// GET /api/tokens
// Retrieve token-related information from MongoDB
router.get('/', async (req, res) => {
  try {
    const tokenData = await Token.findOne(); // Assuming only one token record
    if (!tokenData) {
      return res.status(404).json({ error: 'Token data not found.' });
    }

    res.status(200).json({
      message: 'Tokens endpoint is working!',
      availableTokens: tokenData.availableTokens,
    });
  } catch (error) {
    console.error('Error fetching token data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/tokens/purchase
// Handle token purchase requests and update MongoDB
router.post('/purchase', async (req, res) => {
  const { amount } = req.body;

  // Validate purchase amount
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({
      error: 'Invalid amount. Please provide a valid number greater than 0.',
    });
  }

  try {
    let tokenData = await Token.findOne();
    if (!tokenData) {
      return res.status(404).json({ error: 'Token data not initialized.' });
    }

    if (amount > tokenData.availableTokens) {
      return res.status(400).json({
        error: 'Not enough tokens available for purchase.',
      });
    }

    // Deduct tokens and save
    tokenData.availableTokens -= amount;
    await tokenData.save();

    res.status(200).json({
      message: `Successfully purchased ${amount} tokens.`,
      remainingTokens: tokenData.availableTokens,
    });
  } catch (error) {
    console.error('Error processing purchase:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
