import { useState } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { Smile, Meh, Frown, Zap } from 'lucide-react';

const CheckIn = () => {
    const [mood, setMood] = useState('');
    const [energy, setEnergy] = useState(3);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!mood) return toast.error('Please select your mood');

        setLoading(true);
        try {
            await api.post('/check-ins', { mood, energy });
            toast.success('Check-in saved successfully!');
        } catch (error) {
            toast.error('Failed to save check-in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Daily Check-In</h1>
                <p className="text-base-content/70">How are you feeling today?</p>
            </div>

            <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                    <h2 className="card-title mb-1">Today's Status</h2>
                    <p className="text-sm text-base-content/70 mb-6">Track your mood and energy to get personalized insights</p>

                    {/* Mood Section */}
                    <div className="mb-8">
                        <label className="label font-semibold mb-2">How are you feeling? *</label>
                        <div className="grid grid-cols-3 gap-4">
                            <button
                                onClick={() => setMood('Happy')}
                                className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${mood === 'Happy'
                                        ? 'border-green-500 bg-green-50 text-green-600'
                                        : 'border-base-200 hover:border-green-200'
                                    }`}
                            >
                                <Smile size={40} />
                                <span className="font-medium">Happy</span>
                            </button>

                            <button
                                onClick={() => setMood('Okay')}
                                className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${mood === 'Okay'
                                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                                        : 'border-base-200 hover:border-blue-200'
                                    }`}
                            >
                                <Meh size={40} />
                                <span className="font-medium">Okay</span>
                            </button>

                            <button
                                onClick={() => setMood('Sad')}
                                className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${mood === 'Sad'
                                        ? 'border-red-500 bg-red-50 text-red-600'
                                        : 'border-base-200 hover:border-red-200'
                                    }`}
                            >
                                <Frown size={40} />
                                <span className="font-medium">Sad</span>
                            </button>
                        </div>
                    </div>

                    {/* Energy Section */}
                    <div className="mb-8">
                        <label className="label font-semibold mb-2">Energy Level (1-5) *</label>
                        <div className="grid grid-cols-5 gap-2 sm:gap-4">
                            {[1, 2, 3, 4, 5].map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setEnergy(level)}
                                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${energy === level
                                            ? 'border-blue-500 bg-blue-600 text-white'
                                            : 'border-base-200 hover:border-blue-200'
                                        }`}
                                >
                                    <Zap size={24} className={energy === level ? 'fill-current' : ''} />
                                    <span className="font-bold">{level}</span>
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-base-content/50 mt-2">1 = Very Low, 5 = Very High</p>
                    </div>

                    <div className="card-actions justify-end">
                        <button
                            onClick={handleSubmit}
                            className="btn btn-primary px-8"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : 'Save Check-In'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckIn;
