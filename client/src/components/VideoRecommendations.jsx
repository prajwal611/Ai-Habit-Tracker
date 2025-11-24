import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Play, Loader2 } from 'lucide-react';

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
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

const VideoCard = ({ video }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    if (isPlaying) {
        return (
            <div className="card bg-base-100 shadow-sm h-48 overflow-hidden animate-in fade-in duration-300">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            </div>
        );
    }

    return (
        <div
            onClick={() => setIsPlaying(true)}
            className="group card bg-base-100 image-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-48 overflow-hidden cursor-pointer"
        >
            <figure>
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </figure>
            <div className="card-body p-4 justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-red-600 text-white rounded-full p-3 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Play size={24} fill="currentColor" />
                    </div>
                </div>
                <h5 className="card-title text-sm text-white line-clamp-2 leading-tight relative z-10">
                    {video.title}
                </h5>
                <div className="flex items-center gap-2 text-xs text-gray-300 mt-1 relative z-10">
                    <span className="truncate">{video.channelTitle}</span>
                </div>
            </div>
        </div>
    );
};

export default VideoRecommendations;
