require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const Submission = require("../models/submissionModel");
const User = require("../models/userModel");

const password = "Password123";

const users = [
  {
    fullName: "Yashika Thakur",
    email: "yashika.student@careerconnect.edu",
    role: "student",
    year: "3rd Year",
  },
  {
    fullName: "Aarav Sharma",
    email: "aarav.student@careerconnect.edu",
    role: "student",
    year: "4th Year",
  },
  {
    fullName: "Riya Mehta",
    email: "riya.alumni@careerconnect.edu",
    role: "alumni",
    year: "2022",
    company: "Google",
    jobRole: "Software Engineer",
  },
  {
    fullName: "Kabir Verma",
    email: "kabir.alumni@careerconnect.edu",
    role: "alumni",
    year: "2021",
    company: "Amazon",
    jobRole: "SDE-1",
  },
  {
    fullName: "Sneha Kapoor",
    email: "sneha.alumni@careerconnect.edu",
    role: "alumni",
    year: "2020",
    company: "Microsoft",
    jobRole: "Frontend Engineer",
  },
  {
    fullName: "Nikhil Bansal",
    email: "nikhil.alumni@careerconnect.edu",
    role: "alumni",
    year: "2019",
    company: "Infosys",
    jobRole: "Systems Engineer",
  },
];

const submissions = [
  {
    alumniEmail: "riya.alumni@careerconnect.edu",
    name: "Riya Mehta",
    linkedin: "https://linkedin.com/in/riya-mehta",
    email: "riya.alumni@careerconnect.edu",
    company: "Google",
    questions: [
      "Explain the difference between var, let, and const in JavaScript.",
      "How would you design a URL shortener?",
      "Find the longest substring without repeating characters.",
      "What happens in the browser after entering a URL?",
      "Explain closures with a real example.",
    ],
    additionalInfo: [
      "There were two DSA rounds and one system design discussion.",
      "Interviewers focused on clear thinking more than memorized answers.",
      "Practice explaining tradeoffs out loud.",
    ],
  },
  {
    alumniEmail: "kabir.alumni@careerconnect.edu",
    name: "Kabir Verma",
    linkedin: "https://linkedin.com/in/kabir-verma",
    email: "kabir.alumni@careerconnect.edu",
    company: "Amazon",
    questions: [
      "Implement an LRU cache.",
      "Design an order tracking service.",
      "Tell me about a time you handled conflict in a team.",
      "Find the kth largest element in an array.",
      "Explain database indexing with examples.",
    ],
    additionalInfo: [
      "Leadership principles came up in every round.",
      "Prepare project stories using the STAR format.",
      "Keep DSA code clean and discuss edge cases before coding.",
    ],
  },
  {
    alumniEmail: "sneha.alumni@careerconnect.edu",
    name: "Sneha Kapoor",
    linkedin: "https://linkedin.com/in/sneha-kapoor",
    email: "sneha.alumni@careerconnect.edu",
    company: "Microsoft",
    questions: [
      "Reverse a linked list in groups of k.",
      "How does React reconciliation work?",
      "Design a notification system for Teams.",
      "Explain promises and async/await.",
      "What are controlled and uncontrolled components in React?",
    ],
    additionalInfo: [
      "They asked many follow-up questions on my resume projects.",
      "The frontend round tested fundamentals and accessibility basics.",
      "Be ready to explain why you chose a specific approach.",
    ],
  },
  {
    alumniEmail: "nikhil.alumni@careerconnect.edu",
    name: "Nikhil Bansal",
    linkedin: "https://linkedin.com/in/nikhil-bansal",
    email: "nikhil.alumni@careerconnect.edu",
    company: "Infosys",
    questions: [
      "Explain normalization in DBMS.",
      "Write a SQL query to find the second highest salary.",
      "What is the difference between HTTP and HTTPS?",
      "Explain OOP concepts with examples.",
      "Describe your final year project architecture.",
    ],
    additionalInfo: [
      "Aptitude and communication rounds were important.",
      "Revise DBMS, OOP, OS, and basic networking.",
      "They valued confidence and clarity in project explanation.",
    ],
  },
];

async function seed() {
  await connectDB();

  const hashedPassword = await bcrypt.hash(password, 10);
  const seededUsers = [];

  for (const user of users) {
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      { ...user, password: hashedPassword },
      { returnDocument: "after", upsert: true, runValidators: true }
    );

    seededUsers.push(updatedUser);
  }

  const alumniByEmail = new Map(seededUsers.map((user) => [user.email, user]));
  const alumniIds = seededUsers
    .filter((user) => user.role === "alumni")
    .map((user) => user._id);

  await Submission.deleteMany({ submittedBy: { $in: alumniIds } });

  const docs = submissions.map((submission) => {
    const alumni = alumniByEmail.get(submission.alumniEmail);
    const { alumniEmail, ...submissionData } = submission;

    return {
      ...submissionData,
      submittedBy: alumni._id,
    };
  });

  await Submission.insertMany(docs);

  console.log("Seed completed successfully");
  console.log(`Users upserted: ${seededUsers.length}`);
  console.log(`Submissions inserted: ${docs.length}`);
  console.log("");
  console.log("Demo login password for all seeded users:");
  console.log(password);
  console.log("");
  console.log("Student login:");
  console.log("yashika.student@careerconnect.edu");
  console.log("");
  console.log("Alumni login:");
  console.log("riya.alumni@careerconnect.edu");

  await mongoose.connection.close();
}

seed().catch(async (error) => {
  console.error("Seed failed:", error.message);
  await mongoose.connection.close();
  process.exit(1);
});
