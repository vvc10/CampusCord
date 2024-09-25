import React from 'react';
import { FaHome, FaCompass, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-0 left-0 h-16 w-full md:w-[5vw] bg-gray-800 md:h-screen md:flex md:flex-col md:items-center md:py-4 md:bottom-auto md:left-auto md:static md:w-[5vw]">
            <div className='h-full md:h-fit md:m-auto flex flex-row md:flex-col gap-[20px] md:gap-[20px] justify-around md:justify-center'>
                <Link
                    to="/"
                    className={`flex flex-col items-center mb-2 md:mb-8 cursor-pointer ${isActive('/') ? 'text-white' : 'text-white'
                        } hover:bg-gray-700 p-2 rounded-2`}
                >
                    <FaHome className="text-[15px] mb-1" />
                    <span className="text-xs">Home</span>
                </Link>
                <Link
                    to="/explore"
                    className={`flex flex-col items-center mb-2 md:mb-8 cursor-pointer ${isActive('/explore') ? 'text-blue-500' : 'text-white'
                        } hover:bg-gray-700 p-2 rounded-[6px]`}
                >
                    <FaCompass className="text-[15px] mb-1" />
                    <span className="text-xs">Explore</span>
                </Link>
                <Link
                    to="/you"
                    className={`flex flex-col items-center cursor-pointer ${isActive('/you') ? 'text-blue-500' : 'text-white'
                        } hover:bg-gray-700 p-2 rounded-2`}
                >
                    <FaUser className="text-[15px] mb-1" />
                    <span className="text-xs">You</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
