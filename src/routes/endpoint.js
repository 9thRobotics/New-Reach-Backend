const express = require('express');
const router = express.Router();

// Example GET route
router.get('/', (req, res) => {
  res.json({ message: 'This is the endpoint route!' });
});

// Example POST route
router.post('/', (req, res) => {
  const { data } = req.body;
  res.json({ message: 'Data received successfully!', receivedData: data });
});

module.exports = router;
