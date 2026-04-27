const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

  name: String,

  linkedin: String,

  questions: [String],

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Question", questionSchema);