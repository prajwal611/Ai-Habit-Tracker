const { GoogleGenerativeAI } = require('@google/generative-ai');

// @desc    Get Daily Motivation
// @route   POST /api/ai/motivation
// @access  Private
const getDailyMotivation = async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `Generate a short, powerful, and unique motivational quote or tip for someone trying to build good habits. Keep it under 30 words.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ message: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'AI Service Error' });
    }
};

// @desc    Get Habit Suggestions
// @route   POST /api/ai/suggestions
// @access  Private
const getHabitSuggestions = async (req, res) => {
    const { goal } = req.body;

    if (!goal) {
        res.status(400);
        throw new Error('Please provide a goal');
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `A user wants to achieve this goal: "${goal}". 
    Suggest 3 specific, actionable daily habits they can start. 
    Format the response as a simple list, one per line. Do not include numbering or bullet points, just the habit names.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Split by newlines and filter empty strings
        const suggestions = text.split('\n').filter(line => line.trim() !== '');

        res.status(200).json({ suggestions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'AI Service Error' });
    }
};

module.exports = {
    getDailyMotivation,
    getHabitSuggestions
};
