import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setemail] = useState('');
    const [password, setpassowrd] = useState('');

    function emailchange(e) {
        setemail(e.target.value);
    }
    function passwordchange(e) {
        setpassowrd(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email,password}),
                credentials: 'include'
            });
            if(response.status===200){
                //redirect to user page
            }
            if (!response.ok) {
                alert('Invalid email/password')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div className="login-screen">
            <div className="login-container">
                <div className="logo">
                    <img src={logo}></img>
                </div>
                <h1>Welcome back</h1>
                <p>First time here? <Link to="/signup">Sign up for free.</Link></p>
                <form onSubmit={handleSubmit} >
                    <input type="email" id="email" placeholder="Your work e-mail" onChange={emailchange} />
                    <input type="text" id="password" placeholder="Your password" onChange={passwordchange} />
                    <button type="submit">Login to account</button>
                </form>
                <p>Sign in using password</p>
                <div className="divider">or</div>
                <Link to="/signup" className="sso-button">Join Netmonitor</Link>
            </div>
        </div>
    )
}
