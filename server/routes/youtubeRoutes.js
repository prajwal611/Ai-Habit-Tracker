const express = require('express');
const router = express.Router();
const { getYouTubeVideos } = require('../controllers/youtubeController');

router.get('/', getYouTubeVideos);

module.exports = router;
