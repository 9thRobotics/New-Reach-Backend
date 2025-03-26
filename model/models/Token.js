const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  availableTokens: {
    type: Number,
    required: true,
    default: 1000000, // Initial amount of tokens
  },
});

module.exports = mongoose.model('Token', TokenSchema);
