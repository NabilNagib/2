import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://one-cb6z.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            
            if (response.ok) {
                login({ email }); 
                navigate('/'); 
            } else {
                alert(data.message || 'Failed to login');
            }
        } catch (error) {
            alert('Failed to login: ' + error.message);
        }
    };

    return (
        <div className="login-container"> 
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form"> 
                <div className="form-group"> 
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control" 
                    />
                </div>
                <div className="form-group"> 
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn-login">Login</button> 
            </form>
        </div>
    );
};

export default Login;
