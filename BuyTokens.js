import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from './config'; // Adjust the path if necessary

const BuyTokens = () => {
  const [amount, setAmount] = useState('');

  const handleBuy = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/buy-tokens`, { amount });
      alert(`Successfully bought ${amount} tokens!`);
    } catch (error) {
      console.error('Error buying tokens:', error);
      alert('Failed to buy tokens. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Buy Tokens</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
};

export default BuyTokens;
