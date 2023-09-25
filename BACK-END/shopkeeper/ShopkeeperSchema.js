const mongoose = require("mongoose");

// Creating mongoose database connection
const SchemaSET = new mongoose.Schema({
  name: {
  type: String,
  required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  securitycode:{
    type: String,
    required: true
  },
  shopid:{
    type: Number,
    required: true
  }
 });

const Database = mongoose.model("shopkeepers",SchemaSET);

module.exports = Database;