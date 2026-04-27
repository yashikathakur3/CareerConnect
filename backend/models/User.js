const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["student", "alumni"],
    required: true
  },

  year: {
    type: String
  },

  company: {
    type: String
  },

  jobRole: {
    type: String
  }
});

module.exports = mongoose.model("User", userSchema);