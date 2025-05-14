// backend/routes/adminRoutes.js
import express from "express";
import {
  addStaffs,
  updateStaffs,
  deleteStaffs,
  getStaffs,
} from "../controllers/staffsController.js";
// import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes FIRST
// router.get("/staffs/public", (req, res) => {
//   // console.log('PUBLIC ROUTE HIT');
//   getStaffs(req, res);
// });

// // Protected routes AFTER
// router.use(authenticateAdmin); // Applies to routes below
router.get("/", getStaffs);
router.post("/", addStaffs);
router.put("/:id", updateStaffs);
router.delete("/:id", deleteStaffs);

export default router;
