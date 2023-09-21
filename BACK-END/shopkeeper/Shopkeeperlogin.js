const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require("./configuration");
const User = require("./signupSchema");

// express app shorthands
const app = express();
app.use(cors());
const PORT = 4000;

// parses then request body to json
app.use(express.json());

app.post("/shopkeeperlogin", async (req, resp) => {
    try {
        const {Email,Createpassword,Securitycode} = req.body;
        
        const existingUser = await User.findOne({ Email, Createpassword,Securitycode });
        if (existingUser) {
            resp.status(200).json({ success: true, message: "Login successfully" });
            console.log("Login successfully")
        }
        else
        {
            console.log("User not found")
            resp.status(404).json({ success: false, message: "User not found" });
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