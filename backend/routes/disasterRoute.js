const express = require('express');
// const  {createDisasterReport, getAllDisasterReports} = require('../controllers/disasterController');
const disasterController = require('../controllers/disasterController');
const multer = require('multer');

const router = express.Router();

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Disaster report route
router.post('/create', disasterController.upload.single('file'), disasterController.createDisasterReport);
router.get('/', disasterController.getAllDisasterReports);

module.exports = router;
