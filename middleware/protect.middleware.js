const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.schema");
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not Authorized " });
    }
  } else {
    return res.status(403).json({ message: "Please provide the token first" });
  }
});

module.exports = protect;
