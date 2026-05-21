require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const User = require("./models/userModel");

const app = express();

/* ---------------- SECURITY + MIDDLEWARE ---------------- */
app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ added Authorization
  })
);
app.use(express.json());

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);

/* ---------------- /api/me — restore session on page reload ---------------- */
// ✅ this route was missing — AuthContext calls it on every page load
app.get("/api/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

/* ---------------- QUESTION BANK SCHEMA ---------------- */
const submissionSchema = new mongoose.Schema({
  name:           { type: String, required: true },
  linkedin:       { type: String, required: true },
  email:          { type: String },
  company:        { type: String, required: true },
  questions:      [String],
  additionalInfo: [String],
  createdAt:      { type: Date, default: Date.now },
});

const Submission = mongoose.model("Submission", submissionSchema);

// POST — save submission
app.post("/api/submissions", async (req, res) => {
  try {
    const submission = new Submission(req.body);
    await submission.save();
    res.status(201).json({ message: "Saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET — all submissions
app.get("/api/submissions", async (req, res) => {
  try {
    const data = await Submission.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- TEST ROUTE ---------------- */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server start error:", err);
  }
};

startServer();