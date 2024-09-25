// AdminBoard.js

import React from 'react';
import { useSelector } from 'react-redux';
import { selectAdminUsername, selectAdminEmail, selectUser } from '../../features/userSlice'; // Import selectors
import Sidebar from '../Sidebar';
import socketIOClient from 'socket.io-client';
import url from '../../url.json';
import AvailableChats from '../AvailableChats';
import Chat from '../Chat';


const AdminBoard = () => {
    const adUsername = useSelector(selectAdminUsername);
    const adEmail = useSelector(selectAdminEmail);
    const user = useSelector(selectUser);

    const socket = socketIOClient(url.server);

    return (
        <div className="full-Body-container bg-[#3f0e40]" id="app-body">
            <Sidebar />
            <AvailableChats user={user} socket={socket} />
            <Chat user={user} socket={socket} />
        </div>
    );
};

export default AdminBoard;
