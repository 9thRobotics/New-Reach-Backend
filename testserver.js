const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Test server is running!');
});

app.listen(PORT, () => {
    console.log(`Test server is running on http://localhost:${PORT}`);
});

app.on('error', (err) => {
    console.error('Server error:', err);
});
