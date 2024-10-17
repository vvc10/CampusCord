import React, { useState } from 'react';

const Message = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true); // State to control visibility

  const handleClose = () => {
    setIsVisible(false); // Hide message when close is clicked
  };

  if (!isVisible) return null; // Don't render if not visible

  return (
    <div className='fixed top-[0] left-0 mt-[2%] z-50 w-[100vw] bg-transparent '>
      <div className='flex flex-row gap-2 items-center py-1 px-3 rounded-[8px] w-fit bg-gray-900 mx-auto'>
        {message}
        <span 
          className='cursor-pointer ml-2 text-white hover:text-red-500' 
          onClick={handleClose} // Close the message when clicked
        >
          &times;
        </span>
      </div>
    </div>
  );
};

export default Message;
