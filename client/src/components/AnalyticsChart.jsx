import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AnalyticsChart = ({ habits }) => {
    // Calculate completion data for the last 7 days
    const getLast7Days = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            days.push(d.toISOString().split('T')[0]);
        }
        return days;
    };

    const data = getLast7Days().map(date => {
        const completedCount = habits.reduce((acc, habit) => {
            const isCompleted = habit.completedDates.some(d => d.split('T')[0] === date);
            return acc + (isCompleted ? 1 : 0);
        }, 0);

        const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
        return { name: dayName, completed: completedCount };
    });

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
                <h3 className="card-title text-lg mb-4">Weekly Progress</h3>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'hsl(var(--b1))', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                cursor={{ fill: 'transparent' }}
                            />
                            <Bar dataKey="completed" radius={[4, 4, 0, 0]}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.completed > 0 ? 'hsl(var(--p))' : 'hsl(var(--n))'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsChart;
