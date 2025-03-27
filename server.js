// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./utils/connectDB');
const tokenRoutes = require('./api/tokens');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/tokens', tokenRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
