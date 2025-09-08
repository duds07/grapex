const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/grapex';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const User = require('./models/User');
const ModelVersion = require('./models/ModelVersion');

app.get('/api/test', async (req, res) => {
  try {
    const user = new User({ username: 'test', password: '123', role: 'user' });
    await user.save();
    res.send('✅ MongoDB is working! Test user saved.');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/model/version', async (req, res) => {
  try {
    const version = await ModelVersion.findOne().sort({ updatedAt: -1 });
    res.json(version || { version: 1, updatedAt: new Date() });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => console.log(`🚀 GrapeX backend running on port ${PORT}`));
