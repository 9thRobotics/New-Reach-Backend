const express = require('express');
const router = express.Router();

// Define the `/endpoint` route
router.get('/endpoint', (req, res) => {
  res.json({ message: "Endpoint is active!" });
});

module.exports = router;
