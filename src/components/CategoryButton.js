import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { selectChannel, setChannel } from '../features/channelSlice'
import { selectUser } from '../features/userSlice'
import { selectServer } from '../features/serverSlice'
import { setActiceChat, selectActiveChat } from '../features/activeChatSlice'
import { useSelector, useDispatch } from 'react-redux'

import url from "../url.json"
export default function CategoryButton(props) {
    let currentChannel = useSelector(selectChannel)
    let currentUser = useSelector(selectUser)
    let currentServer = useSelector(selectServer)
    let currentActive = useSelector(selectActiveChat)
    let [peer, setPeer] = React.useState([])
    const dispatch = useDispatch();
    let name = props.name
    let channelType = props.type
    let socket = props.socket
    let id = props.uid
    let peerId = props.PeerId
    let state = props.state
    function setCurrentChannel() {
        dispatch(setChannel({
            channelName: name,
            channelId: id,
            setChannelLink: getLink
        }))
    }
    React.useEffect(() => {
        if (channelType === 'voice') {
            setTimeout(() => {
                fetch(`${url.server}get/active-peers`, {
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
                        let a = res.data
                        setPeer(a)
                    }
                });
            }, 3000);
        }
    }, [state])
    React.useEffect(() => {
        socket.on('voice-chat-update-user-list', (channelId, data, userId, entered) => {
            if (channelId === id) {
                if (entered) {
                    setPeer(old => [...old, data])
                } else {
                    setTimeout(() => {
                        fetch(`${url.server}get/active-peers`, {
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
                                let a = res.data
                                setPeer(a)

                            }
                        });
                    }, 3000);
                }
            }
        })
        if (channelType === 'voice') {
            fetch(`${url.server}get/active-peers`, {
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
                    let a = peer.concat(peer, res.data)
                    setPeer(a)
                    const isFound = a.some(element => {
                        if (element.key === currentUser.id) {
                            return true;
                        }
                    });
                    if (isFound) {
                        dispatch(setActiceChat({
                            id: id,
                            name: name
                        }))
                        socket.emit("voice-chat-join", currentServer.server.id, id, peerId, currentUser.id)
                    }
                }
            })
            socket.emit('get-active-peers', currentUser.id, id)
        }
    }, [])

    function joinVoice(id) {
        if (currentActive.active == null) {
            socket.emit("voice-chat-join", currentServer.server.id, id, peerId, currentUser.id)
            let data = { image: currentUser.profile, displayName: currentUser.name, key: currentUser.id }
            const isFound = peer.some(element => {
                if (element.key === currentUser.id) {
                    return true;
                }
            });

            if (!isFound) {
                setPeer(old => [...old, data])
                dispatch(setActiceChat({
                    id: id,
                    name: name
                }))
            }
        }
        else {
            alert("disconnect other voice channel")
        }
    }

    function getLink() {
        alert(`Your invite link is : ${url.server}join/${currentServer.server.serverId}`)
    }
    return (
        <>
            {channelType === 'text' ? (
                <div className={id === currentChannel.channel.channelId ? 'channel-select-btn noselect channel-active' : 'channel-select-btn noselect'} onClick={setCurrentChannel}>
                    <h3>#</h3> {name}

                </div>
            ) : channelType === 'blog' ?  (
                <>
                   
                        <div  className={id === currentChannel.channel.channelId ? 'channel-select-btn noselect channel-active' : 'channel-select-btn noselect'} onClick={setCurrentChannel}>
                            <h3>#Blog: </h3> {name}
                        </div>
                    
                </>
                
            )
           :(
            <></>
           )
        }
        </>
    )
}
