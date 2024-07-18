import React,{useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png'


const Navbar = (props) => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkHover = (category) => {
    setHoveredLink(category);
  };

  const handleLinkLeave = () => {
    setHoveredLink(null);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='nav-wr' style={{backgroundColor:props.color}}>
      <nav className="navbar">
        <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/product" className='li'>Product</Link>
          <Link to="/documentation" className='li'>Docs</Link>
          <Link to="/contact" className='li'>Contact</Link>
          <Link to="/about" className='li'>About</Link>
        </div>
        <div className="navbar-brand" >
          <img onClick={()=>{navigate('/')}} src={logo}></img>
        </div>
        <div className="navbar-links">
          <Link to="/product">Product</Link>
          <Link to="/documentation">Docs</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="navbar-auth">
          <Link to="/login">Sign in</Link>
          <Link to="/signup" className="signup-button">Sign up</Link>
        </div>
        <i className={`ab fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} hamburger-lines`} onClick={toggleMenu}></i>
      </nav>
    </div>
  );
}

export default Navbar;
