const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Middleware to force HTTPS in production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
  }
  next();
});

// Import and use the tokens routes
const tokensRouter = require('./tokens');
app.use('/api/tokens', tokensRouter);

// Define your routes here
app.get('/', (req, res) => {
  res.send('Hello, secure world!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
// MongoDB Schema for Sales
const SaleSchema = new mongoose.Schema({
  walletAddress: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
});
const Sale = mongoose.model('Sale', SaleSchema);

// Sell Tokens API
app.post('/api/sell-tokens', async (req, res) => {
  const { walletAddress, amount } = req.body;

  if (!walletAddress || !amount) {
    return res.status(400).send('Invalid request: Wallet address and amount are required.');
  }

  try {
    // Interact with the smart contract to transfer tokens from the user's wallet
    const tx = await contract.transferFrom(walletAddress, process.env.COMPANY_WALLET_ADDRESS, ethers.utils.parseUnits(amount.toString(), 18));
    await tx.wait();

    // Optionally, record the sale in the database
    const saleRecord = new Sale({
      walletAddress,
      amount,
      timestamp: new Date(),
    });
    await saleRecord.save();

    res.json({ success: true, txHash: tx.hash, message: 'Token sale successful' });
  } catch (error) {
    console.error('Error processing token sale:', error);
    res.status(500).send('Error processing token sale');
  }

});
