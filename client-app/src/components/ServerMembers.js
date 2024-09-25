import React, { useState, useEffect } from 'react';
import { selectServer } from '../features/serverSlice';
import { useSelector } from 'react-redux';
import url from "../url.json";
import '../components/css/ServerList.css';
import MemberDetailsModal from './MemberDetailModal';

export default function ServerMembers(props) {
    let currentServer = useSelector(selectServer);
    let [members, setMembers] = useState([]);
    let [showModal, setShowModal] = useState(false); // Modal visibility state
    let socket = props.socket;

    // Fetch members function
    function getmembers() {
        if (currentServer.server.name !== 'loading') {
            fetch(`${url.server}api/get/member`, {
                method: "POST",
                credentials: 'include',
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': url.frontend,
                    'Access-Control-Allow-Credentials': 'true',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: currentServer.server.serverId })
            }).then(response => response.json()).then(res => {
                if (res.error === null) {
                    setMembers(res.users);
                }
            });
        }
    }

    // Handle socket event for when a member joins
    useEffect(() => {
        socket.on("member-joined", (id, u) => {
            fetch(`${url.server}api/get/member`, {
                method: "POST",
                credentials: 'include',
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': url.frontend,
                    'Access-Control-Allow-Credentials': 'true',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            }).then(response => response.json()).then(res => {
                if (res.error === null) {
                    setMembers(res.users);
                }
            });
        });
    }, [socket]);

    // Fetch members on server change
    useEffect(() => {
        getmembers();
    }, [currentServer.server]);

    // Open the modal
    const openModal = () => {
        setShowModal(true);
    };

    // Close the modal
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className='server-members w-[100%] pb-[20px]'>
            {/* Button to open the modal */}
            <button 
                className='open-members-modal-button text-[14px] text-gray px-4 py-1 text-white rounded-[8px]' 
                onClick={openModal}
            >
                View Members ({members.length})
            </button>

            {/* Render the modal when showModal is true */}
            {showModal && (
                <MemberDetailsModal 
                    members={members} // Pass the list of members
                    onClose={closeModal} // Pass the close handler
                    totalmembers={members.length} 
                />
            )}
        </div>
    );
}
