const mongoose = require("mongoose");

// Mongoose schema
const SchemaSET = new mongoose.Schema({
  name: {
  type: String,
  required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
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
    contentType: {
      type: String,
      required: false
    },
    data: {
      type: Buffer,
      required: false
    }
  },
  dateofbirth: {
    type: String,
    required: false
  },
  address: {
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