// AdminLoginPage.js

import React, { useState } from 'react';
import axios from 'axios';
import url from "../url.json";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, setAdminLoggedIn, setAdminUser } from '../features/userSlice'; // Import actions

const AdminLoginPage = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(`${url.server}auth/admin-login`, {
                email,
                password,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                alert('Admin logged in successfully');
                console.log('Admin logged in successfully', response.data);

                // Dispatch actions to update Redux state
                dispatch(login({ email, username }));
                dispatch(setAdminLoggedIn(true));
                dispatch(setAdminUser({ username, email }));

                // Save admin details to local storage
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adUsername', username);
                localStorage.setItem('adEmail', email);

                navigate('/adminboard'); // Navigate to adminboard
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="admin-login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLoginPage;
