import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { LogOut, LayoutDashboard, Calendar, Sparkles, Plus, BarChart2, CheckSquare, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'text-blue-600 font-semibold' : 'text-base-content/70 hover:text-blue-600';

  return (
    <div className="navbar bg-base-100 border-b border-base-200 px-4 sm:px-8 h-16">
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <TargetIcon />
          </div>
          AI Habit Tracker
        </Link>
      </div>

      <div className="flex-none gap-4">
        {user ? (
          <>
            <ul className="menu menu-horizontal px-1 gap-6 hidden md:flex items-center text-sm">
              <li>
                <Link to="/" className={`flex items-center gap-1 ${isActive('/')}`}>
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/add-habit" className={`flex items-center gap-1 ${isActive('/add-habit')}`}>
                  <Plus size={18} /> Add Habit
                </Link>
              </li>
              <li>
                <Link to="/check-in" className={`flex items-center gap-1 ${isActive('/check-in')}`}>
                  <CheckSquare size={18} /> Check-In
                </Link>
              </li>
              <li>
                <Link to="/calendar" className={`flex items-center gap-1 ${isActive('/calendar')}`}>
                  <Calendar size={18} /> Calendar
                </Link>
              </li>
              <li>
                <Link to="/insights" className={`flex items-center gap-1 ${isActive('/insights')}`}>
                  <BarChart2 size={18} /> Insights
                </Link>
              </li>
              <li>
                <Link to="/ai-tips" className={`flex items-center gap-1 px-3 py-1.5 rounded-full bg-base-200 ${isActive('/ai-tips')}`}>
                  <Sparkles size={16} /> AI Tips
                </Link>
              </li>
            </ul>

            <button onClick={toggleTheme} className="btn btn-ghost btn-circle btn-sm">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="dropdown dropdown-end ml-2">
              <button onClick={handleLogout} className="btn btn-ghost btn-sm text-error gap-2">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/signup" className="btn btn-primary">Signup</Link>
          </div>
        )}
      </div>
    </div>
  );
};

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export default Navbar;
