const User = require("../models/user.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");
module.exports.signUp = asyncHandler(async (req, res) => {
  try {
    const { email, businessName, password, confirmPassword } = req.body;

    // Check if the passwords match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "password and confirmPassword do not match" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Generate a unique seller URL
    const sellerUrl = generateUniqueSellerUrl();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      businessName,
      password: hashedPassword,
      sellerUrl,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a token for authentication
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY);

    // Return the token and user details
    return res.status(201).json({
      token,
      user: { _id: newUser._id, email, businessName, sellerUrl },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }

  // Helper function to generate a unique seller URL
  function generateUniqueSellerUrl() {
    // Generate a random string or use a library to generate a unique identifier
    return Math.random().toString(36).substr(2, 8);
  }
});

module.exports.login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a token for authentication
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    // Return the token and user details
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email,
        businessName: user.businessName,
        sellerUrl: user.sellerUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports.getUsers = asyncHandler(async (req, res) => {
  const user = await User.find().select("-password");
  if (!user) {
    return res.status(404).json({ message: "Not does not exists" });
  }
  return res.status(200).json(user);
});
