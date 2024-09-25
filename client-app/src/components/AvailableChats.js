import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faUserPlus, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import CategoryButton from './CategoryButton';
import { selectServer } from '../features/serverSlice';
import { selectUser } from '../features/userSlice';
import { selectActiveChat, setActiceChat } from '../features/activeChatSlice';
import { setChannel } from '../features/channelSlice';
import url from "../url.json";
import Peer from 'peerjs';
import ServerList from './ServerList';
import ServerMembers from './ServerMembers';
import { AiOutlineUserAdd } from "react-icons/ai";
import { GrConnect } from "react-icons/gr";
import '../components/css/ServerList.css'
import Chat from './Chat.js'
import { IoIosAttach, IoIosReturnLeft } from "react-icons/io";

let peer;

export default function AvailableChats(props) {
    const [AvailableChannels, setAvailableChannels] = useState([]);
    const [show, setShow] = useState(false);
    const [serverShow, setServerShow] = useState(false);
    const [myId, setMyId] = useState(false);
    const [channelType, setChannelType] = useState('');
    const [changeState, setChangeState] = useState(false);
    const [channelModalOpen, setChannelModalOpen] = useState(false);
    const [newChannelName, setNewChannelName] = useState('');
    const currentServer = useSelector(selectServer);
    const socket = props.socket;
    let [server, setServerL] = React.useState([]);
    const currentUser = useSelector(selectUser);
    const currentActiveChannel = useSelector(selectActiveChat);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {

        setIsSidebarVisible(true);
        console.log("clicked side btn!: ", setIsSidebarVisible);

    }

    const togglehideSidebar = () => {
        setIsSidebarVisible(false);
    }

    function addVoice(video, stream) {
        video.srcObject = stream;
        video.classList.add('veide');
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
        document.querySelector(".chat-display").appendChild(video);
    }

    function CreateChannel() {
        if (currentServer.server !== undefined) {
            fetch(`${url.server}api/register/channel`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newChannelName, parent: currentServer.server.serverId, type: channelType })
            })
                .then(response => response.json())
                .then(res => {
                    if (res.status === 'done') {
                        dispatch(setChannel({ channelName: newChannelName, channelType: channelType })); // Update Redux state with new channel
                        getChannels();
                        socket.emit("channel-created", currentServer.server.serverId);
                        setChannelModalOpen(false); // Hide the modal after successful creation
                    } else {
                        // Handle the error if needed
                        console.error("Channel creation failed:", res.error);
                    }
                })
                .catch(err => {
                    // Handle network or other errors
                    console.error("Network error:", err);
                });
        } else {
            // Handle case where server is not defined
            console.warn("No server selected.");
        }
    }


    function getChannels() {
        if (currentServer.server.name !== 'loading') {
            fetch(`${url.server}api/get/channel`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: currentServer.server.serverId })
            }).then(response => response.json()).then(res => {
                if (res.error === null) {
                    setAvailableChannels(res.channels);
                    if (res.channels.length !== 0) {
                        res.channels.some((channel) => { // Using channel instead of value
                            if (channel.channelType === 'text') {
                                dispatch(setChannel({
                                    channelName: channel.channelName,
                                    channelId: channel._id,
                                    channelType: channel.channelType // Ensure channelType is included
                                }));
                            }
                            return channel.channelType === 'text';
                        });
                    }
                }
            });
        }
    }

    useEffect(() => {
        socket.on('new-channel', (serverId) => {
            fetch(`${url.server}api/get/channel`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: serverId })
            }).then(response => response.json()).then(res => {
                if (res.error === null) {
                    setAvailableChannels(res.channels);
                    if (res.channels.length !== 0) {
                        res.channels.some((channel) => { // Using channel instead of value
                            if (channel.channelType === 'text') {
                                dispatch(setChannel({
                                    channelName: channel.channelName,
                                    channelId: channel._id,
                                    channelType: channel.channelType // Ensure channelType is included
                                }));
                            }
                            return channel.channelType === 'text';
                        });
                    }
                }
            });
        });

        Notification.requestPermission();
        socket.on('new-msg', (a) => {
            if (a[5] !== currentUser.id) {
                if (!("Notification" in window)) {
                    console.log("This browser does not support desktop notification");
                } else {
                    new Notification("new message", { body: a[1] + ' : "' + a[0] + '"', icon: url.server + a[2], tag: a[4] });
                }
            }
        });
    }, []);

    // eslint-disable-next-line
    useEffect(() => {
        getChannels();
    }, [currentServer.server]);


    const getRandomString = (length) => {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            result += charset[randomIndex];
        }
        return result;
    };

    const [modalInviteOpen, setInviteModalOpen] = useState(false);
    const [inviteLink, setInviteLink] = useState('');

    const generateInviteLink = () => {
        const randomString = getRandomString(8); // Generate a random 8-character string
        const link = `${url.server}join/${currentServer.server.serverId}/`;
        setInviteLink(link);
        setInviteModalOpen(true);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteLink)
            .then(() => {
                alert('Invite link copied to clipboard!');
            })
            .catch(err => {
                console.error('Could not copy invite link: ', err);
            });
    };
    function handleSubmit(e) {
        e.preventDefault();
        if (e.target.file.files[0]) {
            if (show) {
                var data = new FormData();
                data.append("image", e.target.file.files[0]);
                fetch(`${url.server}update/userdata`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Access-Control-Allow-Origin': url.frontend,
                        'Access-Control-Allow-Credentials': 'true',
                    },
                    body: data
                }).then(response => response.json()).then(res => {
                    if (res.status === "Uploaded") {
                        setShow(false);
                    }
                });
            } else if (serverShow) {
                var data = new FormData();
                data.append("image", e.target.file.files[0]);
                data.append("serverId", currentServer.server.serverId);
                fetch(`${url.server}update/server`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Access-Control-Allow-Origin': url.frontend,
                        'Access-Control-Allow-Credentials': 'true',
                    },
                    body: data
                }).then(response => response.json()).then(res => {
                    if (res.status === "Uploaded") {
                        setServerShow(false);
                    }
                });
            }
        }
    }

    function changepreview(e) {
        if (e.target.files[0]) {
            document.querySelector(".preview").src = URL.createObjectURL(e.target.files[0]);
        }
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.dataTransfer.effectAllowed = 'move';
        let files = e.dataTransfer.files;
        if (files[0].type === "image/jpeg" || files[0].type === "image/png" || files[0].type === "image/gif") {
            document.querySelector("#file").files = files;
            document.querySelector(".preview").src = URL.createObjectURL(files[0]);
        }
    };

    useEffect(() => {
        peer = new Peer(undefined, {
            config: {
                'iceServers': [
                    { url: 'stun:stun01.sipphone.com' },
                    { url: 'stun:stun.ekiga.net' },
                    { url: 'stun:stun.fwdnet.net' },
                    { url: 'stun:stun.ideasip.com' },
                    { url: 'stun:stun.iptel.org' },
                    { url: 'stun:stun.rixtelecom.se' },
                    { url: 'stun:stun.schlund.de' },
                    { url: 'stun:stun.l.google.com:19302' },
                    { url: 'stun:stun1.l.google.com:19302' },
                    { url: 'stun:stun2.l.google.com:19302' },
                    { url: 'stun:stun3.l.google.com:19302' },
                    { url: 'stun:stun4.l.google.com:19302' },
                    { url: 'stun:stunserver.org' },
                    { url: 'stun:stun.softjoys.com' },
                    { url: 'stun:stun.voiparound.com' },
                    { url: 'stun:stun.voipbuster.com' },
                    { url: 'stun:stun.voipstunt.com' },
                    { url: 'stun:stun.voxgratia.org' },
                    { url: 'stun:stun.xten.com' },
                    {
                        url: 'turn:numb.viagenie.ca',
                        credential: 'muazkh',
                        username: 'webrtc@live.com'
                    },
                    {
                        url: 'turn:192.158.29.39:3478?transport=udp',
                        credential: 'JZEOEt2V3Qb0y27'
                    },

                    {
                        url: 'turn:192.158.29.39:3478?transport=udp',
                        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                        username: '28224511:1379330808'
                    },
                    {
                        url: 'turn:192.158.29.39:3478?transport=tcp',
                        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                        username: '28224511:1379330808'
                    }
                ]
            }
        });

        socket.on("voice-chat-new-user", (channelid, userId) => {
            console.log(userId);
            navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true
            }).then(stream => {
                var call = peer.call(userId, stream);
                call.on('stream', function (remoteStream) {
                    const Myvideo = document.createElement('video');
                    Myvideo.classList.add('gg');
                    addVoice(Myvideo, remoteStream);
                });
            }).catch(err => {
                console.log(err);
            });
        });

        peer.on('call', call => {
            console.log('gg');
            navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true
            }).then(stream => {
                call.answer(stream);
                const video = document.createElement('video');
                call.on('stream', (remoteStream) => {
                    addVoice(video, remoteStream);
                });
            });
        });

        peer.on('open', id => {
            setMyId(id);
        });

    }, [changeState]);

    function disconnect() {
        peer.destroy();
        fetch(`${url.server}update/active-peers`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: currentUser.id, channelId: currentActiveChannel.active.id })
        }).then(response => response.json()).then(res => {
            if (res.error === null) {
                dispatch(setActiceChat(null));
                setChangeState(!changeState);
                socket.emit('voice-chat-disconnect', currentActiveChannel.active.id, currentUser.id, currentServer.server.serverId);
            }
        });
    }

    return (
        <div className='flex flex-row'>
            <div className={`ac ${isSidebarVisible ? 'show-availchats' : 'hide-availchats'}`}>
                <div className='relative px-4 py-3'>
                    <div className='mob_hide_backic' onClick={togglehideSidebar}> {/* Add onClick to toggle sidebar */}
                        <IoIosReturnLeft />
                    </div>
                </div>

                <div className='serverlist_div'>
                    <ServerList user={currentUser} socket={socket} />
                </div>

                <div className='server-name noselect'>
                    <h4>{currentServer.server.serverName}</h4>
                    <div className='server_invite' onClick={generateInviteLink}>
                        <AiOutlineUserAdd className='icon' />
                    </div>
                    <GrConnect
                        className="text-white mx-2 rounded-full hover:text-white hover:text-gray-300 transition duration-300 ease-in-out cursor-pointer"
                        onClick={() => setChannelModalOpen(true)}
                    />

                </div>

                {/* <>{AvailableChannels.length}</> */}
                {
                    AvailableChannels.length > 0 ? (
                        <>


                        </>
                    ) :
                        (
                            <>
                                <div className='py-[20px] px-[10px] h-fit m-auto'>
                                    <p className='text-[13px] font-[300] text-white italic opacity-70'> Channels will be visible here.</p>
                                    <button className='flex flex-row gap-[10px] bg-white items-center px-2 py-1 text-center text-black mx-auto my-3 rounded-[10px]' onClick={() => setChannelModalOpen(true)}>
                                        <p className='text-[16px]'>Create</p>
                                        <GrConnect
                                            className="text-[14px] text-black transition duration-300 ease-in-out cursor-pointer"

                                        />
                                    </button>
                                </div>
                            </>
                        )
                }




                <div className="server-channel-display">
                    {AvailableChannels.map(channel => (
                        <CategoryButton
                            key={channel._id}
                            PeerId={myId}
                            state={changeState}
                            changeState={setChangeState}
                            type={channel.channelType}
                            socket={socket}
                            name={channel.channelName}
                            uid={channel._id}
                        />
                    ))}
                </div>
                <div className='server_members'>
                    <ServerMembers user={currentUser} socket={socket} />
                </div>
                {channelModalOpen && (
                    <div className='channel-modal-vh'>
                        <div className='modalch-content' style={{ backgroundColor: '#16191e', display: 'flex', flexDirection: 'column', gap: '20px', margin: 'auto', opacity: '1', padding: '20px', borderRadius: '10px' }}>
                            <div className='close' onClick={() => setChannelModalOpen(false)}>&times;</div>
                            <div className='channel-name' style={{ textAlign: 'left', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label>Channel Name</label>
                                <input
                                    type='text'
                                    placeholder='Channel Name'
                                    value={newChannelName}
                                    onChange={e => setNewChannelName(e.target.value)}
                                />
                            </div>
                            <div className='channel-typerd' style={{ textAlign: 'left', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <span>Channel Type</span>
                                <div className='channel-typerd-rads'>
                                    <label>
                                        <input
                                            type='radio'
                                            name='channelType'
                                            checked={channelType === 'text'}
                                            onChange={() => setChannelType('text')}
                                        />
                                        Text Channel
                                    </label>

                                    <label>
                                        <input
                                            type='radio'
                                            name='channelType'
                                            checked={channelType === 'posts'}
                                            onChange={() => setChannelType('posts')}
                                        />
                                        Posts
                                    </label>

                                    <label>
                                        <input
                                            type='radio'
                                            name='channelType'
                                            checked={channelType === 'notice'}
                                            onChange={() => setChannelType('notice')}
                                        />
                                        Notice
                                    </label>
                                    {/* <label>
                                    <input
                                        type='radio'
                                        name='channelType'
                                        checked={channelType === 'voice'}
                                        onChange={() => setChannelType('voice')}
                                    />
                                    Voice Channel
                                </label> */}
                                    <label>
                                        <input
                                            type='radio'
                                            name='channelType'
                                            checked={channelType === 'notes'}
                                            onChange={() => setChannelType('notes')}
                                        />
                                        Notes Channel
                                    </label>
                                </div>

                            </div>

                            <button onClick={CreateChannel}>Create Channel</button>
                        </div>
                    </div>
                )}
                {modalInviteOpen && (
                    <div className='channel-modal-vh'>
                        <div className='modalch-content' style={{ backgroundColor: '#16191e', display: 'flex', flexDirection: 'column', gap: '20px', margin: 'auto', opacity: '1', padding: '20px', borderRadius: '10px', width: '200px' }}>
                            <div className='close' onClick={() => setInviteModalOpen(false)}>&times;</div>
                            <label>Invite people's</label> <div className='channel-name' style={{ textAlign: 'left', width: '100%', display: 'flex', flexDirection: 'row', gap: '10px' }}>

                                <input

                                    type='text'
                                    value={inviteLink} // Display the generated invite link
                                    readOnly // Make the input read-only
                                    style={{ backgroundColor: '#2f3136', color: '#fff', padding: '8px', borderRadius: '5px', border: 'none', outline: 'none' }}
                                />
                                <button onClick={copyToClipboard}>Copy</button>

                            </div>

                        </div>
                    </div>
                )}
            </div>
            <div className='chat_box '>
                <Chat user={user} socket={socket} toggleSidebar={toggleSidebar} />
            </div>
        </div>

    );
}