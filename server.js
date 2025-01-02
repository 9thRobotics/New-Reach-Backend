const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/reach-backend';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));

// Token Schema and Model
const tokenSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Token = mongoose.model('Token', tokenSchema);

// Routes
app.get('/', (req, res) => {
  res.send('9th Dimension Robotics Company');
});

// API Routes
app.get('/api/tokens', async (req, res) => {
  try {
    const tokens = await Token.find();
    if (!tokens.length) {
      return res.status(404).json({ message: 'No tokens available' });
    }
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tokens', error: err.message });
  }
});

app.post('/api/tokens/purchase', async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid token amount' });
  }
  try {
    const newToken = new Token({ amount });
    await newToken.save();
    res.status(201).json({ message: 'Token purchased successfully', token: newToken });
  } catch (err) {
    res.status(500).json({ message: 'Error purchasing token', error: err.message });
  }
});

app.delete('/api/tokens/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedToken = await Token.findByIdAndDelete(id);
    if (!deletedToken) {
      return res.status(404).json({ message: 'Token not found' });
    }
    res.json({ message: 'Token deleted successfully', token: deletedToken });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting token', error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
