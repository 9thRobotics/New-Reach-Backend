const express = require('express');
const router = express.Router();

// In-memory data for demonstration (replace with database integration as needed)
let tokensData = {
  availableTokens: 1000000,
};

// GET /api/tokens
// Endpoint to retrieve token-related information
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Tokens endpoint is working!',
    availableTokens: tokensData.availableTokens,
  });
});

// POST /api/tokens/purchase
// Endpoint to handle token purchase requests
router.post('/purchase', (req, res) => {
  const { amount } = req.body;

  // Validate the purchase amount
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({
      error: 'Invalid amount. Please provide a valid number greater than 0.',
    });
  }

  // Check if enough tokens are available
  if (amount > tokensData.availableTokens) {
    return res.status(400).json({
      error: 'Not enough tokens available for purchase.',
    });
  }

  // Deduct the purchased amount from available tokens
  tokensData.availableTokens -= amount;

  res.status(200).json({
    message: `Successfully purchased ${amount} tokens.`,
    remainingTokens: tokensData.availableTokens,
  });
});

module.exports = router;
