const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.header("authorization"); // lowercase works with axios
  if (!authHeader) return res.status(401).json({ msg: "No token, authorization denied" });

  // Remove "Bearer " prefix if present
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains id and role
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = protect;
