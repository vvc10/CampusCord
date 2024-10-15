import React, { useEffect, useState } from 'react';
import ExploreCard from './ExploreCard';
import url from '../url.json';  // Adjust this path as needed
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const ExploreBody = () => {
  const [publicServers, setPublicServers] = useState([]);
  const user = useSelector(selectUser);  // Get logged-in user details from Redux

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
  }, [user.id]); // Re-run effect when the user's ID changes

  return (
    <div className="grid grid-cols-1 h-[78vh] overflow-y-scroll overflow-x-hidden sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4 my-4">
      {publicServers.map(server => (
        <ExploreCard
          key={server.serverId}  // Use serverId from the server object as the unique key
          serverId={server.serverId}  // Pass serverId to ExploreCard
          serverName={server.serverName}
          serverDescription={server.serverDescription || "No description available"} // Default message for empty descriptions
        />
      ))}

      {/* Optional: Message when no public servers are found */}
      {publicServers.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No public servers available.</p>
      )}
    </div>
  );
};

export default ExploreBody;
