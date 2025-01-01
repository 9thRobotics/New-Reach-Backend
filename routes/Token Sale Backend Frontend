// Backend and Frontend Code for Token Sale

// BACKEND
const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/tokenSaleDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const TokenTransaction = mongoose.model('Transaction', {
  walletAddress: String,
  amount: Number,
  bonusApplied: Boolean,
  transactionDate: { type: Date, default: Date.now },
});

// Smart Contract Configuration
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
const contractAddress = 'YOUR_SMART_CONTRACT_ADDRESS';
const contractABI = []; // Add your contract ABI here
const tokenContract = new web3.eth.Contract(contractABI, contractAddress);

// Buy Token Endpoint
app.post('/api/buyTokens', async (req, res) => {
  const { walletAddress, amount } = req.body;

  // Validate input
  if (!web3.utils.isAddress(walletAddress)) {
    return res.status(400).send({ error: 'Invalid wallet address' });
  }

  if (amount <= 0) {
    return res.status(400).send({ error: 'Invalid amount' });
  }

  try {
    // Calculate Bonus
    const bonus = amount * 0.1; // 10% Bonus
    const totalTokens = amount + bonus;

    // Transfer Tokens via Smart Contract
    const result = await tokenContract.methods
      .transfer(walletAddress, web3.utils.toWei(totalTokens.toString(), 'ether'))
      .send({ from: 'YOUR_WALLET_ADDRESS', gas: 200000 });

    // Save Transaction to DB
    const transaction = new TokenTransaction({
      walletAddress,
      amount,
      bonusApplied: true,
    });
    await transaction.save();

    res.send({
      success: true,
      transactionHash: result.transactionHash,
      message: 'Tokens purchased successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Transaction failed' });
  }
});

// Admin Dashboard Metrics
app.get('/api/metrics', async (req, res) => {
  try {
    const transactions = await TokenTransaction.find();
    const totalSold = transactions.reduce((sum, tx) => sum + tx.amount, 0);

    res.send({
      totalSold,
      transactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch metrics' });
  }
});

// FRONTEND (React Snippet for Token Purchase)
import React, { useState } from 'react';
import axios from 'axios';

const BuyTokens = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const handleBuy = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/buyTokens', {
        walletAddress,
        amount,
      });

      setMessage(response.data.message);
    } catch (err) {
      console.error(err);
      setMessage('Error: ' + err.response.data.error);
    }
  };

  return (
    <div>
      <h1>Buy Tokens</h1>
      <input
        type="text"
        placeholder="Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleBuy}>Buy Tokens</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BuyTokens;

// SERVER START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
