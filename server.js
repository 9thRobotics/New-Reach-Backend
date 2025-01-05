const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { celebrate, Joi, errors } = require('celebrate');

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}));
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, secure world!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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
// Add this line before the middleware definitions
app.set('trust proxy', 1);
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

app.post('/api/tokens/purchase', celebrate({
  body: Joi.object({
    amount: Joi.number().greater(0).required(),
  }),
}), async (req, res) => {
  const { amount } = req.body;
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

// Celebrate error handling
app.use(errors());

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
