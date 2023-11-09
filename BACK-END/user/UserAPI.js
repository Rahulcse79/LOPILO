const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require("./configuration");
const User = require("./UserSchema");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

// express app shorthands
const app = express();
app.use(cors());
const PORT = 4000;

// Set the maximum request size.
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Access denied, No token provided.' });
    } 
    jwt.verify(token, 'LOPILO', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  };
  

  // User profile api.
  app.get('/userprofile', verifyToken, (req, resp) => {
    resp.json({
      success: true,
      message: 'Access granted to profile.',
      user: req.user
    });
  });

// User login api.
app.post("/userlogin", async (req, resp) => {
    try {
        const { email, password } = req.body;
        
        const existingUser = await User.findOne({ email, password });
        
        if (existingUser) {
           const secretKey = "LOPILO";
           const token = await jwt.sign({ id: existingUser._id, username: existingUser.name }, secretKey, { expiresIn: '10h' });
           const { password: _, ...loggedResult } = existingUser.toObject();
           const responseData = {
                token,
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
            if (loggedResult.address !== undefined) {
                responseData.address = loggedResult.address;
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
            if (loggedResult.email !== undefined) {
                responseData.email = loggedResult.email;
            }

            resp.status(200).json({responseData, success: true, message: "Login successful."});
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
app.put("/userupdateprofile",upload.single('image') ,async (req, resp) => {
    try {
        const { email, name, image,dateofbirth, address, pincode, phone, city, state } = req.body;

        if (!email) {
            return resp.status(400).json({
                success: false,
                message: "Email is required."
            });
        }

        const formattedImage = {
            contentType: 'image/jpeg',
            data: Buffer.from(image, 'base64')
        };

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return resp.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (name !== undefined) {
            existingUser.name = name;
        }

        if (image !== undefined) {
            existingUser.image = formattedImage;
        }

        if (dateofbirth !== undefined) {
            existingUser.dateofbirth = dateofbirth;
        }

        // ... (add similar checks for other fields)

        const result = await existingUser.save();
        const { password: _, ...loggedResult } = result.toObject();

        const responseData = {};
        if (image) responseData.image = loggedResult.image;
        if (name) responseData.name = loggedResult.name;
        if (dateofbirth) responseData.dateofbirth = loggedResult.dateofbirth;
        if (city) responseData.city = loggedResult.city;
        if (pincode) responseData.pincode = loggedResult.pincode;
        if (phone) responseData.phone = loggedResult.phone;
        if (address) responseData.address = loggedResult.address;
        if (state) responseData.state = loggedResult.state;

        resp.status(200).json({
            responseData,
            success: true,
            message: "Update successful."
        });
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
        console.log('Server is running on port:', PORT);
    });
});