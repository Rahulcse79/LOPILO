const express = require("express");
const mongoose = require('mongoose');
require("./configuration");
const User = require("./signupSchema");

// express app shorthands
const app = express();
const PORT = 4000;

// parses then request body to json
app.use(express.json());

// POST API
app.post("/usersignup", async (req, resp) => {
    try {
        const { Fullname, Createpassword,Reenterpassword, Email, Phone } = req.body;
        const existingUser = await User.findOne({ Email, Phone });

        if (existingUser) {
            resp.status(400).send("User with this email and phone already exists.");
        } else {
            const data = new User({Fullname, Email, Phone, Createpassword, Reenterpassword});
            const result = await data.save()
            const { Createpassword:__,Reenterpassword: _, ...loggedResult } = result.toObject();

            resp.send(loggedResult);
            console.log(loggedResult);
        }
    } catch (error) {
        resp.status(500).send(error.message);
        console.error(error.message);
    }
});


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