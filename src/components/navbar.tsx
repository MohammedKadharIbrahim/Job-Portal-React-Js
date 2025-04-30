import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';


const Navbar: React.FC = () => {
    const navigate = useNavigate();
     const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };
  return (
    <nav className="navbar mb-2">
      <div className="navbar-logo">
        <span>JobPortal</span>
      </div>
      <ul className="navbar-links">
        {/* <li><a href="#">Home</a></li> */}
        <li><Link to='/joblist'>Home</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/myjob'>My Jobs</Link></li>
        <li><Link to='/message'>Message</Link></li>
        <li><Link to=''>Setting</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
