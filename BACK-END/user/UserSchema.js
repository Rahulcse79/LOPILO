const mongoose = require("mongoose");

// Creating mongoose database connection
const SchemaSET = new mongoose.Schema({
  fullname: {
  type: String,
  required: true
  },
  email: {
    type: String,
    required: true
  },
  Phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  });

const Database = mongoose.model("user",SchemaSET);

module.exports = Database;