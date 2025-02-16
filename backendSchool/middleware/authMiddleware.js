// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};
