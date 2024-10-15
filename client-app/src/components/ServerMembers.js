// Import necessary libraries and components
import React, { useState, useEffect } from 'react'; // React and hooks for state and effects
import { selectServer } from '../features/serverSlice'; // Selector to access server data from Redux store
import { useSelector } from 'react-redux'; // Hook to access Redux state
import url from "../url.json"; // Import server URL configuration
import '../components/css/ServerList.css'; // CSS for styling
import MemberDetailsModal from './MemberDetailModal'; // Import modal component for member details

// Define the ServerMembers component
export default function ServerMembers(props) {
    // Access the current server from Redux store
    let currentServer = useSelector(selectServer);
    // State for members and modal visibility
    let [members, setMembers] = useState([]); // Array to hold members
    let [showModal, setShowModal] = useState(false); // Boolean for modal visibility
    let socket = props.socket; // Access socket from props

// Function to fetch members from the server
function getmembers() {
    // Ensure currentServer, currentServer.server, and currentServer.server.serverId are defined
    if (currentServer && currentServer.server && currentServer.server.serverId) {
        fetch(`${url.server}api/get/member`, {
            method: "POST", // Use POST method for fetching
            credentials: 'include', // Include credentials for CORS
            withCredentials: true, // Also include credentials for CORS
            headers: {
                'Access-Control-Allow-Origin': url.frontend, // Allow cross-origin requests
                'Access-Control-Allow-Credentials': 'true', // Allow credentials
                'Content-Type': 'application/json' // Set content type
            },
            // Send current server ID in request body
            body: JSON.stringify({ id: currentServer.server.serverId })
        }).then(response => response.json()) // Convert response to JSON
          .then(res => {
              if (res.error === null) {
                  setMembers(res.users); // Set the members state
              }
          }).catch(err => {
              console.error('Error fetching members:', err); // Log any fetch errors
          });
    } else {
        console.warn('Current server is not defined or serverId is missing.'); // Warn if the server is not defined
    }
}

    // Handle socket event for when a member joins
    useEffect(() => {
        const handleMemberJoined = (id, u) => {
            fetch(`${url.server}api/get/member`, {
                method: "POST",
                credentials: 'include',
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': url.frontend,
                    'Access-Control-Allow-Credentials': 'true',
                    'Content-Type': 'application/json'
                },
                // Fetch updated member list using server ID
                body: JSON.stringify({ id: id })
            }).then(response => response.json())
              .then(res => {
                  if (res.error === null) {
                      setMembers(res.users); // Update members state
                  }
              });
        };

        // Listen for "member-joined" event
        socket.on("member-joined", handleMemberJoined);
        
        // Cleanup function to remove the listener on unmount
        return () => {
            socket.off("member-joined", handleMemberJoined);
        };
    }, [socket]); // Dependency array includes socket

    // Fetch members when the current server changes
    useEffect(() => {
        getmembers(); // Call getmembers to fetch the member list
    }, [currentServer.server]); // Dependency array includes currentServer.server

    // Open the modal
    const openModal = () => {
        setShowModal(true); // Set modal visibility to true
    };

    // Close the modal
    const closeModal = () => {
        setShowModal(false); // Set modal visibility to false
    };

    // Render the component
    return (
        <div className='server-members w-[100%] pb-[20px]'>
            {/* Button to open the modal */}
            <button 
                className='open-members-modal-button text-[14px] text-gray px-4 py-1 text-white rounded-[8px]' 
                onClick={openModal} // Set onClick to open modal
            >
                View Members ({members.length}) {/* Display number of members */}
            </button>

            {/* Render the modal when showModal is true */}
            {showModal && (
                <MemberDetailsModal 
                    members={members} // Pass the list of members
                    onClose={closeModal} // Pass the close handler
                    totalmembers={members.length} // Total number of members
                />
            )}
        </div>
    );
}
