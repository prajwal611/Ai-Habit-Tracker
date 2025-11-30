import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, BarChart2, ArrowRight } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-base-200 flex flex-col">
            {/* Hero Section */}
            <div className="hero min-h-[80vh] bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse gap-12">
                    <img
                        src="https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=1000"
                        className="max-w-sm lg:max-w-xl rounded-lg shadow-2xl mask mask-squircle"
                        alt="Habit Tracker Hero"
                    />
                    <div className="text-center lg:text-left">
                        <div className="badge badge-primary badge-outline mb-4">AI-Powered Productivity</div>
                        <h1 className="text-5xl font-bold leading-tight">
                            Build Better Habits, <br />
                            <span className="text-primary">Master Your Life.</span>
                        </h1>
                        <p className="py-6 text-lg opacity-80 max-w-md mx-auto lg:mx-0">
                            Track your daily routines, get personalized AI insights, and visualize your progress like never before.
                        </p>
                        <div className="flex gap-4 justify-center lg:justify-start">
                            <Link to="/signup" className="btn btn-primary btn-lg gap-2">
                                Get Started <ArrowRight size={20} />
                            </Link>
                            <Link to="/login" className="btn btn-ghost btn-lg">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-base-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Choose AI Habit Tracker?</h2>
                        <p className="opacity-70 max-w-2xl mx-auto">
                            We combine simple tracking with powerful AI analytics to help you understand your behavior and improve consistently.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
                            <div className="card-body items-center text-center">
                                <div className="p-4 bg-primary/10 rounded-full mb-4 text-primary">
                                    <CheckCircle size={32} />
                                </div>
                                <h3 className="card-title">Smart Tracking</h3>
                                <p>Effortlessly log your daily habits with a clean, intuitive interface designed for speed.</p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
                            <div className="card-body items-center text-center">
                                <div className="p-4 bg-secondary/10 rounded-full mb-4 text-secondary">
                                    <Zap size={32} />
                                </div>
                                <h3 className="card-title">AI Insights</h3>
                                <p>Get personalized recommendations and motivation from our advanced AI engine.</p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
                            <div className="card-body items-center text-center">
                                <div className="p-4 bg-accent/10 rounded-full mb-4 text-accent">
                                    <BarChart2 size={32} />
                                </div>
                                <h3 className="card-title">Visual Analytics</h3>
                                <p>See your progress with beautiful charts, heatmaps, and streaks to stay motivated.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
                <nav className="grid grid-flow-col gap-4">
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Privacy</a>
                </nav>
                <aside>
                    <p>Copyright © 2024 - All right reserved by AI Habit Tracker</p>
                </aside>
            </footer>
        </div>
    );
};

export default LandingPage;
