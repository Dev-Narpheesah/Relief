const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const disasterReportSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  disasterType: { type: String, required: true },
  userImage: { type: String, required: true },
  stakeholderName: { type: String, required: true },
  stakeholderPhone: { type: String, required: true },
  stakeholderPosition: { type: String, required: true },
  location: { type: String, required: true },
  report: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
   reportedBy: { type: ObjectId, required: true }
});

module.exports = mongoose.model('DisasterReport', disasterReportSchema);
