import React, { useEffect } from 'react'
import './css/ServerList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faUserPlus, faPhoneSlash, faSignOutAlt } from '@fortawesome/free-solid-svg-icons' // Added faSignOutAlt icon
import CategoryButton from './CategoryButton'
import { selectServer } from '../features/serverSlice'
import { selectUser } from '../features/userSlice'
import { selectActiveChat, setActiceChat } from '../features/activeChatSlice'
import { useSelector, useDispatch } from 'react-redux'
import { setChannel } from '../features/channelSlice'
import url from "../url.json"
import Peer from 'peerjs';
import ServerList from './ServerList'
import ServerMembers from './ServerMembers'
import { logout } from '../features/userSlice'; // Assuming you have a logout action in your Redux userSlice
// import { useHistory } from 'react-router-dom'; 

let peer;

export default function Sidebar(props) {
    const dispatch = useDispatch();
    // const history = useHistory(); // Use useHistory hook to get access to browser history

    let [AvailableChannels, setAvailableChannels] = React.useState([])
    let [show, setShow] = React.useState(false)
    let [serverShow, setServerShow] = React.useState(false)
    let [myId, setMyId] = React.useState(false)
    let [changeState, setChangeState] = React.useState(false)
    let currentServer = useSelector(selectServer)
    var socket = props.socket
    var serverListUser = props.user
    var userList = props.user
    let currentUser = useSelector(selectUser)
    let currentActiveChannel = useSelector(selectActiveChat)

    const handleDrop = (e) => {
        e.preventDefault();
        e.dataTransfer.effectAllowed = 'move';
        let files = e.dataTransfer.files;
        if (files[0].type === "image/jpeg" || files[0].type === "image/png" || files[0].type === "image/gif") {
            document.querySelector("#file").files = files
            document.querySelector(".preview").src = URL.createObjectURL(files[0])
        }
    };

    function disconnect() {
        peer.destroy()
        fetch(`${url.server}update/active-peers`, {
            method: "POST",
            credentials: 'include',
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': url.frontend,
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: currentUser.id, channelId: currentActiveChannel.active.id })
        }).then(response => response.json()).then(res => {
            if (res.error === null) {
                dispatch(setActiceChat(
                    null
                ))
                setChangeState(!changeState)
                socket.emit('voice-chat-disconnect', currentActiveChannel.active.id, currentUser.id, currentServer.server.serverId)
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (e.target.file.files[0]) {
            if (show) {
                var data = new FormData();
                data.append("image", e.target.file.files[0])
                fetch(`${url.server}update/userdata`, {
                    method: "POST",
                    credentials: 'include',
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': url.frontend,
                        'Access-Control-Allow-Credentials': 'true',
                        // 'Content-Type': 'multipart/form-data'
                        // 'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: data
                }).then(response => response.json()).then(res => {
                    if (res.status === "Uploaded") {
                        setShow(false)
                    }
                });
            } else if (serverShow) {
                var data = new FormData();
                data.append("image", e.target.file.files[0])
                data.append("serverId", currentServer.server.serverId)
                fetch(`${url.server}update/server`, {
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
                        setServerShow(false)
                    }
                });
            }
        }
    }
    function changepreview(e) {
        if (e.target.files[0]) {
            document.querySelector(".preview").src = URL.createObjectURL(e.target.files[0])
        }
    }

    function handleLogout() {
        // dispatch(logout());
        // history.push('/login');
        // Implement logout logic here
        // For example, clear user session, redirect to login page, etc.
    }

    return (
        <>
            <div className='sidebar_panel'>
            <div className='Sidebar_panel_top'>
                <div class='sidebar_paneltopcenter'>
  <div className="sidebar-list">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
</svg>
    {/* <span className="sidebar-text">Home</span> */}
  </div>
  <div className="sidebar-list">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-compass" viewBox="0 0 16 16">
  <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
  <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
</svg>
    {/* <span className="sidebar-text">Explore</span> */}
  </div>
  <div className="sidebar-list">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
</svg>
    {/* <span className="sidebar-text">Saved</span> */}
  </div>
  </div>
  {/* Add more lists as needed */}
</div>
                <div className='Sidebar_list w-5/2'>
                    <div className="personal-details">
                        {
                            currentActiveChannel.active === null ? <>
                            </> :
                                <div className='disconnect-button'>
                                    <h4>{currentActiveChannel.active.name}</h4>
                                    <button className='disconnect-button-button' onClick={() => disconnect()}>
                                        <FontAwesomeIcon icon={faPhoneSlash} style={{ margin: 0, marginTop: '6%', marginBottom: '6%' }} />
                                    </button>
                                </div>
                        }
                        <div className='details'>
                            <img src={url.server + currentUser.profile} onClick={() => setShow(!show)}></img>
                            <div className="personal-details-text">
                                {/* <h4>{currentUser.name}</h4> */}
                                {/* <h5>{`#${currentUser.id.substr(1, 4)}`}</h5> */}
                            </div>
                        </div>
                         {/* Logout Button */}
            <div className="logout-button">
                <button onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
            </div>
                    </div>
                    {show || serverShow ?
                        <div className="modal">
                            <form onSubmit={(e) => handleSubmit(e)} >
                                <div className='section1' onDrop={(event) => handleDrop(event)}
                                    onDragOver={(e) => { e.preventDefault(); e.dataTransfer.effectAllowed = 'move'; }}
                                    onDragEnter={(e) => e.preventDefault()}>
                                    <span className="profile" onDrop={(event) => handleDrop(event)}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDragEnter={(e) => e.preventDefault()}>
                                        <img src={show ? url.server + currentUser.profile : url.server + currentServer.server.serverProfile} className="preview" onDrop={(event) => handleDrop(event)}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDragEnter={(e) => e.preventDefault()} />
                                        <input type="file" id="file" name="file" className="file ab" accept=".gif, .jpeg, .gif, .jpg" onChange={(e) => changepreview(e)} />
                                        <label htmlFor="file" className="ab">change Profile picture</label>
                                        <h5>Drag and drop works</h5>
                                    </span>
                                </div>
                                <div className="btn-group">
                                    <button className='btn login noselect' type="button" onClick={(e) => { e.preventDefault(); setShow(false); setServerShow(false) }}>CANCEL</button>
                                    <button className='btn login noselect' type="submit">SAVE</button>
                                </div>
                            </form>
                        </div>
                        : ""}
                </div>
            </div>
           
        </>
    )
}
