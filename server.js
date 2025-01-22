<<<<<<< HEAD
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
const proxyUrl = process.env.QUOTAGUARDSTATIC_URL;
const mongoURI = process.env.MONGO_URI;

// Extract proxy details from QUOTAGUARDSTATIC_URL
const proxyDetails = new url.URL(proxyUrl);
const options = {
  proxy: {
    host: proxyDetails.hostname,
    port: parseInt(proxyDetails.port),
    auth: {
      username: proxyDetails.username,
      password: proxyDetails.password,
    },
  },
};

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    // Remove deprecated options
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    ...options
  })
  .then(() => {
    console.log('MongoDB connected successfully via QuotaGuard Static!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Celebrate error handling
app.use(errors());

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // Add this line

const app = express();
const port = 3000;

const infuraUrl = process.env.INFURA_URL;
const mongoURI = process.env.MONGO_URI; // Add this line

// Add the MongoDB connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.get('/', (req, res) => {
  res.send(`Connected to Infura at ${infuraUrl}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
>>>>>>> cd2c430d012f4ac266d0a0ad29296efdf9e9a87e
