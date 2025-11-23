import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../api/axios';
import { TrendingUp, Calendar as CalendarIcon, CheckCircle } from 'lucide-react';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const CalendarView = () => {
    const [events, setEvents] = useState([]);
    const [stats, setStats] = useState({
        totalCompletions: 0,
        activeDays: 0,
        consistencyRate: 0
    });

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const response = await api.get('/habits');
                const habits = response.data;

                const newEvents = [];
                const uniqueDays = new Set();
                let totalCompletions = 0;

                habits.forEach(habit => {
                    habit.completedDates.forEach(dateStr => {
                        const date = new Date(dateStr);
                        uniqueDays.add(date.toISOString().split('T')[0]);
                        totalCompletions++;

                        newEvents.push({
                            title: habit.name,
                            start: date,
                            end: date,
                            allDay: true,
                            resource: habit
                        });
                    });
                });

                setEvents(newEvents);
                setStats({
                    totalCompletions,
                    activeDays: uniqueDays.size,
                    consistencyRate: Math.round((uniqueDays.size / 30) * 100) // Simplified 30-day calculation
                });

            } catch (error) {
                console.error('Error fetching habits:', error);
            }
        };

        fetchHabits();
    }, []);

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Calendar View</h1>
                <p className="text-base-content/70">Visualize your habit completion patterns</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card bg-base-100 shadow-sm border border-base-200">
                    <div className="card-body flex-row items-center justify-between">
                        <div>
                            <p className="text-sm text-base-content/70">Total Completions</p>
                            <p className="text-3xl font-bold">{stats.totalCompletions}</p>
                        </div>
                        <div className="text-blue-500 bg-blue-50 p-3 rounded-full">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-sm border border-base-200">
                    <div className="card-body flex-row items-center justify-between">
                        <div>
                            <p className="text-sm text-base-content/70">Active Days</p>
                            <p className="text-3xl font-bold">{stats.activeDays}<span className="text-lg text-base-content/50">/30</span></p>
                        </div>
                        <div className="text-green-500 bg-green-50 p-3 rounded-full">
                            <CalendarIcon size={24} />
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-sm border border-base-200">
                    <div className="card-body flex-row items-center justify-between">
                        <div>
                            <p className="text-sm text-base-content/70">Consistency Rate</p>
                            <p className="text-3xl font-bold">{stats.consistencyRate}%</p>
                        </div>
                        <div className="text-purple-500 bg-purple-50 p-3 rounded-full">
                            <CheckCircle size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Calendar */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body p-0 sm:p-6">
                    <div className="h-[600px]">
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: '100%' }}
                            eventPropGetter={() => ({
                                style: { backgroundColor: '#3b82f6', borderRadius: '4px' }
                            })}
                            views={['month']}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
