const express = require('express');
const dotenv = require('dotenv');
const purchaseRoute = require('./routes/purchase');

const cors = require('cors');
app.use(cors({
  origin: 'https://9throbotics.github.io/Reach-Frontend/', // Replace with your frontend's URL
  methods: 'GET,POST', // Specify

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/purchase', purchaseRoute);

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
