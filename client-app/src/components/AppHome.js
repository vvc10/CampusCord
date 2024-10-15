import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AvailableChats from './AvailableChats';
import Sidebar from '../components/Sidebar';
import Chat from './Chat';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import socketIOClient from "socket.io-client";
import url from "../url.json";
import './css/ServerList.css';
import Explore from './Explore';
import YourProfile from './YourProfile';
import LoginPage from './LoginPage';
import Landing from '../components/Landing';

export default function AppHome(props) {
    const user = useSelector(selectUser);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = socketIOClient(url.server);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect(); // Cleanup on unmount
        };
    }, []);

    if (!socket) return <div>Loading...</div>; // Render a loading state until the socket is initialized

    return (
        <div className="full-Body-container" id="app-body">
            <Sidebar />
            <div className="content-container">
                <Routes>
                    {/* Redirect from "/" to "/home" when the user is authenticated */}
                    <Route path="/" element={user ? <Navigate to="/home" /> : <Landing />} />
                    <Route path="/home" element={<AvailableChats user={user} socket={socket} />} />
                    <Route path="/chat" element={<Chat user={user} socket={socket} />} />
                    <Route path="/explore" element={<Explore user={user} socket={socket} />} />
                    <Route path="/yourprofile" element={<YourProfile user={user} socket={socket} />} />
                </Routes>
            </div>
        </div>
    );
}
