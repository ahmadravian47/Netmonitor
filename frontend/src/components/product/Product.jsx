import React from 'react'
import './Product.css'
import h_pic from './section1.jpg'
import Navbar from '../navbar/Navbar';

export default function Product() {
  return (
    <>
   <Navbar color='#05050d'></Navbar>
    <div className='product'>
      <h1>Netmonitor-what?</h1>
      <h4>Get to know a bit what Netmonitor is and what drives us</h4>
      <div className='parent'>
        <div className='left'>
            <h3 className='bold'>The Problem</h3>
            <h3>WebMonitor is a user-friendly app for website owners with limited networking
               knowledge. Users can sign up, enter their website link, and receive email 
               alerts if their site goes offline or if their domain/hosting expires. 
               This ensures timely notifications and helps maintain website uptime effortlessly.
            </h3>
        </div>
        <div className='right'>
            <img src={h_pic}></img>
        </div>
      </div>
    </div>
    </>
  )
}
