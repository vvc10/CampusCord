import React, { useEffect, useState } from 'react';
import { GrConnect } from "react-icons/gr";
import { LuUsers2 } from "react-icons/lu";
import url from "../url.json";
import '../components/css/ServerList.css';
import { useNavigate } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import { TiLinkOutline } from "react-icons/ti";
import Loader from './Loader';


// Modal Component for the join confirmation
const Modal = ({ onClose, navigateToServer }) => (
  <div className="modal-overlay bg-[#334155]">
    <div className="bg-[#1f232b] py-4 pb-7 px-4 rounded-[20px] w-[60%]">
      <h1 className='text-[22px] font-[600] mx-auto my-[10px] w-fit'>Congrats!</h1>
      <h2 className='text-white w-fit mx-auto'>You have joined the server!</h2>
      <div className=' w-fit mx-auto mt-[30px] relative flex flex-row gap-[30px]'>
        <button className="bg-white text-black px-4 py-1 rounded-[10px]" onClick={navigateToServer}>Go to server</button>
        <button className="absolute top-[-600%] left-[50%]" onClick={onClose}><RxCross1 /></button>
      </div>
    </div>
  </div>
);

const ExploreCard = ({ serverId, serverName, serverDescription, loggedInUserId }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state
  const navigate = useNavigate();

  const navigateToServer = () => {
    navigate(`/`); // Navigate to the server page
  };

  const getMembers = () => {
    if (serverId) {
      fetch(`${url.server}api/get/member`, {
        method: "POST",
        credentials: 'include',
        headers: {
          'Access-Control-Allow-Origin': url.frontend,
          'Access-Control-Allow-Credentials': 'true',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: serverId })
      })
        .then(response => response.json())
        .then(res => {
          if (!res.error) {
            setMembers(res.users);

            const userIsMember = res.users.some(member => member.id === loggedInUserId);
            setIsMember(userIsMember);
          }
        })
        .catch(error => {
          console.error("Error fetching members:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (serverId) {
      getMembers();
    } else {
      setLoading(false);
    }
  }, [serverId]);

  const joinServer = () => {
    if (isMember) {
      alert("You are already a member of this server.");
      return;
    }

    if (!serverId) {
      alert("Server ID is undefined or not loaded.");
      return;
    }

    const joinLink = `${url.server}join/${serverId}/`;
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = joinLink;
    document.body.appendChild(iframe);

    setTimeout(() => {
      setShowModal(true); // Show modal when the server is joined
    }, 1500);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='explore_card text-white w-[100%] text-left px-4 flex flex-row gap-6 py-2 bg-slate-700 rounded-[10px] items-center'>
      <div className='server_box_left h-fit w-fit p-2 bg-[#2a3347] rounded-[8px]'>
        <div className='server_deficon text-[38px] opacity-[60%]'>
          <TiLinkOutline />
        </div>
      </div>
      <div className='server_box_right'>
        <div className='flex flex-row '>
          <h2 className='text-[16px] font-[600] w-[80%]'>{serverName || 'Server'}
          </h2>
          <div className='flex flex-row items-center gap-2 w-[20%] justify-end opacity-85'>
            <LuUsers2 />
            {members.length}
          </div>
        </div>
         <p className='text-[14px] opacity-60'>
          {serverDescription || "No description available for this server."}
        </p>


        <button
          onClick={joinServer}
          className={`bg-white text-black flex flex-row items-center gap-[10px] py-1 px-2 rounded-[10px] mt-2 hover:opacity-60 justify-end ${isMember ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {isMember ? "Already Joined" : "Join"}
          <GrConnect className="text-[14px] text-black transition duration-300 ease-in-out cursor-pointer" />
        </button>
      </div>





      {/* Show modal when user joins the server */}
      {showModal && <Modal onClose={() => setShowModal(false)} navigateToServer={navigateToServer} />}
    </div>
  );
};

export default ExploreCard;
