import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        if (response.data) {
            const userData = {
                ...response.data,
                xp: response.data.xp || 0,
                level: response.data.level || 1
            };
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
        }
        return response.data;
    };

    const signup = async (name, email, password) => {
        const response = await api.post('/auth/signup', { name, email, password });
        if (response.data) {
            const userData = {
                ...response.data,
                xp: 0,
                level: 1
            };
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
        }
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const updateUserStats = (newStats) => {
        if (!user) return;
        const updatedUser = { ...user, ...newStats };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, updateUserStats }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
