import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import One from './components/one/One'
import './App.css';
import User from './components/user/User';
import Product from './components/product/Product'
import Documentation from './components/documentation/Documentation'
import Contact from './components/contact/Contact'
import About from './components/about/About'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/one" element={<One />} />
                <Route path="/user" element={<User />} />
                <Route path="/product" element={<Product />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    );
}

export default App;
