require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Question = require("./models/Question");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);

/* ---------------- MONGODB CONNECTION ---------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ---------------- TEST ROUTE ---------------- */

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/api/questions", async (req, res) => {

  try {

    const { name, linkedin, questions } = req.body;

    const newQuestion = new Question({
      name,
      linkedin,
      questions
    });

    await newQuestion.save();

    res.json({
      success: true,
      message: "Questions saved successfully"
    });

  } catch (error) {

    console.log("Error saving question:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

});
/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
