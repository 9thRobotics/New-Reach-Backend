const express = require('express');
const dotenv = require('dotenv');
const purchaseRoute = require('./routes/purchase');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/purchase', purchaseRoute);

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
