// /backend/routes/tokens.js
const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

// Route to purchase tokens
router.post('/buy', tokenController.purchaseTokens);

// Route to get token balance
router.get('/balance/:userId', tokenController.getBalance);

// Route to get transaction history
router.get('/transactions/:userId', tokenController.getTransactionHistory);

module.exports = router;


// /backend/controllers/tokenController.js
const blockchain = require('../config/blockchain');
const Transaction = require('../models/transactions');

exports.purchaseTokens = async (req, res) => {
  const { walletAddress, amount } = req.body;
  try {
    const transaction = await blockchain.purchaseTokens(walletAddress, amount);
    await Transaction.create({ walletAddress, amount, transactionId: transaction.id });
    res.status(200).json({ message: 'Tokens purchased successfully', transaction });
  } catch (error) {
    res.status(500).json({ error: 'Failed to purchase tokens' });
  }
};

exports.getBalance = async (req, res) => {
  const { userId } = req.params;
  try {
    const balance = await blockchain.getTokenBalance(userId);
    res.status(200).json({ balance });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
};

exports.getTransactionHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.find({ userId });
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};


// /backend/config/blockchain.js
const ethers = require('ethers');

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  require('./abi.json'),
  wallet
);

exports.purchaseTokens = async (walletAddress, amount) => {
  const tx = await contract.purchaseTokens(walletAddress, ethers.parseEther(amount.toString()));
  return await tx.wait();
};

exports.getTokenBalance = async (walletAddress) => {
  return await contract.balanceOf(walletAddress);
};


// /frontend/api/tokenApi.js
import axios from 'axios';

export const buyTokens = async (data) => axios.post('/api/tokens/buy', data);
export const getBalance = async (userId) => axios.get(`/api/tokens/balance/${userId}`);
export const getTransactionHistory = async (userId) => axios.get(`/api/tokens/transactions/${userId}`);


// /frontend/components/TokenPurchase.js
import React, { useState } from 'react';
import { buyTokens } from '../api/tokenApi';

const TokenPurchase = () => {
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const handlePurchase = async () => {
    try {
      const response = await buyTokens({ walletAddress, amount });
      alert('Tokens purchased successfully!');
    } catch (error) {
      alert('Failed to purchase tokens.');
    }
  };

  return (
    <div>
      <h2>Purchase Tokens</h2>
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
      <button onClick={handlePurchase}>Buy Tokens</button>
    </div>
  );
};

export default TokenPurchase;


// /frontend/components/BalanceDisplay.js
import React, { useEffect, useState } from 'react';
import { getBalance } from '../api/tokenApi';

const BalanceDisplay = ({ userId }) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await getBalance(userId);
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Failed to fetch balance');
      }
    };

    fetchBalance();
  }, [userId]);

  return (
    <div>
      <h2>Your Balance: {balance} Tokens</h2>
    </div>
  );
};

export default BalanceDisplay;
