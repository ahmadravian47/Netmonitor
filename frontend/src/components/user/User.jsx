import React, { useEffect, useState } from 'react'
import './User.css'
import logo from '../one/one.png'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';


export default function User() {
    const [user_monitors, setmonitors] = useState([])

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/deletemonitor/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setmonitors((prevMonitors) => prevMonitors.filter(monitor => monitor._id !== id));
            } else {
                console.error('Failed to delete monitor');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    async function getallmonitors() {
        axios.get('http://localhost:3000/allmonitors', {
            withCredentials: true
        })
            .then(response => {
                setmonitors(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => {
        getallmonitors()
    },[])
    return (
        <div className='pa'>
            <div className="logo">
                <img src={logo}></img>
                <h3>Netmonitor</h3>
            </div>
            <div className='parent'>
                <div className='content'>
                    <div className='upper'>
                        <h2>How has your day been so far, Ahmad?</h2>
                        <div className='button'>
                            <Link to='/one' className='button'>Create Monitor</Link>
                        </div>
                    </div>
                    <div className='monitors'>
                        {user_monitors.map((monitor, index) => {
                            const isUp = monitor.status === 'true';
                            return (
                                <div key={index} className='monitor'>
                                    <div className='left'>
                                        <div className={`circle ${isUp ? 'cgreen' : 'cred'}`}></div>
                                        <div className='h5'>
                                            <h5 className='white'>{monitor.url}</h5>
                                            <h5 className={isUp ? 'green' : 'red'}>
                                                {isUp ? 'Up' : 'Down'}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <i className="fa-regular fa-trash-can" onClick={()=>handleDelete(monitor._id)}></i>
                                    </div>
                                </div>
                            );
                        })}


                        {/* <div className='monitor'>
                            <div className='left'>
                                <div className='circle'></div>
                                <div className='h5'>
                                    <h5 className='white'>ahmadtauseef.com</h5>
                                    <h5 className='green'>Up</h5>
                                </div>
                            </div>
                            <div className='right'>
                                <i class="fa-regular fa-trash-can"></i>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
