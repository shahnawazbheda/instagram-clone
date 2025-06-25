'use client';
import React, { useState, useEffect } from 'react';
import Profile from '../components/Profile';
import Sidebar from '../components/Sidebar';


const page: React.FC = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);
    return (
        <>
            <Sidebar token={token} isNotification1={false} />
            <Profile />
            
        </>
    )
}

export default page;