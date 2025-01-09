const infuraUrl = "https://sepolia.infura.io/v3/e402796c27ef40fcae5f8d4ef688599f";

// Your server setup and other code here

console.log(`Connected to Infura at ${infuraUrl}`);
const express = require('express');
const app = express();
const port = 3000;

const infuraUrl = "https://sepolia.infura.io/v3/e402796c27ef40fcae5f8d4ef688599f";

app.get('/', (req, res) => {
  res.send(`Connected to Infura at ${infuraUrl}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
