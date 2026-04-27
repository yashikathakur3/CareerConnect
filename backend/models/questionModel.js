const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },

  linkedin: {
    type: String,
    required: true,
    trim: true
  },

  questions: {
    type: [String],
    required: true,
    validate: {
      validator: function (questions) {
        return questions.length >= 4;
      },
      message: "At least 4 questions are required"
    }
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Question", questionSchema);
