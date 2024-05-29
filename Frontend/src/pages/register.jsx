import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('/register', { username, password });
            if (response.status === 201) {
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/login');
            } else {
                setError(response.data.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error registering:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="bg-gradient-to-r from-indigo-800 to-purple-900 min-h-screen flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-white text-2xl font-bold mb-6 text-center">Register</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-white mb-2" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                        Register
                    </button>
                </form>
                <div className="text-center mt-4">
                    <Link to="/login" className="text-blue-400 hover:text-blue-500">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
