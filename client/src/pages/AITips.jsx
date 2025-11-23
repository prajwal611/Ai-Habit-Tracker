import { useState } from 'react';
import api from '../api/axios';
import { Sparkles, Lightbulb } from 'lucide-react';
import { toast } from 'react-toastify';

const AITips = () => {
    const [motivation, setMotivation] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loadingMot, setLoadingMot] = useState(false);
    const [loadingSugg, setLoadingSugg] = useState(false);

    const getMotivation = async () => {
        setLoadingMot(true);
        try {
            const response = await api.post('/ai/motivation');
            setMotivation(response.data.message);
        } catch (error) {
            toast.error('Failed to get motivation');
        } finally {
            setLoadingMot(false);
        }
    };

    const getSuggestions = async () => {
        setLoadingSugg(true);
        try {
            // Using a generic goal for general suggestions
            const response = await api.post('/ai/suggestions', { goal: 'live a healthier and more productive life' });
            setSuggestions(response.data.suggestions);
        } catch (error) {
            toast.error('Failed to get suggestions');
        } finally {
            setLoadingSugg(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <h1 className="text-3xl font-bold mb-2">AI Recommendations</h1>
            <p className="text-base-content/70 mb-8">Get personalized habit suggestions powered by AI</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Daily Motivation Card */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-blue-500"><Sparkles size={20} /> Daily Motivation</h2>
                        <p className="text-sm text-base-content/70 mb-4">Get an inspiring message to boost your day</p>
                        <button
                            onClick={getMotivation}
                            className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 border-none text-white"
                            disabled={loadingMot}
                        >
                            {loadingMot ? <span className="loading loading-spinner"></span> : <><Sparkles size={18} /> Generate Motivation</>}
                        </button>
                    </div>
                </div>

                {/* Habit Suggestions Card */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-green-500"><Lightbulb size={20} /> Habit Suggestions</h2>
                        <p className="text-sm text-base-content/70 mb-4">Discover new habits based on general wellness</p>
                        <button
                            onClick={getSuggestions}
                            className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 border-none text-white"
                            disabled={loadingSugg}
                        >
                            {loadingSugg ? <span className="loading loading-spinner"></span> : <><Sparkles size={18} /> Get Recommendations</>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Area */}
            <div className="space-y-6">
                {motivation && (
                    <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
                        <div className="card-body items-center text-center">
                            <Sparkles size={32} className="text-blue-500 mb-2" />
                            <p className="text-xl font-medium italic text-blue-900">"{motivation}"</p>
                        </div>
                    </div>
                )}

                {suggestions.length > 0 && (
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="font-bold text-lg mb-4">Suggested Habits</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {suggestions.map((sugg, idx) => (
                                    <div key={idx} className="p-4 bg-base-200 rounded-lg border border-base-300">
                                        <p className="font-medium">{sugg}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {!motivation && suggestions.length === 0 && (
                    <div className="text-center py-12">
                        <Sparkles size={48} className="mx-auto mb-4 text-base-300" />
                        <p className="text-base-content/50">No recommendations yet</p>
                        <p className="text-sm text-base-content/40">Click on the cards above to get AI-powered suggestions and motivation</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AITips;
