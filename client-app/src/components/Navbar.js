import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-red-0 text-white py-2 px-2 bg-transparent h-fit w-[94vw] items-center">
      <div className="container mx-[10px] flex justify-between items-center">
        {/* Heading */}
        <h1 className="text-[18px] font-[500]">
          Explore
        </h1>

        {/* Search Bar */}
        <div className="relative bg-[#ffffff08] rounded-[30px]">
          <input
            type="text"
            className="rounded-full w-64 py-2 px-4 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Search..."
          />
          <button className="absolute right-2 top-2 text-white hover:text-gray-300">
            🔍
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
