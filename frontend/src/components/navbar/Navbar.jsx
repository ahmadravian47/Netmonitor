import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import logo from '../../assets/logo.png'


const Navbar = () => {
  return (
    <div className='nav-wr'>
      <nav className="navbar">
        <div className="navbar-brand">
          <img src={logo}></img>
        </div>
        <div className="navbar-links">
          <Link to="">Documentation</Link>
          <Link to="">Pricing</Link>
          <Link to="">Community</Link>
          <Link to="">Enterprise</Link>
        </div>
        <div className="navbar-auth">
          <Link to="/login">Sign in</Link>
          <Link to="/signup" className="signup-button">Sign up</Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
