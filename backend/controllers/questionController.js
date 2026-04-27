const Question = require("../models/Question");

async function createQuestion(req, res) {
  try {
    const { name, linkedin, questions } = req.body;

    const question = new Question({
      name,
      linkedin,
      questions
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
