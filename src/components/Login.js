import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PetDashboard.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/users/login`, {
        username,
        password
      });
      console.log(response.data);
      const { token } = response.data;
      localStorage.setItem('token', token); // Save token to localStorage
      localStorage.setItem('userId', response.data.id); // Save userId to localStorage
      navigate('/dashboard'); // Redirect to Pet Dashboard
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
          <input
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
      </form>
        
    </div>
    <div className="tamagotchi-console">
      <h1 className="console-header">Login</h1>
      <div className="console-screen"></div>
      <div className="console-buttons">
        <button>🍖 <span>Feed</span></button>
        <button>🎾 <span>Play</span></button>
        <button>🧼 <span>Clean</span></button>
      </div>
    </div>
    <p>Don't have an account? <Link to="/register">Register</Link></p>
    </>
  );
}

export default Login;
