const express = require('express');
const router = express.Router();
const Token = require('../models/Token');

// GET /api/tokens
router.get('/', async (req, res) => {
  try {
    const token = await Token.findOne();
    if (!token) {
      return res.status(404).json({ error: 'Token data not found.' });
    }
    res.status(200).json({
      message: 'Tokens endpoint is working!',
      availableTokens: token.availableTokens,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/tokens/purchase
router.post('/purchase', async (req, res) => {
  const { amount } = req.body;
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount.' });
  }

  try {
    let token = await Token.findOne();
    if (!token) {
      return res.status(404).json({ error: 'Token data not found.' });
    }

    if (amount > token.availableTokens) {
      return res.status(400).json({ error: 'Not enough tokens available.' });
    }

    token.availableTokens -= amount;
    await token.save();

    res.status(200).json({
      message: `Successfully purchased ${amount} tokens.`,
      remainingTokens: token.availableTokens,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
