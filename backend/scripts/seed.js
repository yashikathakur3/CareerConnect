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
    jobRole: "SDE-1",
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
  {
    fullName: "Ananya Rao",
    email: "ananya.alumni@careerconnect.edu",
    role: "alumni",
    year: "2023",
    company: "Flipkart",
    jobRole: "Backend Engineer",
  },
  {
    fullName: "Dev Patel",
    email: "dev.alumni@careerconnect.edu",
    role: "alumni",
    year: "2021",
    company: "Zomato",
    jobRole: "Data Analyst",
  },
  {
    fullName: "Meera Iyer",
    email: "meera.alumni@careerconnect.edu",
    role: "alumni",
    year: "2020",
    company: "Razorpay",
    jobRole: "Full Stack Developer",
  },
  {
    fullName: "Arjun Nair",
    email: "arjun.alumni@careerconnect.edu",
    role: "alumni",
    year: "2022",
    company: "TCS",
    jobRole: "Associate Consultant",
  },
  {
    fullName: "Pooja Menon",
    email: "pooja.alumni@careerconnect.edu",
    role: "alumni",
    year: "2023",
    company: "Microsoft",
    jobRole: "SDE-2",
  },
  {
    fullName: "Ishaan Khanna",
    email: "ishaan.alumni@careerconnect.edu",
    role: "alumni",
    year: "2021",
    company: "Paytm",
    jobRole: "Product Analyst",
  },
];

const submissions = [
  {
    alumniEmail: "riya.alumni@careerconnect.edu",
    name: "Riya Mehta",
    linkedin: "https://linkedin.com/in/riya-mehta",
    email: "riya.alumni@careerconnect.edu",
    company: "Google",
    jobRole: "SDE-1",
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
    jobRole: "SDE-1",
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
    jobRole: "Frontend Engineer",
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
    jobRole: "Systems Engineer",
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
  {
    alumniEmail: "ananya.alumni@careerconnect.edu",
    name: "Ananya Rao",
    linkedin: "https://linkedin.com/in/ananya-rao",
    email: "ananya.alumni@careerconnect.edu",
    company: "Flipkart",
    jobRole: "Backend Engineer",
    questions: [
      "Design a shopping cart service with inventory checks.",
      "How would you handle concurrent orders for limited stock?",
      "Explain message queues and where you used them.",
      "Find the first non-repeating character in a stream.",
      "What are indexes, and when can they slow down writes?",
      "How would you debug high API latency in production?",
    ],
    additionalInfo: [
      "The interview focused on API design, databases, and reliability.",
      "They liked when I discussed failure cases and monitoring.",
      "Be ready to explain tradeoffs between SQL and NoSQL choices.",
    ],
  },
  {
    alumniEmail: "dev.alumni@careerconnect.edu",
    name: "Dev Patel",
    linkedin: "https://linkedin.com/in/dev-patel",
    email: "dev.alumni@careerconnect.edu",
    company: "Zomato",
    jobRole: "Data Analyst",
    questions: [
      "Write SQL to calculate weekly customer retention.",
      "How would you identify restaurants with declining order volume?",
      "Explain joins with an example from analytics.",
      "What metrics would you track for a food delivery campaign?",
      "How do you handle missing values in a dataset?",
      "Explain a dashboard you built and the decisions it supported.",
    ],
    additionalInfo: [
      "SQL was the most important part of the technical round.",
      "They asked me to explain business impact, not just charts.",
      "Prepare one strong analytics project with metrics and assumptions.",
    ],
  },
  {
    alumniEmail: "meera.alumni@careerconnect.edu",
    name: "Meera Iyer",
    linkedin: "https://linkedin.com/in/meera-iyer",
    email: "meera.alumni@careerconnect.edu",
    company: "Razorpay",
    jobRole: "Full Stack Developer",
    questions: [
      "Build an authentication flow with access and refresh tokens.",
      "How would you design a payment status page?",
      "Explain optimistic UI updates and rollback handling.",
      "What is the difference between authentication and authorization?",
      "Design database tables for invoices and payment attempts.",
      "How do you secure sensitive form inputs on the frontend?",
    ],
    additionalInfo: [
      "They asked both frontend and backend follow-ups on the same project.",
      "Security basics were important because it was a fintech role.",
      "Keep one full-stack project ready with architecture and schema details.",
    ],
  },
  {
    alumniEmail: "arjun.alumni@careerconnect.edu",
    name: "Arjun Nair",
    linkedin: "https://linkedin.com/in/arjun-nair",
    email: "arjun.alumni@careerconnect.edu",
    company: "TCS",
    jobRole: "Associate Consultant",
    questions: [
      "Explain SDLC phases with examples.",
      "What is the difference between black-box and white-box testing?",
      "Describe how you handled a difficult team deadline.",
      "Write a basic SQL query using GROUP BY and HAVING.",
      "Explain cloud computing in simple terms.",
      "Walk through your final year project and your exact contribution.",
    ],
    additionalInfo: [
      "Communication and confidence mattered as much as technical answers.",
      "They asked situational questions around teamwork and deadlines.",
      "Revise DBMS, software engineering basics, and project explanation.",
    ],
  },
  {
    alumniEmail: "pooja.alumni@careerconnect.edu",
    name: "Pooja Menon",
    linkedin: "https://linkedin.com/in/pooja-menon",
    email: "pooja.alumni@careerconnect.edu",
    company: "Microsoft",
    jobRole: "SDE-2",
    questions: [
      "Design a collaborative document editing system.",
      "How would you split a large React application into maintainable modules?",
      "Explain rate limiting strategies for public APIs.",
      "Find the lowest common ancestor in a binary tree.",
      "How do you mentor juniors during code reviews?",
      "Describe a production incident and how you resolved it.",
    ],
    additionalInfo: [
      "The bar was higher on ownership, design depth, and communication.",
      "They expected crisp reasoning around scaling and maintainability.",
      "Prepare examples showing leadership beyond just writing code.",
    ],
  },
  {
    alumniEmail: "ishaan.alumni@careerconnect.edu",
    name: "Ishaan Khanna",
    linkedin: "https://linkedin.com/in/ishaan-khanna",
    email: "ishaan.alumni@careerconnect.edu",
    company: "Paytm",
    jobRole: "Product Analyst",
    questions: [
      "How would you measure success for a wallet cashback feature?",
      "Design an experiment to test a new onboarding flow.",
      "Explain funnel analysis with an example.",
      "What would you do if transaction success rate drops suddenly?",
      "How do you prioritize product improvements with limited engineering time?",
      "Interpret a chart showing DAU growth but falling conversion.",
    ],
    additionalInfo: [
      "The round mixed analytics, product thinking, and communication.",
      "They cared about assumptions and how I would validate them.",
      "Practice explaining metrics in terms of user and business impact.",
    ],
  },
  {
    alumniEmail: "riya.alumni@careerconnect.edu",
    name: "Riya Mehta",
    linkedin: "https://linkedin.com/in/riya-mehta",
    email: "riya.alumni@careerconnect.edu",
    company: "Google",
    jobRole: "Frontend Engineer",
    questions: [
      "How would you improve Core Web Vitals for a large dashboard?",
      "Explain event delegation and when it helps performance.",
      "Build an accessible autocomplete component.",
      "What causes unnecessary React re-renders?",
      "How would you structure reusable design system components?",
      "Explain browser storage options and their tradeoffs.",
    ],
    additionalInfo: [
      "Accessibility and performance were discussed in detail.",
      "They asked me to reason about user experience and engineering quality.",
      "Know React fundamentals, browser APIs, and profiling tools.",
    ],
  },
  {
    alumniEmail: "kabir.alumni@careerconnect.edu",
    name: "Kabir Verma",
    linkedin: "https://linkedin.com/in/kabir-verma",
    email: "kabir.alumni@careerconnect.edu",
    company: "Amazon",
    jobRole: "Backend Engineer",
    questions: [
      "Design a notification service for millions of users.",
      "How would you make a retry system safe and idempotent?",
      "Explain horizontal scaling and load balancing.",
      "Find all anagrams of a string in another string.",
      "What is eventual consistency?",
      "How would you store and query audit logs efficiently?",
    ],
    additionalInfo: [
      "System design questions started simple and then added constraints.",
      "They valued clear APIs, data models, and operational thinking.",
      "Mention edge cases like duplicate events and partial failures.",
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
