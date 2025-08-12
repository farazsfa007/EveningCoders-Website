import express from "express";
const router = express.Router();
import multer from "multer";
import path from "path";
import fs from "fs";
import Certificate from "../models/Certificate.js";

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed."));
    }
    cb(null, true);
  },
});

// verify certificate

router.post("/verify-certificate", async (req, res) => {
  const { certificateNumber } = req.body;
  console.log("Incoming request body:", req.body);

  try {
    const certificate = await Certificate.findOne({ certificateNumber });
    console.log("Certificate found:", certificate);

    if (!certificate) {
      return res
        .status(404)
        .json({ success: false, message: "Certificate not found" });
    }

    const fullPdfUrl = `${req.protocol}://${req.get("host")}${
      certificate.pdfPath
    }`;

    res.json({
      success: true,
      data: {
        name: certificate.name,
        domain: certificate.domain,
        certificateNumber: certificate.certificateNumber,
        pdfUrl: fullPdfUrl,
      },
    });
  } catch (error) {
    console.error("Error verifying certificate:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Add certificate
router.post("/add-certificate", upload.single("pdf"), async (req, res) => {
  try {
    const { name, domain, certificateNumber } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "PDF file is required" });
    }

    // Check if certificate number already exists
    const existing = await Certificate.findOne({ certificateNumber });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Certificate number already exists" });
    }

    const newCertificate = new Certificate({
      name,
      domain,
      certificateNumber,
      pdfPath: `/uploads/${req.file.filename}`,
    });

    await newCertificate.save();

    res.status(201).json({
      success: true,
      message: "Certificate added successfully",
      data: newCertificate,
    });
  } catch (error) {
    console.error("Error adding certificate:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get certificate
router.get("/get-certificates", async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });

    const certificatesWithFullUrls = certificates.map((cert) => ({
      _id: cert._id,
      name: cert.name,
      domain: cert.domain,
      certificateNumber: cert.certificateNumber,
      pdfUrl: `${req.protocol}://${req.get("host")}${cert.pdfPath}`,
    }));

    res.json({
      success: true,
      data: certificatesWithFullUrls,
    });
  } catch (error) {
    console.error("Error fetching certificates:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
