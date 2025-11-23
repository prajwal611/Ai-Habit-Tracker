import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { Sparkles, Plus } from 'lucide-react';

const AddHabit = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        category: 'Health',
        difficulty: 'Medium',
    });
    const [goal, setGoal] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loadingAI, setLoadingAI] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/habits', { ...formData, icon: '📝' }); // Default icon for now
            toast.success('Habit created successfully');
            navigate('/');
        } catch (error) {
            toast.error('Failed to create habit');
        }
    };

    const handleGetSuggestions = async () => {
        if (!goal.trim()) return toast.error('Please enter a goal');
        setLoadingAI(true);
        try {
            const response = await api.post('/ai/suggestions', { goal });
            setSuggestions(response.data.suggestions);
        } catch (error) {
            toast.error('Failed to get suggestions');
        } finally {
            setLoadingAI(false);
        }
    };

    const useSuggestion = (suggestion) => {
        setFormData({ ...formData, name: suggestion });
    };

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <h1 className="text-3xl font-bold mb-2">Add New Habit</h1>
            <p className="text-base-content/70 mb-8">Create habits manually or get AI-powered suggestions</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Manual Entry */}
                <div className="card bg-base-100 shadow-xl h-fit">
                    <div className="card-body">
                        <h2 className="card-title mb-4"><Plus size={20} /> New Habit Details</h2>
                        <p className="text-sm text-base-content/70 mb-4">Define your habit with a clear title and category</p>

                        <form onSubmit={handleCreate}>
                            <div className="form-control w-full mb-4">
                                <label className="label"><span className="label-text font-semibold">Habit Title *</span></label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full bg-base-200"
                                    placeholder="e.g., Morning meditation, Read 30 minutes"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-control w-full mb-4">
                                <label className="label"><span className="label-text font-semibold">Category *</span></label>
                                <select
                                    className="select select-bordered w-full bg-base-200"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option>Health</option>
                                    <option>Productivity</option>
                                    <option>Learning</option>
                                    <option>Mindfulness</option>
                                    <option>Fitness</option>
                                    <option>Finance</option>
                                </select>
                            </div>

                            <div className="form-control w-full mb-8">
                                <label className="label"><span className="label-text font-semibold">Difficulty *</span></label>
                                <select
                                    className="select select-bordered w-full bg-base-200"
                                    value={formData.difficulty}
                                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                >
                                    <option>Easy - Quick & Simple</option>
                                    <option>Medium - Requires some effort</option>
                                    <option>Hard - Challenging</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary w-full">Create Habit</button>
                        </form>
                    </div>
                </div>

                {/* Right: AI Suggestions */}
                <div className="card bg-base-100 shadow-xl h-fit">
                    <div className="card-body">
                        <h2 className="card-title mb-4 text-primary"><Sparkles size={20} /> AI Smart Suggestions</h2>
                        <p className="text-sm text-base-content/70 mb-4">Get personalized habit recommendations based on your goal</p>

                        <div className="form-control w-full mb-4">
                            <label className="label"><span className="label-text font-semibold">What's your goal?</span></label>
                            <input
                                type="text"
                                className="input input-bordered w-full bg-base-200"
                                placeholder="e.g., Improve my health and fitness"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleGetSuggestions}
                            className="btn btn-primary w-full mb-6 bg-blue-500 hover:bg-blue-600 border-none text-white"
                            disabled={loadingAI}
                        >
                            {loadingAI ? <span className="loading loading-spinner"></span> : <><Sparkles size={18} /> Get AI Suggestions</>}
                        </button>

                        {suggestions.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-sm font-semibold mb-2">Suggestions (Click to use):</p>
                                {suggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        onClick={() => useSuggestion(suggestion)}
                                        className="p-3 bg-base-200 rounded-lg cursor-pointer hover:bg-base-300 transition-colors flex items-center gap-2"
                                    >
                                        <Plus size={16} className="text-primary" />
                                        <span>{suggestion}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {suggestions.length === 0 && !loadingAI && (
                            <div className="text-center py-8 text-base-content/50">
                                <Sparkles size={48} className="mx-auto mb-2 opacity-20" />
                                <p className="text-sm">Enter your goal and click "Get AI Suggestions"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddHabit;
