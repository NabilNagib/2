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
        const response = await login({email, password});
        if (response) {
            navigate('/')
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
