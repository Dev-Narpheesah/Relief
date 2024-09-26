const DisasterReport = require('../models/DisasterReport');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to upload the file to Cloudinary using streams
const streamUpload = (req) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};

// Create a new disaster report
const createDisasterReport = async (req, res) => {
  try {
    // Ensure a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await streamUpload(req);

    const report = new DisasterReport({
      ...req.body,
      userImage: result.secure_url, // Store the image URL from Cloudinary
    });

    await report.save();
    res.status(201).json({ message: 'Disaster report created successfully', disasterReport: report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create disaster report' });
  }
};

// Get all disaster reports
const getAllDisasterReports = async (req, res) => {
  try {
    const reports = await DisasterReport.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch disaster reports' });
  }
};

// Get a single disaster report by ID
const getDisasterReportById = async (req, res) => {
  try {
    const report = await DisasterReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: 'Disaster report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch disaster report' });
  }
};

// Update a disaster report
const updateDisasterReport = async (req, res) => {
  try {
    const updatedReport = await DisasterReport.findByIdAndUpdate(
      req.params.id,
      { ...req.body, userImage: req.file ? req.file.path : req.body.userImage }, // Update image if a new one is uploaded
      { new: true }
    );
    if (!updatedReport) {
      return res.status(404).json({ error: 'Disaster report not found' });
    }
    res.status(200).json({ message: 'Disaster report updated successfully', disasterReport: updatedReport });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update disaster report' });
  }
};

// Delete a disaster report
const deleteDisasterReport = async (req, res) => {
  try {
    const deletedReport = await DisasterReport.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ error: 'Disaster report not found' });
    }
    res.status(200).json({ message: 'Disaster report deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete disaster report' });
  }
};

module.exports = {
  createDisasterReport,
  getAllDisasterReports,
  getDisasterReportById,
  updateDisasterReport,
  deleteDisasterReport,
  upload
};
