const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password, role, year, company, jobRole } = req.body;

    const user = new User({
      fullName,
      email,
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
});

module.exports = router;
