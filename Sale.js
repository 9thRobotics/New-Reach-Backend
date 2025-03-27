const mongoose = require('mongoose'); // Remove this line

const connectDB = require('../../config/db'); // Add this line
connectDB(); // Call this at the start of your file

const SaleSchema = new mongoose.Schema({
  walletAddress: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
});

const Sale = mongoose.model('Sale', SaleSchema);

module.exports = Sale;
