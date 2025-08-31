const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
// Register user
const register = async (req, res) => {
  try {
    const username = req.body.firstName + req.body.lastName; // Generate username from first and last name
    const { email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or username'
      });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName
    });

    // Generate token
    const token = generateToken(user._id,`5m`);
    // send verification email
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use SendGrid, Mailgun, etc.
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    
    const url = `${process.env.BACKEND_URL}/api/auth/verify/${token}`;

    await transporter.sendMail({
      to: email,
      subject: "Verify Your Email",
      html: `<h3>Click the link to verify:</h3> <a href="${url}">${url}</a>`,
    });

    res.status(201).json({
      success: true,
      message: "Registered successfully. Please check your email to verify!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        role: user.role,
        // profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    console.log("token in verifyEmail", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded in verifyEmail", decoded);
        const user = await User.findById(decoded.id);
        console.log("user in auth middleware", user);
    console.log("decoded in verifyEmail 🚀🚀🚀🚀", decoded);
    // const user = await User.findById({ _id: decoded.id });
    if (!user) return res.status(400).send("Invalid link || User not found");
    
    user.isVerified = true;
    await user.save();
    res.send("Email verified successfully ✅");
  } catch (err) {
    console.error("err in verifyEmail", err);
    res.status(400).send("Invalid or expired link");
  }
}

// Login user
const login = async (req, res) => {
  try {
    const { email, password, expiredTime } = req.body;

    // Find user by email
    const user = await User.findOne({ email })
    // .populate("activity.latestBlog")
    .populate("activity.latestSubtopic")
    .populate("activity.latestInterviewSession")
    .populate("activity.latestQuestion")
    // console.log("user in login", user);

    if(!user.isVerified){
      return res.status(401).json({
        success: false,
        message: 'Please verify your email before logging in.'
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id,expiredTime);

    res
    .cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30
      // maxAge: 1000 * 60
    })
    .json({
      success: true,
      message: 'Login successful',
      token,
      user
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

// Get current user
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    .populate("activity.latestSubtopic")
    .populate("activity.latestInterviewSession")
    .populate("activity.latestQuestion")
    .populate("activity.latestBlog");

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error getting user data',
      error: error.message
    });
  }
};

// Logout user (client-side mainly, but can be extended for token blacklisting)
const logout = async (req, res) => {
  try {
    // In a more sophisticated setup, you might want to blacklist the token
    // For now, we'll just send a success response
    res.
    clearCookie('token')
    .json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during logout',
      error: error.message
    });
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  getCurrentUser,
  logout
};