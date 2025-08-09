const mongoose = require('mongoose');
const express = require('express');
const app = express();


// CONNECT Database
async function connectDB() {
  const mongoUrl = process.env.DB_URL;
  const dbName = process.env.DB_NAME;

  if (!mongoUrl || !dbName) {
    console.error('MONGO_URL and DB_NAME environment variables are required');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUrl, { dbName });
    console.log('Database is connected');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
}

connectDB();



// Message model
const Message = mongoose.model('Message', new mongoose.Schema({
  text: String,
}));


app.get('/', async (req, res) => {
  const messages = await Message.find({});
  res.json(messages)
});



app.get('/message', async (req, res) => {
  const { message } = req.query;
  if (!message) {
    return res.status(400).send('Query parameter "message" is required');
  }
  try {
    const saved = await Message.create({ text: message });
    res.send(`Message stored: ${saved.text}`);
  } catch (err) {
    res.status(500).send('Error storing message');
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
