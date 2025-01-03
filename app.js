const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Middleware to force HTTPS in production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
  }
  next();
});

// Import and use the tokens routes
const tokensRouter = require('./tokens');
app.use('/api/tokens', tokensRouter);

// Define your routes here
app.get('/', (req, res) => {
  res.send('Hello, secure world!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
