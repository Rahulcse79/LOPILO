const mongoose = require("mongoose");

// Mongoose schema
const SchemaSET = new mongoose.Schema({
  suggestionstring: {
  type: String,
  required: true
  }
  });

const Database = mongoose.model("suggestion",SchemaSET);

module.exports = Database;