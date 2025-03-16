// routes/disclosureRoutes.js
import express from "express";
import multer from "multer";
import fs from "fs";
import { google } from "googleapis";
import MandatoryDisclosure from "../models/MandatoryDisclosure.js";

const router = express.Router();

// Configure multer to temporarily store uploaded files
const upload = multer({ dest: "uploads/" });

// Configure Google Drive API authentication
// It will automatically use the GOOGLE_APPLICATION_CREDENTIALS env variable.
const auth = new google.auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});
const drive = google.drive({ version: "v3", auth });

/**
 * POST /api/disclosure
 * Upload a disclosure document to Google Drive and save its metadata to MongoDB.
 */
router.post("/", upload.single("document"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileMetadata = {
      name: req.file.originalname,
      // If you want to upload into a specific folder:
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
    };
    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(filePath),
    };

    const driveResponse = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id, webViewLink, webContentLink",
    });

    // Remove the temporary file
    fs.unlinkSync(filePath);

    // Save the file metadata to MongoDB
    const newDisclosure = new MandatoryDisclosure({
      title: req.body.title,
      driveFileId: driveResponse.data.id,
      webViewLink: driveResponse.data.webViewLink,
      webContentLink: driveResponse.data.webContentLink,
    });
    await newDisclosure.save();

    res.status(201).json({
      message: "Disclosure uploaded successfully",
      disclosure: newDisclosure,
    });
  } catch (error) {
    console.error("Error uploading disclosure:", error);
    res.status(500).json({ error: "Failed to upload disclosure" });
  }
});

/**
 * GET /api/disclosure
 * Retrieve all uploaded mandatory disclosures.
 */
router.get("/", async (req, res) => {
  try {
    const disclosures = await MandatoryDisclosure.find().sort({ createdAt: -1 });
    res.json(disclosures);
  } catch (error) {
    console.error("Error fetching disclosures:", error);
    res.status(500).json({ error: "Failed to fetch disclosures" });
  }
});

/**
 * DELETE /api/disclosure/:id
 * Delete a disclosure document from Google Drive and remove its record from MongoDB.
 */
router.delete("/:id", async (req, res) => {
  try {
    // Find the disclosure record
    const disclosure = await MandatoryDisclosure.findById(req.params.id);
    if (!disclosure) {
      return res.status(404).json({ error: "Disclosure not found" });
    }

    // Delete the file from Google Drive
    await drive.files.delete({ fileId: disclosure.driveFileId });

    // Remove the record from MongoDB
    await disclosure.deleteOne();

    res.json({ message: "Disclosure deleted successfully" });
  } catch (error) {
    console.error("Error deleting disclosure:", error);
    res.status(500).json({ error: "Failed to delete disclosure" });
  }
});

export default router;
