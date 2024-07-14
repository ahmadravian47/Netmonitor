import React from 'react'
import black_logo from './black.png'
import back_img from './section3.jpg'
import './Section3.css'
import { Link } from 'react-router-dom';

export default function Section3() {
    return (
        <div className='background'>
            <div className='logo'>
                <img src={black_logo}></img>
                <h3>NetMonitor</h3>
            </div>
            <h1>Downtime ends today</h1>
            <p>BNetMonitor lets you see inside any stack, debug any issue, and resolve any incident. </p>
            <div className='buttons'>
                <Link to="" className='signup-button'>Signup for free </Link>
            </div>
        </div>
    )
}
