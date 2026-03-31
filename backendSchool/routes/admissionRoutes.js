// routes/admissionRoutes.js
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import handleAdmissionForm from "../controllers/admissionController.js";

const router = express.Router();

// Cloudinary is already configured in uploadRoutes.js, so we can reuse the same config here
// But to make this file independent, we configure it again (safe)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use Cloudinary Storage (no local disk)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "school-app/admissions",           // ← You can change folder name
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });

// Route for admission form with photo upload
router.post("/", upload.single("studentPhoto"), handleAdmissionForm);

export default router;



// import express from "express";
// import multer from "multer";
// import handleAdmissionForm from "../controllers/admissionController.js";

// const router = express.Router();

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

// // Route for handling the admission form
// router.post("/", upload.single("studentPhoto"), handleAdmissionForm);

// export default router;
