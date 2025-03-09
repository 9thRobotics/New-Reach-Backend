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
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}));
app.set('trust proxy', 1);
app.get('/', (req, res) => {
  res.send('9th Dimension Robotics Company');
});
app.use('/api/tokens', tokensRoute);
const proxyUrl = process.env.QUOTAGUARDSTATIC_URL;
const mongoURI = process.env.MONGO_URI;
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
    ...options
  })
  .then(() => {
    console.log('MongoDB connected successfully via QuotaGuard Static!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
app.use(errors());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // Add this line
const app = express();
const port = 3000;
const infuraUrl = process.env.INFURA_URL;
const mongoURI = process.env.MONGO_URI; // Add this line
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
