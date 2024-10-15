import React from 'react';
import { FaHome, FaCompass, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-0 left-0 h-16 w-full md:w-[5vw] bg-gray-800 md:h-screen md:flex md:flex-col md:items-center md:py-4 md:bottom-auto md:left-auto md:static">
            <div className='h-full md:h-fit md:m-auto flex flex-row md:flex-col gap-[20px] md:gap-[20px] justify-around md:justify-center'>
                <Link
                    to="/home"
                    className={`flex flex-col items-center mb-2 md:mb-8 cursor-pointer ${isActive('/home') ? 'text-white font-[700] bg-gray-700 ' : 'text-white opacity-[70%]'
                     } hover:bg-gray-700 p-2 rounded-[10px]`}
                >
                    <FaHome className="text-[15px] mb-1" />
                    <span className="text-xs">Home</span>
                </Link>
                <Link
                    to="/explore"
                    className={`flex flex-col items-center mb-2 md:mb-8 cursor-pointer ${isActive('/explore') ? 'text-white font-[700] bg-gray-700' : 'text-white opacity-[70%]'
                        } hover:bg-gray-700 p-2 rounded-[10px]`}
                >
                    <FaCompass className="text-[15px] mb-1" />
                    <span className="text-xs">Explore</span>
                </Link>
                <Link
                    to="/yourprofile"
                    className={`flex flex-col items-center cursor-pointer ${isActive('/you') ? 'text-white font-[700] bg-gray-700' : 'text-white opacity-[70%]'
                        } hover:bg-gray-700 p-2 rounded-[10px]`}
                >
                    <FaUser className="text-[15px] mb-1" />
                    <span className="text-xs">You</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
