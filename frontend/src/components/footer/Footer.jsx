import React from 'react'
import './Footer.css'
import black_logo from './black.png'

export default function Footer() {
    return (
        <div className='footer'>
            <div className='left'>
                <div className='logo'>
                    <img src={black_logo}></img>
                    <h3>NetMonitor</h3>
                </div>
                <p>Better Stack lets you see inside any stack, debug any issue, and resolve any incident. </p>
            </div>
            <div className='mid'>
                <button>ahmad.ravian47@gmail.com</button>
                <button >Linkedin</button>

            </div>
            <div className='right'>
                <p className="footer-copyright">
                    &copy; Copyright 2024 All rights reserved.
                </p>
            </div>

        </div>
    )
}
