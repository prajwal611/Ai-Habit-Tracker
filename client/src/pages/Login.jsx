import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl font-bold mb-4">Login</h2>
                    <form onSubmit={onSubmit}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                required
                            />
                        </div>
                        <div className="form-control w-full max-w-xs mt-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                required
                            />
                        </div>
                        <div className="card-actions justify-center mt-6">
                            <button className="btn btn-primary w-full">Login</button>
                        </div>
                    </form>
                    <p className="text-center mt-4 text-sm">
                        Don't have an account? <Link to="/signup" className="link link-primary">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
