require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const infuraUrl = process.env.INFURA_URL;

app.get('/', (req, res) => {
  res.send(`Connected to Infura at ${infuraUrl}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
