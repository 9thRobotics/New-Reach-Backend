// Import required modules
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
require("dotenv").config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Load environment variables
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Connect to Ethereum
const provider = new ethers.providers.InfuraProvider("mainnet", INFURA_PROJECT_ID);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Import contract ABI
const abi = [
  // Replace with your contract's ABI (array of functions/events)
  "function balanceOf(address owner) view returns (uint256)",
  "function buyTokens() payable",
];

// Initialize Contract
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

// Routes
app.get("/", (req, res) => {
  res.send("Reach Backend API is running!");
});

// Route to get balance of a wallet
app.get("/balance/:address", async (req, res) => {
  try {
    const balance = await contract.balanceOf(req.params.address);
    res.json({ balance: ethers.utils.formatEther(balance) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch balance" });
  }
});

// Route to purchase tokens
app.post("/buy-tokens", async (req, res) => {
  try {
    const tx = await contract.buyTokens({
      value: ethers.utils.parseEther(req.body.amount),
    });
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to purchase tokens" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
