const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Add userId to request object
    next(); // Call the next middleware
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

module.exports = authMiddleware;