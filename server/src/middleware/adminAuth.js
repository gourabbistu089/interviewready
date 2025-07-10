const auth = require('./auth');

const adminAuth = async (req, res, next) => {
  // First check if user is authenticated
  await auth(req, res, () => {
    // Check if user has admin role
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }
  });
};

module.exports = adminAuth;