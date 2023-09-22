const express = require("express");
const cors = require("cors");
require("./Shopkeeperconfiguration");
const User = require("./ShopkeeperSchema");
const uuid = require('uuid');
const mongoose = require("mongoose");

// express app shorthands
const app = express();
const PORT = 4000;

// parses then request body to json
app.use(express.json());
app.use(cors());

function generateUniqueNumber() {
  const timestamp = Date.now().toString();
  const randomNum = Math.floor(Math.random() * 100000);
  const uniqueNumber = timestamp + randomNum.toString().padStart(5, '0');
  return uniqueNumber.slice(-12);
}

// shopkeeper signup api.
app.post("/shopkeepersignup", async (req, resp) => {
  try {
      const { name, password, email, phone } = req.body;
      const existingUser = await User.findOne({ email, phone });
      const uuidpassword = uuid.v4();
      securitycode=uuidpassword;
      const uniqueNumber = generateUniqueNumber();
      shopid=uniqueNumber;

      if (existingUser) {
          resp.status(400).json({success: false, message: "User with this email and phone already exists."});
      } else {
          const data = new User({name, email, phone, password, securitycode, shopid});
          const result = await data.save()
          const { password:_,...loggedResult } = result.toObject();
          
          console.log("Sign-up successfully.");
          resp.status(200).json({success: true, message: "Sign-up successfully.",shopid});
      }
  } catch (error) {
      resp.status(500).json({success: false, message: "Internal Server Error."});
      console.log(error.message);
  }
});

// shopkeeper forgot api.
app.put("/Shopkeeperforgotpassword", async (req, resp) => {
  try {
      const {email,password,shopid} = req.body;
      
      const existingUser = await User.findOne({ email,shopid });
      if (existingUser) {
          existingUser.password = password;
          await existingUser.save();
          console.log("Your password has been changed");
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

// shopkeeper security code forgot api.
app.put("/shopkeeperforgotsecuritypassword", async (req, resp) => {
  try {
      const {email,password,shopid,securitycode} = req.body;
      
      const existingUser = await User.findOne({ email,shopid,password });
      if (existingUser) {
          existingUser.securitycode = securitycode;
          await existingUser.save();
          console.log("Your security code has been changed.");
          resp.status(200).json({ success: true, message: "Your security code has been changed." });
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

// shopkeeper login api.
app.post("/shopkeeperlogin", async (req, resp) => {
  try {
      const {email,password,securitycode} = req.body;
      
      const existingUser = await User.findOne({ email, password,securitycode });
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