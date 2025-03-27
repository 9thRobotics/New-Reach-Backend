// api/tokens.js
const express = require('express');
const router = express.Router();
const Token = require('../models/Token');

// POST new token
router.post('/', async (req, res) => {
  try {
    const token = new Token(req.body);
    await token.save();
    res.status(201).json(token);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all tokens
router.get('/', async (req, res) => {
  try {
    const tokens = await Token.find();
    res.status(200).json(tokens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
