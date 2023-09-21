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
  Phone: {
    type: Number,
    required: true
  },
  Createpassword: {
    type: String,
    required: true
  },
  Securitycode:{
    type: String,
    required: false
  }
 });

const Database = mongoose.model("shopkeepers",SchemaSET);

module.exports = Database;