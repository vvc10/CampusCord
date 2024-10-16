import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import url from '../url.json'; 
import ExploreBody from './ExploreBody';

const Explore = () => {
  const [servers, setServers] = useState([]); // Initialize as empty since servers will come from API
  const [sortCriteria, setSortCriteria] = useState('members'); // Default sort by members
  const [publicServers, setPublicServers] = useState([]);

  // Function to sort servers based on criteria
  const sortServers = (criteria) => {
    const sortedServers = [...servers].sort((a, b) => {
      if (criteria === 'members') {
        return b.members - a.members; // Sort by members in descending order
      } else if (criteria === 'createdAt') {
        return new Date(b.createdAt) - new Date(a.createdAt); // Sort by creation date
      } else {
        return a.name.localeCompare(b.name); // Sort by name in alphabetical order
      }
    });
    setServers(sortedServers);
  };

  // Effect to sort servers whenever sortCriteria changes
  useEffect(() => {
    sortServers(sortCriteria);
  }, [sortCriteria, servers]); // Ensure servers are re-sorted when new data comes in

  // Fetch public servers from the backend
  useEffect(() => {
    const fetchPublicServers = async () => {
      try {
        const response = await fetch(`${url.server}api/get/explore`, { // Fetching from the correct endpoint
          method: "POST",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({}) // No need to send user ID if not required
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Check if servers exist and handle errors
        if (data.error === null && Array.isArray(data.servers)) {
          setPublicServers(data.servers); // Set public servers directly
        } else {
          console.error(data.error || 'Failed to fetch servers');
        }
      } catch (error) {
        console.error('Error fetching public servers:', error);
      }
    };

    fetchPublicServers(); // Fetch public servers on component mount
  }, []); // No dependency on user.id unless required

  // Update the servers state whenever publicServers change
  useEffect(() => {
    setServers(publicServers); // Set servers from fetched public servers
  }, [publicServers]);

  return (
    <div className='explore_div bg-[#1f232b] h-[100vh] w-[100vw] md:w-[95vw]'>
      <Navbar />
      <div className='w-[100%] px-4 py-4 flex flex-row items-center'>
        <h2 className='font-[600] text-[18px] text-white text-left w-[60%] items-center'>
          Popular servers <span className='text-[15px] text-gray-400 font-[400]'>({servers.length})</span>
        </h2>
        <div className='text-white flex flex-row gap-[5px] items-center justify-end w-[40%]'>
          sort by
          <select
            className='bg-gray-700 text-white text-[16px] w-fit px-2 py-1 rounded-[5px]'
            onChange={(e) => setSortCriteria(e.target.value)}
            value={sortCriteria}
          >
            <option value='members'>Servers</option>
            {/* <option value='createdAt'>Creation Date</option>
            <option value='name'>Name</option> */}
          </select>
        </div>
      </div>
      <ExploreBody servers={servers} /> {/* Pass sorted servers to ExploreBody */}
    </div>
  );
};

export default Explore;
