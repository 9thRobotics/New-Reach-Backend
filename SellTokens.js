import React, { useState } from 'react';
import axios from 'axios';

const SellTokens = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSellTokens = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/sell-tokens`, {
        walletAddress,
        amount,
      });
      setMessage(`Success! Transaction Hash: ${response.data.txHash}`);
    } catch (error) {
      console.error('Error selling tokens:', error);
      setMessage('Failed to sell tokens. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sell Tokens</h2>
      <form onSubmit={handleSellTokens}>
        <input
          type="text"
          placeholder="Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Sell Tokens'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SellTokens;
