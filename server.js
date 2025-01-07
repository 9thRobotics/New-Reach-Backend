const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { celebrate, errors } = require('celebrate');
const tokensRoute = require('./tokens');
const url = require('url');

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

// Parse QuotaGuard Static URL from environment
const proxyUrl = process.env.QUOTAGUARDSTATIC_URL 
  ? new url.URL(process.env.QUOTAGUARDSTATIC_URL) 
  : null;

const mongoURI = process.env.MONGO_URI;

// Configure MongoDB connection options
const connectionOptions = proxyUrl ? {
  proxy: {
    protocol: proxyUrl.protocol.slice(0, -1), // Remove trailing colon
    host: proxyUrl.hostname,
    port: proxyUrl.port,
    username: proxyUrl.username,
    password: proxyUrl.password,
  },
} : {};

// Connect to MongoDB
mongoose
  .connect(mongoURI, connectionOptions)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Celebrate error handling
app.use(errors());

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
