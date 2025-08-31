const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies.token;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Access denied.'
      });
    }

    // console.log("token in auth middleware", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded in auth middleware", decoded);
    const user = await User.findById(decoded.id).select('-password');
    // console.log("user in auth middleware", user);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid. User not found.'
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'User account is not verified.'
      });
    }

    req.user = user;
    next();
  } catch (error) { 
    res.status(500).json({
      success: false,
      message: 'Authentication failed. ' + error.message,
    });
  }
};

module.exports = auth;