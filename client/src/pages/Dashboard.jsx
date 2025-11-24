import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import { Check, Trash2, Flame, Target, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import VideoRecommendations from '../components/VideoRecommendations';

const Dashboard = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedHabitId, setExpandedHabitId] = useState(null);
    const { user, updateUserStats } = useContext(AuthContext);

    useEffect(() => {
        fetchHabits();
    }, []);

    const fetchHabits = async () => {
        try {
            const response = await api.get('/habits');
            setHabits(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching habits:', error);
            setLoading(false);
        }
    };

    const handleToggleHabit = async (id) => {
        try {
            const today = new Date().toISOString();
            const response = await api.put(`/habits/${id}`, { toggleDate: today });

            setHabits(habits.map(habit =>
                habit._id === id ? { ...habit, completedDates: response.data.completedDates, streak: response.data.streak } : habit
            ));

            if (response.data.userXP !== undefined) {
                updateUserStats({ xp: response.data.userXP, level: response.data.userLevel });
                const isCompleted = response.data.completedDates.some(d => d.split('T')[0] === today.split('T')[0]);
                if (isCompleted) toast.success('+10 XP! Keep it up!');
            }
        } catch (error) {
            toast.error('Failed to update habit');
        }
    };

    const handleDeleteHabit = async (id) => {
        if (window.confirm('Are you sure you want to delete this habit?')) {
            try {
                await api.delete(`/habits/${id}`);
                setHabits(habits.filter(habit => habit._id !== id));
                toast.success('Habit deleted');
            } catch (error) {
                toast.error('Failed to delete habit');
            }
        }
    };

    if (loading) return <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;

    const totalCompletedToday = habits.reduce((acc, habit) => {
        const today = new Date().toISOString().split('T')[0];
        return acc + (habit.completedDates.some(d => d.split('T')[0] === today) ? 1 : 0);
    }, 0);

    const totalActiveStreaks = habits.reduce((acc, habit) => acc + (habit.streak > 0 ? 1 : 0), 0);
    const todayProgress = habits.length > 0 ? Math.round((totalCompletedToday / habits.length) * 100) : 0;

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
                    <p className="text-base-content/70">Track your daily progress</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-base-content/70">Today's Progress</p>
                    <p className="text-3xl font-bold text-blue-600">{todayProgress}%</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="card bg-base-100 shadow-sm border border-base-200">
                    <div className="card-body">
                        <div className="flex items-center gap-2 mb-2 text-blue-500">
                            <Target size={20} />
                            <span className="font-semibold">Total Habits</span>
                        </div>
                        <p className="text-4xl font-bold">{habits.length}</p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-sm border border-base-200">
                    <div className="card-body">
                        <div className="flex items-center gap-2 mb-2 text-green-500">
                            <CheckCircle2 size={20} />
                            <span className="font-semibold">Completed Today</span>
                        </div>
                        <p className="text-4xl font-bold">{totalCompletedToday}</p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-sm border border-base-200">
                    <div className="card-body">
                        <div className="flex items-center gap-2 mb-2 text-orange-500">
                            <Flame size={20} />
                            <span className="font-semibold">Active Streaks</span>
                        </div>
                        <p className="text-4xl font-bold">{totalActiveStreaks}</p>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Your Habits</h2>
            <p className="text-sm text-base-content/70 mb-6">Mark habits as complete for today</p>

            {habits.length === 0 ? (
                <div className="text-center py-12 bg-base-100 rounded-xl border border-base-200">
                    <p className="mb-4 text-base-content/60">No habits found. Start by adding one!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <AnimatePresence>
                        {habits.map(habit => {
                            const isCompleted = habit.completedDates.some(d => d.split('T')[0] === new Date().toISOString().split('T')[0]);
                            return (
                                <div key={habit._id}>
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center justify-between p-4 bg-base-100 rounded-xl shadow-sm border border-base-200 hover:shadow-md transition-shadow relative z-10"
                                    >
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleToggleHabit(habit._id)}
                                                className={`btn btn-circle btn-sm ${isCompleted ? 'btn-success text-white' : 'btn-outline bg-base-100'}`}
                                            >
                                                <Check size={16} />
                                            </button>
                                            <div>
                                                <h3 className={`font-semibold text-lg ${isCompleted ? 'line-through text-base-content/50' : ''}`}>
                                                    {habit.name}
                                                </h3>
                                                <div className="flex gap-2 mt-1">
                                                    <span className="badge badge-ghost badge-xs">{habit.category}</span>
                                                    <span className={`badge badge-xs ${habit.difficulty === 'Hard' ? 'badge-error text-white' :
                                                        habit.difficulty === 'Medium' ? 'badge-warning' : 'badge-success text-white'
                                                        }`}>
                                                        {habit.difficulty}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {habit.streak > 0 && (
                                                <div className="flex items-center gap-1 text-orange-500 font-bold">
                                                    <Flame size={18} />
                                                    <span>{habit.streak}</span>
                                                </div>
                                            )}
                                            <button
                                                onClick={() => setExpandedHabitId(expandedHabitId === habit._id ? null : habit._id)}
                                                className={`btn btn-sm ${expandedHabitId === habit._id ? 'btn-primary' : 'btn-ghost'}`}
                                            >
                                                {expandedHabitId === habit._id ? 'Hide Videos' : 'Watch Videos'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteHabit(habit._id)}
                                                className="btn btn-ghost btn-sm text-error opacity-50 hover:opacity-100"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                    <AnimatePresence>
                                        {expandedHabitId === habit._id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-4 bg-base-200/50 rounded-b-xl -mt-2 mb-4 mx-2 border-x border-b border-base-200">
                                                    <VideoRecommendations habitName={habit.name} />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}

                    </AnimatePresence>
                </div >
            )}
        </div >
    );
};

export default Dashboard;
