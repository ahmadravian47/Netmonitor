import React from 'react';
import './Section2.css';
import i_con from './icon.png'
import i_mage from './section2.jpg'
import { Link } from 'react-router-dom';

export default function Section2() {
  return (
    <div className='body'>
        <div className='image'>
            <img src={i_con}></img>
        </div>
      <h2>Status Page</h2>
      <p>Communicates maintenance and incidence updates automatically on dedicated Pages</p>
      <div className='button'>
        <Link className='learn-button'>Learn more &gt;</Link>
      </div>
      <div className='imagee'>
        <img src={i_mage}></img>
      </div>
    </div>
  );
}

