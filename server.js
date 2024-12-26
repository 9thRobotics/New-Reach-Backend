const express = require('express');
require('dotenv').config(); // Add this line

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('9th Dimension Robotics Company'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});
