const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require("./configuration");
const User = require("./UserSchema");

// express app shorthands
const app = express();
app.use(cors());
const PORT = 4000;

// parses then request body to json
app.use(express.json());

// User forgot password api.
app.put("/forgotpassword", async (req, resp) => {
    try {
        const {email,password} = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            existingUser.password =password;
            await existingUser.save();
            console.log("Your password has been changed.");
            resp.status(200).json({ success: true, message: "Your password has been changed." });
        }
        else
        {
            resp.status(404).json({ success: false, message: "User not found." });
        }
    } catch (error) {
        resp.status(500).json({success: false, message: "Internal Server Error."});
        console.error(error.message);
    }
});

// User login api.
app.post("/userlogin", async (req, resp) => {
    try {
        const {email,password} = req.body;
        
        const existingUser = await User.findOne({ email,password });
        if (existingUser) {
            resp.status(200).json({ success: true, message: "Login successfully." });
            console.log("Login successfully.")
        }
        else
        {
            console.log("User not found.")
            resp.status(404).json({ success: false, message: "User not found." });
        }
    } catch (error) {
        resp.status(500).json({success: false, message: "Internal Server Error."});
        console.error(error.message);
    }
});

// User signup api.
app.post("/usersignup", async (req, resp) => {
    try {
        const { name,password, email, phone } = req.body;
        const existingUser = await User.findOne({ email, phone });

        if (existingUser) {
            resp.status(400).json({success: false, message: "User with this email and phone already exists."});
        } else {
            const data = new User({name, email, phone,password});
            const result = await data.save()
            
            resp.status(200).json({ success: true, message: "signup successfully." });
        }
    } catch (error) {
        resp.status(500).json({success: false, message: "Internal Server Error."});
        console.error(error.message);
    }
});

// If database connection fails then don't start the server
mongoose.connection.on('error', (error) => {
    console.error('Error connecting to database: ', error);
});

mongoose.connection.once('open', () => {
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log('Server is running on port.', PORT);
    });
});