const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
require("./Shopkeeperconfiguration");
const User = require("./ShopkeepersignupSchema");

// express app shorthands
const app = express();
const PORT = 4000;

// parses then request body to json
app.use(express.json());
app.use(cors());

// POST API
app.post("/shopkeepersignup", async (req, resp) => {
    try {
        const { Fullname, Createpassword, Email, Phone } = req.body;
        const existingUser = await User.findOne({ Email, Phone });

        if (existingUser) {
            resp.status(400).send({success: false, message: "User with this email and phone already exists."});
        } else {
            const data = new User({Fullname, Email, Phone, Createpassword});
            const result = await data.save()
            const { Createpassword:_,...loggedResult } = result.toObject();

            console.log(loggedResult);
            resp.status(200).send({success: true, message: "Sign-up successfully"});
        }
    } catch (error) {
        resp.status(500).send(error.message);
        console.log(error.message);
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