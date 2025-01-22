import React, { useState } from 'react';
import { ethers } from 'ethers';

const Header = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setWalletAddress(await signer.getAddress());
    } else {
      alert('MetaMask is not installed');
    }
  };

  return (
    <header>
      <h1>Token Dashboard</h1>
      <button onClick={connectWallet}>
        {walletAddress ? `Connected: ${walletAddress}` : 'Connect Wallet'}
      </button>
    </header>
  );
};

export default Header;
