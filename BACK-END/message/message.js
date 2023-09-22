const express = require("express");
const cors = require("cors");
require("./configuration");
const User = require("./schema");
const mongoose = require("mongoose");

// express app shorthands
const app = express();
const PORT = 4000;

// parses then request body to json
app.use(express.json());
app.use(cors());

// message post api.
app.post("/message", async (req, resp) => {
  try {
      const { name, email, phone, message } = req.body;
  
          const data = new User({name, email, phone, message});
          const result = await data.save()
          
          resp.status(200).json({success: true, message: "Message send successfully."});
    }catch (error) {
      resp.status(500).json({success: false, message: "Internal Server Error."});
      console.log(error.message);
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