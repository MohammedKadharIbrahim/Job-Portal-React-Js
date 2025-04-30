
import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    // Admin credentials
    const adminEmail = 'admin@example.com';
    const adminPassword = '111111';

    // Check for admin login
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      alert('Admin login successful');
      navigate('/joblist');
      return;
    }

    // Check for normal user credentials
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const isValidUser = storedUser.email === email && storedUser.password === password;

    if (isValidUser) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      alert('Login successful');
      navigate('/joblist');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className='login'>
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">Login</button>
        <p className="login-text">
          Don't have an account? <Link to="/signup" className="login-link">Signup</Link>
        </p>
      </form>
    </div>
    </div>
  );
}

export default Login;
