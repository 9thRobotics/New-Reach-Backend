const express = require('express');
const connectDB = require('./config/db'); // Import the DB connection
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { celebrate, errors } = require('celebrate');
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
app.use('/api/tokens', require('./api/tokens')); // Correct route

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
connectDB();

app.use(errors());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
