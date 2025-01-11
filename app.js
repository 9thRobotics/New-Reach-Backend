const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ethers = require('ethers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'https://reach-frontend-omega.vercel.app', // Frontend URL
  methods: 'GET,POST',
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// MongoDB Schema
const PurchaseSchema = new mongoose.Schema({
  walletAddress: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
});
const Purchase = mongoose.model('Purchase', PurchaseSchema);

// Ethers.js Configuration
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(
  process.env.SMART_CONTRACT_ADDRESS,
  JSON.parse(process.env.CONTRACT_ABI), // ABI from environment
  wallet
);

// API Endpoints

// Tokenomics API
app.get('/api/token-stats', async (req, res) => {
  try {
    const stats = {
      totalSupply: 18000000000,
      circulatingSupply: 9999999999,
      price: 27, // Example token price
    };
    res.json(stats);
  } catch (error) {
    console.error('Error fetching token stats:', error);
    res.status(500).send('Error fetching token stats');
  }
});

// Buy Tokens API
app.post('/api/buy-tokens', async (req, res) => {
  const { walletAddress, amount } = req.body;

  if (!walletAddress || !amount) {
    return res.status(400).send('Invalid request: Wallet address and amount are required.');
  }

  try {
    // Record purchase in database
    const purchase = new Purchase({ walletAddress, amount });
    await purchase.save();

    // Transfer tokens using smart contract
    const tx = await contract.transfer(walletAddress, ethers.utils.parseUnits(amount.toString(), 18));
    await tx.wait();

    res.json({ success: true, txHash: tx.hash, message: 'Purchase successful' });
  } catch (error) {
    console.error('Error processing token purchase:', error);
    res.status(500).send('Error processing token purchase');
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
