const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require("./configuration");
const User = require("./suggestionSchema");

// express app shorthands
const app = express();
app.use(cors());
const PORT = 4001;

// parses then request body to json
app.use(express.json());

// suggestion get api call.
app.get('/addautosuggestion', async (req, resp) => {
    try {
        const existingUser = await User.find({});
        try {
            resp.status(200).json({ success: true, message: "Data come successfully.", existingUser });
        } catch (error) {
            resp.status(500).json({ success: false, message: "Error saving data." });
            console.error(error.message);
        }
    } catch (error) {
        resp.status(500).json({ success: false, message: "Internal Server Error." });
        console.error(error.message);
    }
});

//  suggestion add post api call.
app.post("/addautosuggestion", async (req, resp) => {
    
    try {
        const { suggestionstring } = req.body;
        const existingUser = await User.findOne({ suggestionstring });

        if (existingUser) {
            resp.status(400).json({success: false, message: "String already exist."});
        } else {
            const data = new User({suggestionstring});
            
            resp.status(200).json({success: true, message: "Added successfully." });
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
        console.log('Server is running on port:', PORT);
    });
});