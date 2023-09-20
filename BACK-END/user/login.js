const express = require("express");
const mongoose = require('mongoose');
require("./configuration");
const User = require("./loginSchema");

// express app shorthands
const app = express();
const PORT = 4000;

// parses then request body to json
app.use(express.json());



// If database connection fails then don't start the server
mongoose.connection.on('error', (error) => {
    console.error('Error connecting to database:', error);
});

mongoose.connection.once('open', () => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log('Server is running on port', PORT);
    });
});