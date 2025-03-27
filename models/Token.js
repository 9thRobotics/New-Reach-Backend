// models/Token.js
const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  address: { type: String, required: true, unique: true },
  totalSupply: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Token', TokenSchema);
