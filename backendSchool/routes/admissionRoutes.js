import express from "express";
import multer from "multer";
import handleAdmissionForm from "../controllers/admissionController.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// Route for handling the admission form
router.post("/", upload.single("studentPhoto"), handleAdmissionForm);

export default router;
