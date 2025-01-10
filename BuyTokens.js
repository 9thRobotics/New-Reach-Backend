import React, { useState } from 'react';

const BuyTokens = () => {
  const [amount, setAmount] = useState('');

  const handleBuy = async () => {
    // Call backend API for purchasing tokens
    alert(`Buying ${amount} tokens...`);
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
