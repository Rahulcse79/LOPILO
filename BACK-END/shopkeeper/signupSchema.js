const mongoose = require("mongoose");

// Creating mongoose database connection
const SchemaSET = new mongoose.Schema({
    Fullname: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  EmailOTP: {
    type: Number,
    required: false
  },
  Phone: {
    type: Number,
    required: true
  },
  PhoneOTP: {
    type: Number,
    required: false
  },
  Createpassword: {
    type: String,
    required: true
  },
  Reenterpassword: {
    type: String,
    required: true
  }});

const Database = mongoose.model("shopkeeper",SchemaSET);

module.exports = Database;