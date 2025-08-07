const mongoose = require('mongoose');
const express = require('express');
const app = express();


// CONNECT DB
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

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
