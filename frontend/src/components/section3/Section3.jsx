import React from 'react'
import black_logo from './black.png'
import back_img from './section3.jpg'
import './Section3.css'
import { Link } from 'react-router-dom';

export default function Section3() {
    return (
        <div className='mybody'>
        <div className='background'>
            <div className='logo'>
                <img src={black_logo}></img>
                <h3>NetMonitor</h3>
            </div>
            <h1>Downtime ends today</h1>
            <p>  Monitor Your Website Seamlessly, Stay Informed Instantly. </p>
            <div className='buttons'>
                <Link to="" className='signup-button'>Signup for free </Link>
            </div>
        </div>
        </div>
    )
}
