const axios = require('axios');

const getYouTubeVideos = async (req, res) => {
    try {
        const { habit } = req.query;

        if (!habit) {
            return res.status(400).json({ message: 'Habit name is required' });
        }

        const apiKey = process.env.YT_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ message: 'YouTube API key is not configured' });
        }

        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: `${habit} motivation guide`,
                maxResults: 6,
                type: 'video',
                key: apiKey
            }
        });

        const videos = response.data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.medium.url,
            channelTitle: item.snippet.channelTitle
        }));

        res.json(videos);
    } catch (error) {
        console.error('Error fetching YouTube videos:', error.message);
        res.status(500).json({ message: 'Failed to fetch video suggestions' });
    }
};

module.exports = { getYouTubeVideos };
