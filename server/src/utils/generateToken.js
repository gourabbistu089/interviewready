const jwt = require('jsonwebtoken');

const generateToken = (userId,expiresIntime = '1m'
) => {
  console.log("userId in generateToken", userId);
  console.log("expiresIntime in generateToken", expiresIntime);
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      // expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      expiresIn: expiresIntime
    }
  );
};

module.exports = generateToken;