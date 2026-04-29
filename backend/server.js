// // require("dotenv").config();

// // const express = require("express");
// // const cors = require("cors");
// // const mongoose = require("mongoose");
// // const connectDB = require("./config/db");
// // const authRoutes = require("./routes/authRoutes");
// // const questionRoutes = require("./routes/questionRoutes");

// // const app = express();

// // app.use(cors());
// // app.use(express.json());
// // app.use("/api", authRoutes);
// // app.use("/api/questions", questionRoutes);

// // /* ---------------- TEST ROUTE ---------------- */

// // app.get("/", (req, res) => {
// //   res.send("Backend is running");
// // });

// // const PORT = process.env.PORT || 5000;

// // connectDB();

// // app.post("/api/submit", (req, res) => {
// //   console.log(req.body);
// //   res.status(200).json({ message: "Success" });
// // });

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });


// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const questionRoutes = require("./routes/questionRoutes");

// const app = express();

// /* ---------------- MIDDLEWARE ---------------- */
// app.use(cors());
// app.use(express.json());

// /* ---------------- ROUTES (EXISTING WEBSITE) ---------------- */
// app.use("/api", authRoutes);
// app.use("/api/questions", questionRoutes);

// /* ---------------- SCHEMA (FROM QUESTION BANK) ---------------- */
// const submissionSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   linkedin: { type: String, required: true },
//   email: { type: String },
//   company: { type: String, required: true },
//   questions: [String],
//   additionalInfo: [String],
//   createdAt: { type: Date, default: Date.now },
// });

// const Submission = mongoose.model("Submission", submissionSchema);

// /* ---------------- QUESTION BANK ROUTES ---------------- */

// // ✅ SAVE FORM DATA
// app.post("/api/submit", async (req, res) => {
//   try {
//     const submission = new Submission(req.body);
//     await submission.save();
//     res.status(201).json({ message: "Saved successfully!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ GET ALL SUBMISSIONS
// app.get("/api/submissions", async (req, res) => {
//   try {
//     const data = await Submission.find().sort({ createdAt: -1 });
//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// /* ---------------- TEST ROUTE ---------------- */
// app.get("/", (req, res) => {
//   res.send("Backend is running");
// });

// /* ---------------- DB + SERVER START ---------------- */
// const PORT = process.env.PORT || 5000;

// connectDB(); // already handles mongoose.connect

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });




require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");

const app = express();

/* ---------------- SECURITY + MIDDLEWARE ---------------- */
app.use(helmet());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);

/* ---------------- QUESTION BANK SCHEMA ---------------- */
// Schema
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

// POST — form submit
app.post("/api/submissions", async (req, res) => {
  try {
    const submission = new Submission(req.body);
    await submission.save();
    res.status(201).json({ message: "Saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET — saare submissions
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
    await connectDB(); // ✅ DB connect first
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server start error:", err);
  }
};

startServer();

// app.post("/api/submissions", async (req, res) => {
//   console.log("👉 HIT /api/submissions");
//   console.log("👉 BODY:", req.body);

//   try {
//     const submission = new Submission(req.body);
//     await submission.save();
//     res.status(201).json({ message: "Saved successfully" });
//   } catch (err) {
//     console.error("❌ DB ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// });