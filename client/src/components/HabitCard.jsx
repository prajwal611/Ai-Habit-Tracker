import { Check, Trash2, Flame } from 'lucide-react';
import { format } from 'date-fns';

const HabitCard = ({ habit, onToggle, onDelete }) => {
    const today = new Date().toISOString().split('T')[0];
    const isCompletedToday = habit.completedDates.some(
        (date) => date.split('T')[0] === today
    );

    return (
        <div className={`card bg-base-100 shadow-xl border-l-4 ${isCompletedToday ? 'border-success' : 'border-primary'}`}>
            <div className="card-body p-4">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="text-3xl">{habit.icon}</div>
                        <div>
                            <h3 className="card-title text-lg">{habit.name}</h3>
                            <p className="text-sm text-base-content/70">{habit.description}</p>
                        </div>
                    </div>
                    <div className="badge badge-ghost gap-1">
                        <Flame size={14} className="text-orange-500" />
                        {habit.streak}
                    </div>
                </div>

                <div className="card-actions justify-between items-center mt-4">
                    <div className="flex gap-2">
                        <div className="badge badge-outline text-xs">{habit.category}</div>
                        <div className={`badge badge-outline text-xs ${habit.difficulty === 'Hard' ? 'badge-error' :
                                habit.difficulty === 'Medium' ? 'badge-warning' : 'badge-success'
                            }`}>
                            {habit.difficulty}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => onDelete(habit._id)}
                            className="btn btn-square btn-ghost btn-sm text-error"
                        >
                            <Trash2 size={18} />
                        </button>
                        <button
                            onClick={() => onToggle(habit._id)}
                            className={`btn btn-circle btn-sm ${isCompletedToday ? 'btn-success text-white' : 'btn-outline'}`}
                        >
                            <Check size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HabitCard;
