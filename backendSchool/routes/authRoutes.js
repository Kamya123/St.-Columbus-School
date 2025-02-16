// backend/routes/authRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// Synchronously hash the admin password when the file loads
const adminPassword = "password"; // Plain text password for admin
const saltRounds = 10;
const hashedAdminPassword = bcrypt.hashSync(adminPassword, saltRounds);

// In-memory admin user (for demonstration purposes)
const adminUser = {
  username: "kamya",
  password: hashedAdminPassword,
};

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === adminUser.username) {
    try {
      const isMatch = await bcrypt.compare(password, adminUser.password);
      if (isMatch) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.status(200).json({ token });
      }
    } catch (error) {
      console.error("Error comparing passwords", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
  res.status(401).json({ message: "Invalid credentials" });
});

export default router;
