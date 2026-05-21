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
    const { name, linkedin, company, jobRole, questions, additionalInfo } = req.body;
    const validQuestions = Array.isArray(questions)
      ? questions.map((question) => question.trim()).filter(Boolean)
      : [];
    const validAdditionalInfo = Array.isArray(additionalInfo)
      ? additionalInfo.map((info) => info.trim()).filter(Boolean)
      : [];

    if (!name || !linkedin || !company || !jobRole) {
      return res.status(400).json({
        message: "Name, LinkedIn URL, company, and job role are required",
      });
    }

    if (validQuestions.length < 5 || validAdditionalInfo.length < 3) {
      return res.status(400).json({
        message: "At least 5 questions and 3 tips are required",
      });
    }

    const submission = new Submission({
      ...req.body,
      questions: validQuestions,
      additionalInfo: validAdditionalInfo,
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

app.get("/api/alumni", authenticate, async (req, res) => {
  try {
    const alumni = await User.find({ role: "alumni" })
      .select("fullName email year company jobRole")
      .sort({ fullName: 1 });

    const submissions = await Submission.find({
      submittedBy: { $in: alumni.map((user) => user._id) },
    }).select("submittedBy company jobRole questions");

    const statsByUser = new Map();

    submissions.forEach((submission) => {
      const key = submission.submittedBy.toString();
      const current = statsByUser.get(key) || {
        experiences: 0,
        questions: 0,
        companies: new Set(),
        roles: new Set(),
      };

      current.experiences += 1;
      current.questions += submission.questions.length;
      if (submission.company) current.companies.add(submission.company);
      if (submission.jobRole) current.roles.add(submission.jobRole);

      statsByUser.set(key, current);
    });

    res.json(
      alumni.map((user) => {
        const stats = statsByUser.get(user._id.toString()) || {
          experiences: 0,
          questions: 0,
          companies: new Set(),
          roles: new Set(),
        };

        return {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          year: user.year,
          company: user.company,
          jobRole: user.jobRole,
          linkedin: `https://linkedin.com/search/results/people/?keywords=${encodeURIComponent(user.fullName)}`,
          contributionCount: stats.experiences,
          questionCount: stats.questions,
          companiesContributed: Array.from(stats.companies),
          rolesContributed: Array.from(stats.roles),
        };
      })
    );
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
