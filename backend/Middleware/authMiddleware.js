const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user associated with the token (excluding the password field)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check for specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if the user's role is allowed for this action
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied, insufficient permissions' });
    }
    next();
  };
};

module.exports = { protect, authorize };
