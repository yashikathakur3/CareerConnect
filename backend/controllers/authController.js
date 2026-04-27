const User = require("../models/userModel");

function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

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

    const user = new User({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password,
      role,
      year,
      company,
      jobRole
    });

    await user.save();

    res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    console.log("Signup Error:", error);

    res.status(500).json({
      success: false,
      message: "Signup failed"
    });
  }
}

module.exports = {
  signup
};
