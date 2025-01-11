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
