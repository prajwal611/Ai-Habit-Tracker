import { useState, useEffect } from 'react';
import api from '../api/axios';
import { ExternalLink, Play, Loader2 } from 'lucide-react';

const VideoRecommendations = ({ habitName }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            if (!habitName) return;

            try {
                setLoading(true);
                // Use the relative path configured in axios instance
                const response = await api.get(`/youtube?habit=${encodeURIComponent(habitName)}`);
                setVideos(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching videos:', err);
                setError('Failed to load video suggestions');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [habitName]);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8 text-base-content/50">
                <Loader2 className="animate-spin mr-2" />
                <span>Finding motivation for you...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-4 text-error text-sm">
                {error}
            </div>
        );
    }

    if (videos.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <h4 className="text-sm font-bold uppercase tracking-wider text-base-content/50 mb-4 flex items-center gap-2">
                <Play size={16} className="text-red-500" />
                Recommended for {habitName}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                    <a
                        key={video.id}
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group card bg-base-100 image-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-48 overflow-hidden"
                    >
                        <figure>
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </figure>
                        <div className="card-body p-4 justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                            <h5 className="card-title text-sm text-white line-clamp-2 leading-tight">
                                {video.title}
                            </h5>
                            <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
                                <span className="truncate">{video.channelTitle}</span>
                                <ExternalLink size={12} />
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default VideoRecommendations;
