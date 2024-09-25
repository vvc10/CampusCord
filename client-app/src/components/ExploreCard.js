import React from 'react';

const ExploreCard = ({ serverName, serverDescription }) => {
  return (
    <div className='explore_card text-white w-[200px] text-left py-2 px-4 bg-slate-700 rounded-[10px]'>
      {/* Server Title */}
      <h2 className='text-[16px] font-[600]'>{serverName}</h2>

      {/* Server Description */}
      <p className='text-[14px] opacity-60'>
        {serverDescription ? serverDescription : "No description available for this server."}
      </p>

      {/* Join/Explore Button */}
      <button className='bg-blue-500 text-white py-1 px-4 rounded-[5px] mt-2 hover:bg-blue-600'>
        Explore
      </button>
    </div>
  );
}

export default ExploreCard;
