import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SBtn from './SBtn';
import { selectUser } from '../features/userSlice';
import { setServer } from '../features/serverSlice';
import { useSelector, useDispatch } from 'react-redux';
import url from "../url.json";
import '../components/css/ServerList.css';

export default function ServerList(props) {
    const dispatch = useDispatch();
    const [server, setServerL] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [serverName, setServerName] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [errorMessage, setErrorMessage] = useState(''); // For error handling
    const socket = props.socket;
    const user = useSelector(selectUser);

    // Function to set the current server
    function setCurrentServer(s) {
        if (s && s._id) {
            dispatch(setServer({
                serverName: s.serverName,
                serverId: s._id,
                serverProfile: s.ServerProfile
            }));
        }
    }

    // Authenticate the user on socket connection
    useEffect(() => {
        socket.emit("authenticate", user.id);
    }, [socket, user.id]);

    // Function to fetch the server list
    function GetServerList() {
        fetch(`${url.server}api/get/server`, {
            method: "POST",
            credentials: 'include',
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': url.frontend,
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: user.id })
        })
        .then(response => response.json())
        .then(res => {
            if (res.error === 'null') {
                setServerL(res.servers || []);
            }
            if (res.servers && res.servers.length > 0) {
                setCurrentServer(res.servers[res.servers.length - 1]);
            }
        })
        .catch(error => {
            console.error("Error fetching servers:", error);
        });
    }

    // Fetch server list when component mounts
    useEffect(() => {
        GetServerList();
    }, []);

    // Listen for "member-joined" event to update the server list
    useEffect(() => {
        socket.on("member-joined", (id, u) => {
            if (user.id === u) {
                GetServerList();
            }
        });
    }, [socket, user.id]);

    // Emit server-connected event for each server
    useEffect(() => {
        server.forEach((s) => {
            if (s && s._id) {
                socket.emit("server-connected", s._id);
            }
        });
    }, [server, socket]);

 // Function to create a new server
function createServer() {
    if (!serverName.trim()) {
        setErrorMessage('Server name cannot be empty');
        return;
    }

    const requestBody = {
        name: serverName,
        admin: user.id,
        isPublic: isPublic
    };

    fetch(`${url.server}api/register/server`, {
        method: "POST",
        credentials: 'include',
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': url.frontend,
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(res => {
        if (res.status === 'done') {
            GetServerList();
            console.log(`Server created: ${isPublic ? 'Public' : 'Private'}`);
            setShowModal(false);
            setServerName('');  // Reset server name
            setErrorMessage('');  // Clear any previous error
            
            // If the server is public, save it to exploreDB
            if (isPublic) {
                saveToExploreDB(res.serverId, serverName);
            }
        } else {
            setErrorMessage(res.error || 'Failed to create server');
        }
    })
    .catch(error => {
        console.error('Error during server creation:', error);
        setErrorMessage('Error creating server');
    });
}

// Function to save public server to exploreDB
function saveToExploreDB(serverId, serverName) {
    const exploreBody = {
        serverId: serverId,
        serverName: serverName,
        addedBy: user.id
    };

    fetch(`${url.server}api/explore/add`, {
        method: "POST",
        credentials: 'include',
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': url.frontend,
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exploreBody)
    })
    .then(response => response.json())
    .then(res => {
        if (res.status === 'done') {
            console.log('Server successfully added to exploreDB');
        } else {
            console.error('Failed to add server to exploreDB:', res.error);
        }
    })
    .catch(error => {
        console.error('Error saving server to exploreDB:', error);
    });
}

    return (
        <>
            <div className='server-list bg-red-400 h-[65px] w-[90px] text-center'>
                {Array.isArray(server) && server.length > 0 ? (
                    <div className='flex flex-row'>
                        <div className='serverlistbtn'>
                            {server.map(servers => (
                                <SBtn
                                    key={servers._id}
                                    uid={servers._id}
                                    profile={servers.ServerProfile}
                                    name={servers.serverName}
                                />
                            ))}
                        </div>
                        <div onClick={() => setShowModal(true)} className='servercreatediv'>
                            <div className='createserverbtn' data-name="Create new server">
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className='text-white text-[13px] italic opacity-60 px-3'>Create your first server</p>
                        <div onClick={() => setShowModal(true)} className='servercreatediv'>
                            <div className='createserverbtn' data-name="Create new server">
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Modal for Creating Server */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl mb-4">Create New Server</h2>

                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}  {/* Error message display */}

                        <label className="block mb-2">Server Name</label>
                        <input
                            type="text"
                            className="w-full mb-4 p-2 border"
                            value={serverName}
                            onChange={(e) => setServerName(e.target.value)}
                        />

                        <label className="block mb-2">Visibility</label>
                        <div className="mb-4">
                            <input
                                type="radio"
                                id="public"
                                name="serverType"
                                value="public"
                                checked={isPublic}
                                onChange={() => setIsPublic(true)}
                            />
                            <label htmlFor="public" className="ml-2">Public</label>

                            <input
                                type="radio"
                                id="private"
                                name="serverType"
                                value="private"
                                checked={!isPublic}
                                onChange={() => setIsPublic(false)}
                                className="ml-4"
                            />
                            <label htmlFor="private" className="ml-2">Private</label>
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                onClick={createServer}
                            >
                                Create
                            </button>
                            <button
                                className="bg-gray-300 px-4 py-2 rounded"
                                onClick={() => {
                                    setShowModal(false);
                                    setServerName('');  // Reset fields on modal close
                                    setErrorMessage(''); // Clear any errors
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
