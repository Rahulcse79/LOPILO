const mongoose = require("mongoose");

// Creating mongoose database connection
const SchemaSET = new mongoose.Schema({
    Username: {
    type: String,
    required: true
  },
  Newpassword:{
    type: String,
    required: true
  },
    EnterOTP: {
    type: Number,
    required: false
  }});

  const Database = mongoose.model("user",SchemaSET);

  module.exports = Database;