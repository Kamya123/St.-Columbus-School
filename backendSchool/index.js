import fs from 'fs';
import path from 'path';

// Write the service account JSON from environment variable to a temporary file
if (process.env.SERVICE_ACCOUNT_JSON) {
  const serviceAccountPath = path.join('/tmp', 'google-service-account.json');
  fs.writeFileSync(serviceAccountPath, process.env.SERVICE_ACCOUNT_JSON);
  process.env.GOOGLE_APPLICATION_CREDENTIALS = serviceAccountPath;
}


import 'dotenv/config';
import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();
import bodyParser from "body-parser";
import mongoose from "mongoose";

// Import and register routes
import admissionRoutes from "./routes/admissionRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import disclosureRoutes from "./routes/disclosureRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";


const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URL;

// Middleware
// app.use(cors({
//   origin: 'https://st-columbus-school.vercel.app',
//   methods: 'GET,POST,PUT,DELETE',
// }));

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// For local static uploads (if needed)
app.use("/uploads", express.static("uploads"));

// Mount API routes
app.use("/api/admission", admissionRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/disclosure", disclosureRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/teachers", teacherRoutes);


// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err.message);
  });

app.get("/", (req, res) => {
  res.send("Backend is running!");
});
