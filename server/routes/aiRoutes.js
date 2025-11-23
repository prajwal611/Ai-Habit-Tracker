const express = require('express');
const router = express.Router();
const { getDailyMotivation, getHabitSuggestions } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/motivation', protect, getDailyMotivation);
router.post('/suggestions', protect, getHabitSuggestions);

module.exports = router;
