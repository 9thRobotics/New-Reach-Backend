const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  walletAddress: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
});

const Sale = mongoose.model('Sale', SaleSchema);

module.exports = Sale;
