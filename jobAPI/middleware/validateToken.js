const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler((req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "invalid token format" });
  }
  token = authHeader.split(" ")[1];
  if (!token) return res.status(401);

  const decode = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
  req.user = decode.user;

  next();
});

module.exports = validateToken;
