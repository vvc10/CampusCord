import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import url from '../url.json'
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';

export default function ChatDisplay(props) {
    const [heartCount, setHeartCount] = useState(0);
    let name = props.from
    let profileImage = props.profileImage
    let date = props.date
    let previous = props.lastmessage.id
    let previousDate = props.lastmessage.date
    let type = props.type
    let filedata = props.filedata
    var fileExt = filedata ? filedata.name.split('.').pop() : ''
    const acceptable = ["jpg", "jpeg", "png", "gif", "ico", "bmp", "apng"]
    let displayable = acceptable.includes(fileExt.toLowerCase())
    previousDate = new Date(previousDate).toLocaleDateString()
    let current = props.current
    let a = 1
    if (previous === current) a = 0;

    useEffect(() => {
        // Retrieve the heart count from local storage when the component mounts
        const storedHeartCount = localStorage.getItem('heartCount');
        if (storedHeartCount) {
            setHeartCount(parseInt(storedHeartCount));
        }
    }, []);

    useEffect(() => {
        // Store the heart count in local storage whenever it changes
        localStorage.setItem('heartCount', heartCount);
    }, [heartCount]);

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('en-US', options);
        const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
        const time = new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return `${time}`;
    }


    const handleHeartClick = () => {
        setHeartCount(prevCount => prevCount + 1);
    };

    return (
        <div className={a ? "chat start" : "chat"}>
            {a ?
                <img src={url.server + profileImage} alt='profile' className='profile' />
                :
                <div className='spacer'></div>
            }
            <div className="msg">
                {a ?
                    <div className='msg_in'>
                        <h4>{name}
                            <span>@{name}</span>
                        </h4>
                    </div>


                    :
                    <></>
                }
                <h5>{props.msg}</h5>
                <div className='dateofchat_cont'>
                    <div className='docCont_flex'>
                        <div className='docCont_like' >
                            <FontAwesomeIcon onClick={handleHeartClick} icon={faHeart} style={{ color: '#736973' }} />
                            <span>{heartCount}</span>
                        </div>
                       
                    </div>
                    <span className="noselect ">{formatDate(date)}</span>
                </div>

                {type === "file" ?
                    <>
                        {
                            displayable ?
                                <a href={url.server + filedata.src} download={url.server + filedata.src} className='file-chat-preview'>
                                    <img src={url.server + filedata.src} alt='file' />
                                </a>
                                :
                                <div className='file-attachment'>
                                    <FontAwesomeIcon icon={faFile} style={{ margin: '0 2%', fontSize: "1.6rem", color: "rgb(150, 150, 150)", pointerEvents: "none" }} />
                                    <div className='filedata'>
                                        <a href={url.server + filedata.src} target="_blank">{filedata.name}</a>
                                        <h6>{(filedata.size / 1000000).toFixed(2)}mb</h6>
                                    </div>

                                </div>
                        }
                    </>
                    :
                    <></>
                }
            </div>
        </div>
    )
}
