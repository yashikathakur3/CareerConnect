const mongoose = require("mongoose");
const JOB_ROLES = require("../constants/jobRoles");

const submissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  linkedin: {
    type: String,
    required: true,
  },

  email: {
    type: String,
  },

  company: {
    type: String,
    required: true,
  },

  jobRole: {
    type: String,
    enum: JOB_ROLES,
    required: true,
  },

  questions: {
    type: [String],
    default: [],
  },

  additionalInfo: {
    type: [String],
    default: [],
  },

  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Submission", submissionSchema);
