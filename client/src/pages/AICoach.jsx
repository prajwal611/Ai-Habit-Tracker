import { useState } from 'react';
import api from '../api/axios';
import { Send, Bot, User } from 'lucide-react';
import { toast } from 'react-toastify';

const AICoach = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Hello! I am your AI Habit Coach. How can I help you improve your consistency today?' }
    ]);
    const [loading, setLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setLoading(true);

        try {
            const response = await api.post('/ai/coach', { message: userMessage });
            setMessages(prev => [...prev, { role: 'ai', content: response.data.message }]);
        } catch (error) {
            toast.error('Failed to get advice from AI');
            setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl h-[85vh] flex flex-col">
            <div className="bg-base-100 rounded-xl shadow-xl flex-1 flex flex-col overflow-hidden">
                <div className="p-4 bg-primary text-primary-content flex items-center gap-2">
                    <Bot size={24} />
                    <h1 className="text-xl font-bold">AI Habit Coach</h1>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full bg-base-300 flex items-center justify-center">
                                    {msg.role === 'user' ? <User size={20} className="m-auto" /> : <Bot size={20} className="m-auto" />}
                                </div>
                            </div>
                            <div className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full bg-base-300 flex items-center justify-center">
                                    <Bot size={20} className="m-auto" />
                                </div>
                            </div>
                            <div className="chat-bubble chat-bubble-secondary">
                                <span className="loading loading-dots loading-sm"></span>
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSend} className="p-4 bg-base-200 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask for advice..."
                        className="input input-bordered flex-1"
                        disabled={loading}
                    />
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AICoach;
