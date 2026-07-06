const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const protect = async (req, res, next) => {
  let token;

  // ✅ Option 1: Get token from Authorization header (Bearer)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // ✅ Option 2: Get token from Cookie (Recommended for your current setup)
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};

module.exports = {protect};