const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Public registration always creates a normal user.
    // Admin accounts should be created/managed by an authorized admin.
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: "user",
    });

    res.status(201).json({
      ...sanitizeUser(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    res.status(500).json({
      message: "Registration failed",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // password has select:false in the model, so explicitly include it here.
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      ...sanitizeUser(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
    });
  }
};

const getMe = async (req, res) => {
  res.status(200).json(sanitizeUser(req.user));
};

const updateMe = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (name !== undefined && (!name.trim() || name.trim().length < 2)) {
      return res.status(400).json({
        message: "Name must be at least 2 characters",
      });
    }

    if (email !== undefined && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      return res.status(400).json({
        message: "Please provide a valid email",
      });
    }

    if (password !== undefined && password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name !== undefined) user.name = name.trim();
    if (email !== undefined) user.email = email.trim().toLowerCase();
    if (password !== undefined) user.password = password;

    await user.save();

    res.status(200).json({
      ...sanitizeUser(user),
      message: "Profile updated successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email is already in use",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    res.status(500).json({
      message: "Profile update failed",
    });
  }
};

const logout = (req, res) => {
  // JWT authentication is stateless. The client should delete its stored token.
  res.status(200).json({
    message: "Logged out successfully",
  });
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  updateMe,
};
