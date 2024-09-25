import React, { useEffect, useState } from 'react';
import ChatDisplay from './ChatDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { selectChannel } from '../features/channelSlice';
import { selectUser } from '../features/userSlice';
import { selectServer } from '../features/serverSlice';
import { useSelector } from 'react-redux';
import url from "../url.json";
import '../components/css/ServerList.css';
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiSearch2Line } from "react-icons/ri";
import { IoIosAttach, IoIosReturnLeft } from "react-icons/io";
import EmojiEditor from './EmojiEditor';
import { IoIosSend } from "react-icons/io";

export default function Chat(props) {
    const { channel } = useSelector(selectChannel);
    let chatContainer = React.createRef();
    const scrollToMyRef = () => {
        const scroll = chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
        chatContainer.current.scrollTo(0, scroll);
    };
    var socket = props.socket;
    const toggleSidebar = props.toggleSidebar;
        let currentChannel = useSelector(selectChannel);
    let currentUser = useSelector(selectUser);
    let currentServer = useSelector(selectServer);
    let [message, setMessage] = React.useState('');
    let [messageList, setMessageList] = React.useState([]);
    let [previousMessageList, setPreviousMessageList] = React.useState([]);
    let [response, setResponse] = React.useState([]);
    let [isEmojiEditorOpen, setIsEmojiEditorOpen] = useState(false);
    let [isSidebarVisible, setIsSidebarVisible] = useState(false); // State to handle sidebar visibility
    const user = useSelector(selectUser);
    useEffect(() => {
        socket.on('msg', (a) => { setResponse(a) });
    }, []);

    useEffect(() => {
        if (response[3] === currentChannel.channel.channelId) {
            setMessageList(b => [...b, response]);
        }
    }, [response]);

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': url.frontend,
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ channelId: currentChannel.channel.channelId })
        };
        fetch(`${url.server}api/get/chat`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.error === null) {
                    setMessageList([]);
                    setPreviousMessageList(data.chat);
                }
            });
        socket.emit('join-room', currentChannel.channel.channelId);
    }, [currentChannel.channel]);

    useEffect(() => {
        scrollToMyRef();
    }, [messageList, previousMessageList]);

    function handleSubmit(e) {
        e.preventDefault();
        if (message !== '' && !selectedFile) {
            socket.emit('send-msg', message, currentChannel.channel.channelId, currentUser.id, currentServer.server.serverId);
            setMessageList(b => [...b, [message, currentUser.name, currentUser.profile, currentChannel.channel.channelIdx, Date.now(), currentUser.id, "text"]]);
            setMessage('');
        }
        if (selectedFile) {
            let selectedFilesrc;
            var data = new FormData();
            data.append("file", selectedFile);
            data.append("filename", selectedFile.name);
            fetch(`${url.server}upload-file`, {
                method: "POST",
                credentials: 'include',
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': url.frontend,
                    'Access-Control-Allow-Credentials': 'true',
                },
                body: data
            }).then(response => response.json()).then(res => {
                if (res.status === "Uploaded") {
                    selectedFilesrc = res.data;
                    socket.emit('message-with-file', selectedFile.name, selectedFile.size, selectedFilesrc, message, currentChannel.channel.channelId, currentUser.id, currentServer.server.serverId);
                    setMessageList(b => [...b, [message, currentUser.name, currentUser.profile, currentChannel.channel.channelId, Date.now(), currentUser.id, "file", { name: selectedFile.name, size: selectedFile.size, src: selectedFilesrc }]]);
                }
            });
            setMessage('');
            setSelectedFile('');
        }
    }

    let [selectedFile, setSelectedFile] = React.useState('');

    function FileChosen(evnt) {
        if (evnt.target.files[0]) {
            setSelectedFile(evnt.target.files[0]);
            document.querySelector(".cinput").focus();
        }
    }

    const handleEmojiClick = (emojiData, event) => {
        setMessage(prevMessage => prevMessage + emojiData.emoji);
    };
    const closeEmojiEditor = () => {
        setIsEmojiEditorOpen(false);
    };

 
    return (
        <div className={`h-[100%] chat-container ${isSidebarVisible ? '' : 'expanded'}`}> {/* Apply class based on visibility */}
            <div className='chat-header-cs noselect'>
                <div className='mob_backic' onClick={toggleSidebar}> {/* Add onClick to toggle sidebar */}
                    <IoIosReturnLeft />
                </div>
                <div className='chead_side'>
                    <span>{currentServer.server.serverName} </span>
                    <p>{currentChannel.channel.channelName}</p>
                </div>
                <div className='chead_btns'>
                    <BsThreeDotsVertical className='chead_ic' />
                    <RiSearch2Line className='chead_ic' />
                </div>
            </div>
            <div className='chat-display' ref={chatContainer}>
                {previousMessageList.map((message, ind) => (
                    <ChatDisplay
                        lastmessage={ind === 0 ? 0 : { id: previousMessageList[ind - 1]["senderId"], date: previousMessageList[ind - 1]['time'] }}
                        key={message._id}
                        from={message.by}
                        profileImage={message.senderProfile}
                        date={message.time}
                        msg={message.message}
                        current={message["senderId"]}
                        type={message.type}
                        filedata={message.filedata}
                        isFirstMessageOfConversation={ind === 0}
                    />
                ))}
                {messageList.map((message, ind) => (
                    <ChatDisplay
                        lastmessage={ind === 0 ? previousMessageList[previousMessageList.length - 1] ? { id: previousMessageList[previousMessageList.length - 1]["senderId"], date: previousMessageList[previousMessageList.length - 1]['time'] } : { id: 0, date: "" } : { id: messageList[ind - 1][5], date: messageList[ind - 1][4] }}
                        key={ind}
                        from={message[1]}
                        profileImage={message[2]}
                        date={message[4]}
                        msg={message[0]}
                        current={message[5]}
                        type={message[6]}
                        filedata={message[7]}
                        isFirstMessageOfConversation={ind === 0 && previousMessageList.length === 0}
                    />
                ))}
            </div>

            {channel.channelType == "text" ? (
                <div className='chat-input'>
                    {selectedFile !== '' ?
                        <div className='file-name-display'>
                            <FontAwesomeIcon icon={faFile} style={{ margin: '0 2%', fontSize: "1.3rem", color: "rgb(150, 150, 150)", pointerEvents: "none" }} />
                            {selectedFile ? selectedFile.name : ''}
                            <button onClick={() => setSelectedFile('')}>X</button>
                        </div>
                        : null}

                    <div className='chat-input-btns'>
                        <div className='emojibtn' onClick={() => setIsEmojiEditorOpen(!isEmojiEditorOpen)}>
                            😀
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input type="file" id='fileInput' style={{ display: 'none' }} className='chat-input-btn-choose' onChange={(e) => FileChosen(e)} />
                            <IoIosAttach className='icon' onClick={() => document.getElementById('fileInput').click()} />
                            <input type="text" style={{ zIndex: "1" }} className="cinput" placeholder={`Message #${currentChannel.channel.channelName}`} value={message} onChange={(e) => setMessage(e.target.value)} />
                        </form>
                        <IoIosSend className='hover:bg-[#c9dfff] text-white hover:text-black p-2 text-[35px] rounded-full mr-2 cursor-pointer' onClick={handleSubmit} />
                    </div>
                </div>
            ) : channel.channelType == "notes" ? (
                <div className='chat-notes'>
                    <div className='chat-notes-btns'>

                    </div>
                </div>
            ) : channel.channelType == "notice" ? (
                <div className='chat-notices'>
                    <div className='chat-notes-btns'>
                        <p>Done reading {channel.channelName}? let's explore what's going on in other cords ..</p>
                        <button>></button>
                    </div>
                </div>
            ) : channel.channelType == "voice" ? (
                <>Voice Channel</>
            ) : channel.channelType == "posts" ? (
                <>posts Channel</>
            ) : (
                <></>
            )}

            {isEmojiEditorOpen && <EmojiEditor onEmojiClick={handleEmojiClick} closeEditor={closeEmojiEditor} />} {/* Pass handleEmojiClick as prop */}
        </div>
    )
}
