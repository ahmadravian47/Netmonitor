import React, { useEffect, useState } from 'react';
import './Hero.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showElement = () => {
      setIsVisible(true);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showElement();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(document.querySelector('.fade-up'));

    return () => observer.disconnect();
  }, []);
  return (
    <div className="hero">
      <div className="content">
        <div className={`logo fade-up ${isVisible ? 'active' : ''}`}>
          <img src={logo}></img>
          <h3>NetMonitor</h3>
        </div>
        <div className={`h1 fade-up ${isVisible ? 'active' : ''}`}>
          <h1>Prevent</h1>
          <h1>downtime.</h1>
        </div>
        <h4>
          Monitor Your Website Seamlessly, Stay Informed Instantly. </h4>
        <div className={`buttons fade-up ${isVisible ? 'active' : ''}`}>
          <Link to="/signup" className='signup-button'>Signup for free </Link>
        </div>


      </div>
    </div>
  )
}
