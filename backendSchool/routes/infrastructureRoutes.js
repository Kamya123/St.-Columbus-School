// backend/routes/adminRoutes.js
import express from "express";
import {
  addSchoolInfrastructure,
  updateSchoolInfrastructure,
  deleteSchoolInfrastructure,
  getSchoolInfrastructure,
} from "../controllers/schoolInfrastructureController.js";
// import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes FIRST
// router.get("/schoolInfrastructure/public", (req, res) => {
//   // console.log('PUBLIC ROUTE HIT');
//   getSchoolInfrastructure(req, res);
// });

// // Protected routes AFTER
// router.use(authenticateAdmin); // Applies to routes below
router.get("/", getSchoolInfrastructure);
router.post("/", addSchoolInfrastructure);
router.put("/:id", updateSchoolInfrastructure);
router.delete("/:id", deleteSchoolInfrastructure);

export default router;
