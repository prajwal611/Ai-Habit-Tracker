const CheckIn = require('../models/CheckIn');

// @desc    Create a new check-in
// @route   POST /api/check-ins
// @access  Private
const createCheckIn = async (req, res) => {
    const { mood, energy } = req.body;

    if (!mood || !energy) {
        res.status(400);
        throw new Error('Please provide mood and energy level');
    }

    // Check if already checked in today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingCheckIn = await CheckIn.findOne({
        userId: req.user._id,
        date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (existingCheckIn) {
        // Update existing
        existingCheckIn.mood = mood;
        existingCheckIn.energy = energy;
        const updatedCheckIn = await existingCheckIn.save();
        return res.status(200).json(updatedCheckIn);
    }

    const checkIn = await CheckIn.create({
        userId: req.user._id,
        mood,
        energy
    });

    res.status(201).json(checkIn);
};

// @desc    Get user check-ins
// @route   GET /api/check-ins
// @access  Private
const getCheckIns = async (req, res) => {
    const checkIns = await CheckIn.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json(checkIns);
};

module.exports = {
    createCheckIn,
    getCheckIns
};
