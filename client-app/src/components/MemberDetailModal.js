import React, { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa";

export default function MemberDetailsModal({ members, onClose, totalmembers }) {
    const getAvatarUrl = (name) => {
        // Generate a DiceBear avatar URL using the member's name as the seed
        return `https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${encodeURIComponent(name)}`;
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-[#1f232b] rounded-lg shadow-lg w-80 p-6">
                <div className='w-[100%] items-center flex flex-row justify-between'>
                    <div className='flex flex-row items-center'>
                        <h2 className="text-[16px] font-[500] text-white">Member Details</h2>
                        <p className='text-white text-[12px] ml-3'>{totalmembers}</p>
                    </div>
                    <button
                        className="text-white hover:text-red-400 text-[20px] font-bold"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>

                <div>
                    {members.map((member, index) => {
                        const avatarUrl = member.profile || getAvatarUrl(member.name);  // Use profile if available, else generate an avatar

                        return (
                            <div key={index} className='flex flex-row gap-4 bg-gray-800 px-2 py-1 rounded-[8px] items-center my-4'>
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={avatarUrl}
                                    alt={`${member.name}'s avatar`}
                                />
                                <div className='flex flex-col justify-center'>
                                    <h3 className="text-[15px] font-[400] text-white">{member.name}</h3>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className='flex justify-end'>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-md text-sm"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
