import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import One from './components/one/One'
import './App.css';
import User from './components/user/User';

function App() {
    // const [result, setResult] = useState('');
    // const checkStatus = async (url) => {
    //     try {
    //         const response = await fetch('http://localhost:3000/check', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ url })
    //         });
    //         const data = await response.json();
    //         setResult(data.message);
    //     } catch (error) {
    //         setResult('Error checking the website');
    //     }
    // };

    return (
        <div className="App">
            {/* <h1>Website Status Checker</h1>
            <Form checkStatus={checkStatus} />
            <Result result={result} /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/one" element={<One />} />
                <Route path="/user" element={<User />} />
            </Routes>
        </div>
    );
}

export default App;
