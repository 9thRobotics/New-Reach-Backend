require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const infuraUrl = process.env.INFURA_URL;
const mongoURI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors({ origin: "*" }));

// MongoDB connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  wallet: String,
  amount: String,
  txHash: String,
  timestamp: { type: Date, default: Date.now }
});
const Transaction = mongoose.model("Transaction", transactionSchema);

// API Endpoint to Log Transactions
app.post("/log-transaction", async (req, res) => {
  try {
    const { wallet, amount, txHash } = req.body;
    if (!wallet || !amount || !txHash) {
      return res.status(400).json({ success: false, error: "Missing transaction data" });
    }

    const newTransaction = new Transaction({ wallet, amount, txHash });
    await newTransaction.save();

    res.json({ success: true });
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send(`Connected to Infura at ${infuraUrl}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
