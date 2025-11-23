import { useState, useEffect } from 'react';
import api from '../api/axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Insights = () => {
    const [habits, setHabits] = useState([]);
    const [checkIns, setCheckIns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [habitsRes, checkInsRes] = await Promise.all([
                    api.get('/habits'),
                    api.get('/check-ins')
                ]);
                setHabits(habitsRes.data);
                setCheckIns(checkInsRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;

    // Calculate Stats
    const totalHabits = habits.length;
    const totalCompletions = habits.reduce((acc, h) => acc + h.completedDates.length, 0);
    // Simplified completion rate (total completions / (habits * 7 days)) - rough estimate
    const completionRate = totalHabits > 0 ? Math.round((totalCompletions / (totalHabits * 7)) * 100) : 0;

    const avgMoodScore = checkIns.length > 0
        ? (checkIns.reduce((acc, c) => acc + (c.mood === 'Happy' ? 3 : c.mood === 'Okay' ? 2 : 1), 0) / checkIns.length).toFixed(1)
        : '0';

    const avgEnergy = checkIns.length > 0
        ? (checkIns.reduce((acc, c) => acc + c.energy, 0) / checkIns.length).toFixed(1)
        : '0';

    // Chart Data (Last 7 Days)
    const getLast7Days = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            days.push(d.toISOString().split('T')[0]);
        }
        return days;
    };

    const chartData = getLast7Days().map(date => {
        const count = habits.reduce((acc, habit) => {
            const isCompleted = habit.completedDates.some(d => d.split('T')[0] === date);
            return acc + (isCompleted ? 1 : 0);
        }, 0);

        const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
        return { name: dayName, completed: count };
    });

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Weekly Insights</h1>
                <p className="text-base-content/70">Your progress over the last 7 days</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="card bg-base-100 shadow-sm border border-base-200">
                    <div className="card-body p-6">
                        <p className="text-sm font-semibold text-base-content/70">Completion Rate</p>
                        <p className="text-3xl font-bold text-blue-600">{completionRate}%</p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-sm border border-base-200">
                    <div className="card-body p-6">
                        <p className="text-sm font-semibold text-base-content/70">Total Habits</p>
                        <p className="text-3xl font-bold">{totalHabits}</p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-sm border border-base-200">
                    <div className="card-body p-6">
                        <p className="text-sm font-semibold text-base-content/70">Avg Mood</p>
                        <p className="text-3xl font-bold">{avgMoodScore}<span className="text-lg text-base-content/50">/3</span></p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-sm border border-base-200">
                    <div className="card-body p-6">
                        <p className="text-sm font-semibold text-base-content/70">Avg Energy</p>
                        <p className="text-3xl font-bold">{avgEnergy}<span className="text-lg text-base-content/50">/5</span></p>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                    <h3 className="card-title text-lg mb-2 flex items-center gap-2">
                        <span className="text-blue-500">↗</span> Habit Completion Trend
                    </h3>
                    <p className="text-sm text-base-content/70 mb-6">Daily completion count for the past week</p>

                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--b1))', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar dataKey="completed" radius={[4, 4, 0, 0]} barSize={40}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill="#3b82f6" />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Insights;
