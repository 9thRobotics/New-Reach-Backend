const mongoose = require('mongoose');

const uri = 'mongodb+srv://phillipdfilkins:securePass123@cluster0.yt6an.mongodb.net/reach_database?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Connection error:', err));
