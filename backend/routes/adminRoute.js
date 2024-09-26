const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/adminController');

const router = express.Router();
const {protect} = require("../middleware/authMiddleware")

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/total-users', getAllUsers);  // Add this line

module.exports = router;
