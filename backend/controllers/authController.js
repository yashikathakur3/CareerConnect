const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

/* ---------------- SIGNUP ---------------- */
async function signup(req, res) {
  try {
    const { fullName, email, password, role, year, company, jobRole } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();

    if (!fullName || !email || !password || !role || !year) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, password, role, and year are required"
      });
    }

    if (fullName.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Full name must be at least 3 characters"
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    if (!["student", "alumni"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be either student or alumni"
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    // ✅ hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
      year,
      company,
      jobRole
    });

    await user.save();

    // ✅ generate token on signup too so user is logged in immediately
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        year: user.year,
        company: user.company,
        jobRole: user.jobRole
      }
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      success: false,
      message: "Signup failed"
    });
  }
}

/* ---------------- LOGIN ---------------- */
// ✅ was missing entirely — caused the "not valid JSON" error
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        year: user.year,
        company: user.company,
        jobRole: user.jobRole
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
}

module.exports = { signup, login };