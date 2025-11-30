
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CalendarView from './pages/CalendarView';
import AddHabit from './pages/AddHabit';
import AITips from './pages/AITips';
import Insights from './pages/Insights';
import CheckIn from './pages/CheckIn';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-base-200 font-sans text-base-content">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/add-habit" element={<AddHabit />} />
                            <Route path="/check-in" element={<CheckIn />} />
                            <Route path="/calendar" element={<CalendarView />} />
                            <Route path="/ai-tips" element={<AITips />} />
                            <Route path="/insights" element={<Insights />} />
                        </Route>
                    </Routes>
                    <ToastContainer position="bottom-right" />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
