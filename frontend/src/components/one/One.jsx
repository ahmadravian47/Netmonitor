import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './One.css';
import logo from './one.png';

export default function One() {
    const [url, seturl] = useState('');
    const navigate = useNavigate();

    function urlchange(e) {
        seturl(e.target.value);
    }

    async function handlesubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch('https://netmonitor-phi.vercel.app/addurl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
                credentials: 'include',
            });

            if (response.status === 200) {
                navigate('/user');
            } else {
                alert('Something broke');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }

    return (
        <div className='pa'>
            <div className="logo">
                <img src={logo} alt="Logo" />
                <h3>Netmonitor</h3>
            </div>
            <div className='main'>
                <div className='content'>
                    <h2>What would you <span>like us</span></h2>
                    <h2>to keep an eye on?</h2>
                    <form className='form' onSubmit={handlesubmit}>
                        <label>URL to monitor *</label>
                        <input type="text" id="url" placeholder="https://yoururl.com" required onChange={urlchange} />
                        <button type="submit">Continue</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
