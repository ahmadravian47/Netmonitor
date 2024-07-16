import React, { useState,useEffect } from 'react'
import './Signup.css'
import logo from '../../assets/logo.png'
import { Link,useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate=useNavigate();
    const [name,setname]=useState('');
    const [email, setemail] = useState('');
    const [password, setpassowrd] = useState('');
    
    function namechange(e) {
        setname(e.target.value);
    }
    function emailchange(e) {
        setemail(e.target.value);
    }
    function passwordchange(e) {
        setpassowrd(e.target.value);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name,email,password}),
                credentials: 'include'
            });

            if (!response.ok) {
                alert('User already exists')
            }
            else{
                alert('Kindly check your inbox to verify the email');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(()=>{//use effect to send a backend request to see if cookie is valid

    },[])
    return (
        <div className="login-screen">
            <div className="login-container">
                <div className="logo">
                    <img src={logo}></img>
                </div>
                <h1>Join Netmonitor for free</h1>
                <p>Already a member? <Link to="/login">Sign in</Link></p>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="name" placeholder="Your name" onChange={namechange} />
                    <input type="email" id="email" placeholder="Your work e-mail" onChange={emailchange} />
                    <input type="text" id="password" placeholder="Your password" onChange={passwordchange} />
                    <button type="submit">Join Netmonitor</button>
                </form>
                <p>Welcome to Netmonitor </p>
                <div className="divider">or</div>
                <Link to="/login" className="sso-button">Sign in</Link>
            </div>
        </div>
    )
}
