import React from 'react'
import AvailableChats from './AvailableChats'
import ServerList from './ServerList'
import Chat from './Chat'
import ServerMembers from './ServerMembers'
import './css/ServerList.css'
import { selectUser } from '../features/userSlice'
import url from "../url.json"
import { useSelector } from 'react-redux'
import socketIOClient from "socket.io-client"
import Sidebar from './Sidebar'
import { useState } from 'react'
var socket = socketIOClient(url.server);

export default function AppHome(props) {
    const user = useSelector(selectUser)
    const [channelType, setChannelType] = useState('text'); // Default channel type

    const handleChannelTypeChange = (type) => {
        console.log("New channel type:", type);
        setChannelType(type); // Set the channel type
    };

    return (
        <>
            <div className="full-Body-container bg-[#3f0e40]" id="app-body">
                <Sidebar />
                <AvailableChats
                    user={user}
                    socket={socket}
                    channelType={channelType} // Pass the channel type as a prop
                    setChannelType={handleChannelTypeChange} // Pass the function to set channel type
                />
                <Chat user={user} socket={socket} channelType={channelType} />

            </div>
        </>
    )
}
