require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const infuraUrl = process.env.INFURA_URL;
const mongoURI = process.env.MONGO_URI;

// ✅ Check Required Environment Variables
if (!mongoURI) {
  console.error("❌ MONGO_URI is missing in environment variables.");
  process.exit(1);
}
if (!infuraUrl) {
  console.warn("⚠️ Warning: INFURA_URL is missing. Some features may not work.");
}

// ✅ Middleware Setup
app.use(express.json());
app.use(cors({ origin: "*" }));

// ✅ MongoDB Connection
mongoose
  .connect(mongoURI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Stop server if DB connection fails
  });

// ✅ Define Transaction Schema
const transactionSchema = new mongoose.Schema({
  wallet: { type: String, required: true },
  amount: { type: String, required: true },
  txHash: { type: String, required: true, unique: true },
  timestamp: { type: Date, default: Date.now }
});
const Transaction = mongoose.model("Transaction", transactionSchema);

// ✅ API Endpoint: Log Transactions
app.post("/log-transaction", async (req, res) => {
  try {
    const { wallet, amount, txHash } = req.body;

    // Check for required fields
    if (!wallet || !amount || !txHash) {
      return res.status(400).json({ success: false, error: "Missing transaction data" });
    }

    // Prevent duplicate transactions
    const existingTx = await Transaction.findOne({ txHash });
    if (existingTx) {
      return res.status(400).json({ success: false, error: "Transaction already exists" });
    }

    // Save transaction
    const newTransaction = new Transaction({ wallet, amount, txHash });
    await newTransaction.save();

    res.json({ success: true, message: "Transaction logged successfully" });
  } catch (error) {
    console.error("❌ Error saving transaction:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Health Check Endpoint
app.get('/', (req, res) => {
  res.send(`✅ Server is running. Connected to Infura at ${infuraUrl || "N/A"}`);
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
