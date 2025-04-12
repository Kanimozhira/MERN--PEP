const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./dbConnect');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // serve static files from "public" folder

// Connect to MongoDB
connectDB(); // using external dbConnect.js

// MongoDB schema
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  firstName: String,
  dob: Date,
  department: String,
});

const Form = mongoose.model('Form', formSchema);

// POST route
app.post('/submit', async (req, res) => {
  const { firstName, dob, department } = req.body;

  try {
    const newForm = new Form({ firstName, dob, department });
    await newForm.save();
    res.send('Form submitted successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
