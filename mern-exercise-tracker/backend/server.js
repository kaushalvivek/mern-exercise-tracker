// Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Get environment
require('dotenv').config();

// Create express web app, specify port
const app = express();
const port = process.env.PORT || 5000;

// Necessary specifications for functioning
app.use(cors());
app.use(express.json());

// Connect to DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises')
const userRouter = require('./routes/users')

app.use('/exercises', exercisesRouter)
app.use('/users', userRouter)

// Start app
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
