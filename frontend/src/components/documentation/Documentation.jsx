import React from 'react';
import '../documentation/Documentation.css'
import Navbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';

const Documentation = () => {
  return (
    <>
      <Navbar color='#0b0c14'></Navbar>

      <div className="container">
        <h1>Netmonitor Documentation</h1>
        <h5>WebMonitor is a web application designed to help you keep track of your website's uptime.
           Once you sign up and provide your website link, WebMonitor will monitor your site and notify 
           you via email if it goes down.</h5>
        <div className='buttons'>
          <Link to='/signup' className='button'>Start with your website</Link>
        </div>


      </div>
    </>
  );
}

export default Documentation;
