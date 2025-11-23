const Habit = require('../models/Habit');
const User = require('../models/User');

// @desc    Get habits
// @route   GET /api/habits
// @access  Private
const getHabits = async (req, res) => {
    const habits = await Habit.find({ userId: req.user.id });
    res.status(200).json(habits);
};

// @desc    Set habit
// @route   POST /api/habits
// @access  Private
const setHabit = async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error('Please add a text field');
    }

    const habit = await Habit.create({
        userId: req.user.id,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        difficulty: req.body.difficulty,
        icon: req.body.icon,
    });

    res.status(200).json(habit);
};

// @desc    Update habit
// @route   PUT /api/habits/:id
// @access  Private
const updateHabit = async (req, res) => {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
        res.status(400);
        throw new Error('Habit not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the habit user
    if (habit.userId.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    // Handle completion toggle specifically or general update
    if (req.body.toggleDate) {
        const date = new Date(req.body.toggleDate);
        const dateStr = date.toISOString().split('T')[0]; // Normalize to YYYY-MM-DD

        const existingIndex = habit.completedDates.findIndex(
            (d) => d.toISOString().split('T')[0] === dateStr
        );

        if (existingIndex > -1) {
            habit.completedDates.splice(existingIndex, 1);
        } else {
            habit.completedDates.push(date);

            // Award XP
            const user = await User.findById(req.user.id);
            const xpGain = 10;
            user.xp += xpGain;

            // Level Up Logic (Level = floor(XP / 100) + 1)
            const newLevel = Math.floor(user.xp / 100) + 1;
            if (newLevel > user.level) {
                user.level = newLevel;
            }
            await user.save();
        }

        // Recalculate streak
        habit.streak = habit.completedDates.length;

        await habit.save();

        // Return updated habit AND user stats
        const user = await User.findById(req.user.id);
        res.status(200).json({
            ...habit.toObject(),
            userXP: user.xp,
            userLevel: user.level
        });
    } else {
        const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(updatedHabit);
    }
};

// @desc    Delete habit
// @route   DELETE /api/habits/:id
// @access  Private
const deleteHabit = async (req, res) => {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
        res.status(400);
        throw new Error('Habit not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the habit user
    if (habit.userId.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await habit.deleteOne();

    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getHabits,
    setHabit,
    updateHabit,
    deleteHabit,
};
