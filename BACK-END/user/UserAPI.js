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
        const { email, password } = req.body;
        
        const existingUser = await User.findOne({ email, password });
        
        if (existingUser) {
            const { password: _, ...loggedResult } = existingUser.toObject();

            const responseData = {
                success: true,
                message: "Login successful.",
            };

            if (loggedResult.name !== undefined) {
                responseData.name = loggedResult.name;
            }
            if (loggedResult.phone !== undefined) {
                responseData.phone = loggedResult.phone;
            }
            if (loggedResult.image !== undefined) {
                responseData.image = loggedResult.image;
            }
            if (loggedResult.dateofbirth !== undefined) {
                responseData.dateofbirth = loggedResult.dateofbirth;
            }
            if (loggedResult.addres !== undefined) {
                responseData.addres = loggedResult.addres;
            }
            if (loggedResult.pincode !== undefined) {
                responseData.pincode = loggedResult.pincode;
            }
            if (loggedResult.city !== undefined) {
                responseData.city = loggedResult.city;
            }
            if (loggedResult.state !== undefined) {
                responseData.state = loggedResult.state;
            }

            resp.status(200).json(responseData);
            
            console.log("Login successful.");
        } else {
            console.log("User not found.");
            resp.status(404).json({ success: false, message: "User not found." });
        }
    } catch (error) {
        resp.status(500).json({ success: false, message: "Internal Server Error." });
        console.error(error.message);
    }
});

// User update Api call.
app.put("/userupdateprofile", async (req, resp) => {
    try {
        const { name, image, dateofbirth, addres, pincode, phone, city, state } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (name !== undefined) {
                existingUser.name = name;
            }
            if (image !== undefined) {
                existingUser.image = image;
            }
            if (dateofbirth !== undefined) {
                existingUser.dateofbirth = dateofbirth;
            }
            if (addres !== undefined) {
                existingUser.addres = addres;
            }
            if (pincode !== undefined) {
                existingUser.pincode = pincode;
            }
            if (phone !== undefined) {
                existingUser.phone = phone;
            }
            if (city !== undefined) {
                existingUser.city = city;
            }
            if (state !== undefined) {
                existingUser.state = state;
            }

            const result = await existingUser.save();
            const { password: _, ...loggedResult } = result.toObject();
            const image = loggedResult.image;

            resp.status(200).json({
                success: true,
                message: "Update successful."
            }, image);
        } else {
            resp.status(404).json({
                success: false,
                message: "User not found."
            });
        }
    } catch (error) {
        resp.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
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