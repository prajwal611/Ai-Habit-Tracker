const express = require('express');
const router = express.Router();
const { createCheckIn, getCheckIns } = require('../controllers/checkInController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createCheckIn).get(protect, getCheckIns);

module.exports = router;
