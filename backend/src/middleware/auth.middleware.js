const jwt = require("jsonwebtoken");
const user = require('../models/UserModel')

const protected = (req, res, next) => {
  try {
    // Authorization Header
    let token;
    const authHeader = req.headers.authorization;

    // Check Token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided",
      });
    }

    // Extract Token
    const token = authHeader.split(" ")[1];

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save User Data
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

module.exports = authMiddleware;