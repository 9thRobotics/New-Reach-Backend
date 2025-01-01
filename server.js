const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('9th Dimension Robotics Company'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});
const express = require('express');
const app = express();

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});
