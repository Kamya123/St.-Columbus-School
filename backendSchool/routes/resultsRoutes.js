// routes/resultsRoutes.js
import express from "express";
import multer from "multer";
import fs from "fs";
import { google } from "googleapis";
import Result from "../models/Result.js";

const router = express.Router();

// Multer: temporary file storage
const upload = multer({ dest: "uploads/" });

// Google Drive API setup
const auth = new google.auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});
const drive = google.drive({ version: "v3", auth });

/**
 * POST /api/results
 * Upload a result file to Google Drive and save its metadata.
 */
router.post("/", upload.single("document"), async (req, res) => {
  try {
    const { path: filePath, originalname, mimetype } = req.file;

    // Prepare metadata and media
    const fileMetadata = {
      name: originalname,
      parents: [process.env.GOOGLE_DRIVE_RESULTS_FOLDER_ID],
    };
    const media = {
      mimeType: mimetype,
      body: fs.createReadStream(filePath),
    };

    // Upload to Drive
    const driveResponse = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id, webViewLink, webContentLink",
    });

    // Delete temp file
    fs.unlinkSync(filePath);

    // Save to MongoDB
    const newResult = new Result({
      title: req.body.title,
      driveFileId: driveResponse.data.id,
      webViewLink: driveResponse.data.webViewLink,
      webContentLink: driveResponse.data.webContentLink,
    });
    await newResult.save();

    res.status(201).json({ message: "Result uploaded", result: newResult });
  } catch (error) {
    console.error("Error uploading result:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

/**
 * GET /api/results
 * Fetch all results (newest first).
 */
router.get("/", async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ error: "Fetch failed" });
  }
});

/**
 * DELETE /api/results/:id
 * Remove a result from Drive and MongoDB.
 */
router.delete("/:id", async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Result not found" });
    }

    // Delete from Google Drive
    await drive.files.delete({ fileId: result.driveFileId });

    // Delete from DB
    await result.deleteOne();

    res.json({ message: "Result deleted" });
  } catch (error) {
    console.error("Error deleting result:", error);
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;
