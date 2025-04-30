
import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();

    const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (existingUser.email === email) {
      alert('User already exists with this email!');
      return;
    }

    const newUser = { email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    alert('Signup successful! You can now login.');
    navigate('/login');
  };

  return (
    <div className='signup'>
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          className="signup-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="signup-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="signup-button" type="submit">Signup</button>
        <p className="signup-text">
          Already have an account? <Link to="/login" className="signup-link">Login</Link>
        </p>
      </form>
    </div>
    </div>
  );
}

export default Signup;
