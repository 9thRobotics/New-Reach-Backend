const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { celebrate, Joi, errors } = require('celebrate');
const tokensRoute = require('./tokens');

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
app.set('trust proxy', 1);

// Routes
app.get('/', (req, res) => {
  res.send('9th Dimension Robotics Company');
});
app.use('/api/tokens', tokensRoute);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/new-reach-backend';
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));

// Celebrate error handling
app.use(errors());

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
