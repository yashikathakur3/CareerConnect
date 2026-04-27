const Question = require("../models/Question");

function isValidLinkedInUrl(linkedin) {
  return /^https?:\/\/(www\.)?linkedin\.com\/.+/i.test(linkedin);
}

async function createQuestion(req, res) {
  try {
    const { name, linkedin, questions } = req.body;
    const validQuestions = Array.isArray(questions)
      ? questions.map((question) => question.trim()).filter(Boolean)
      : [];

    if (!name || !linkedin || validQuestions.length < 4) {
      return res.status(400).json({
        success: false,
        message: "Name, LinkedIn URL, and at least 4 questions are required"
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters"
      });
    }

    if (!isValidLinkedInUrl(linkedin.trim())) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid LinkedIn URL"
      });
    }

    const question = new Question({
      name: name.trim(),
      linkedin: linkedin.trim(),
      questions: validQuestions
    });

    await question.save();

    res.status(201).json({
      success: true,
      message: "Questions saved successfully"
    });
  } catch (error) {
    console.log("Error saving question:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

module.exports = {
  createQuestion
};
