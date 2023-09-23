const mongoose = require("mongoose");

// Creating mongoose database connection
const SchemaSET = new mongoose.Schema({
  name: {
  type: String,
  required: false
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  dateofbirth: {
    type: Date,
    required: false
  },
  addres: {
    type: String,
    required: false
  },
  pincode: {
    type: Number,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  }
  });

const Database = mongoose.model("users",SchemaSET);

module.exports = Database;