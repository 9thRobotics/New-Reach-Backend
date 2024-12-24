const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/users', (req, res) => {
    const user = req.body;
    console.log('New User:', user);
    res.status(201).send(user);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
