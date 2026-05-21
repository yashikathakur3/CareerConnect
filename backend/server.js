require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const Submission = require("./models/submissionModel");
const User = require("./models/userModel");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Login required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
}

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);

app.get("/api/me", authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.post("/api/submissions", authenticate, requireRole("alumni"), async (req, res) => {
  try {
    const submission = new Submission({
      ...req.body,
      submittedBy: req.user._id,
    });

    await submission.save();
    res.status(201).json({ message: "Saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/submissions", authenticate, async (req, res) => {
  try {
    const data = await Submission.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server start error:", err);
  }
};

startServer();
