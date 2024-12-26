const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello, World! This is new-reach-backend.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
