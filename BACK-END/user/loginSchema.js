const mongoose = require("mongoose");

// Creating mongoose database connection
const SchemaSET = new mongoose.Schema({
    Username: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  }});

  const Database = mongoose.model("user",SchemaSET);

  module.exports = Database;