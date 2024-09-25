import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AvailableChats from './AvailableChats';
import Sidebar from '../components/Sidebar';
import Chat from './Chat';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import socketIOClient from "socket.io-client";
import url from "../url.json";
import './css/ServerList.css';
import Explore from './Explore';

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
        <Router>
            <div className="full-Body-container" id="app-body">
                <Sidebar />
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<AvailableChats user={user} socket={socket} />} />
                        <Route path="/available-chats" element={<AvailableChats user={user} socket={socket} />} />
                        <Route path="/chat" element={<Chat user={user} socket={socket} />} />
                        <Route path="/explore" element={<Explore user={user} socket={socket} />} />

                    </Routes>
                </div>
            </div>
        </Router>
    );
}
