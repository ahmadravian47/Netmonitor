import React,{useState,useEffect} from 'react'
import s_img from './section1.jpg'
import './Section1.css'
import icon1 from './icon.png'
import icon2 from './icon2.png'
import { Link } from 'react-router-dom';

export default function Section1() {
    return (
        <div className='section'>
            <div className='left'>
                <div className='content'>
                    <h1 >Resolve downtime faster than ever.</h1>
                    <p className='subtitle'>Monitor everything from websites to servers. Schedule on-call rotations, get actionable alerts, and resolve incidents faster than ever.</p>
                    <Link to="/signup" class="explore-link">Explore uptime &gt;</Link>
                    <div className='card-container'>
                        <div className="card">
                            <div className="icon uptime">
                                <img src={icon1}></img>
                            </div>
                            <h2>Uptime monitoring</h2>
                            <p>Check uptime, SSL, ports, DNS, and more. Prevent false positives and get actionable alerts with error screenshots.</p>
                            <Link to='/signup' class="learn-more">Explore &gt;</Link>
                        </div>
                        <div className="card">
                            <div className="icon incident">
                                <img src={icon2}></img>
                            </div>
                            <h2>Incident management</h2>
                            <p>Schedule on-call duties, set up escalation policies, and get alerted via call, Slack and more.</p>
                            <Link  to='/signup' className="learn-more">Explore &gt;</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='right'>
                <img src={s_img}></img>
            </div>
        </div>
    )
}
