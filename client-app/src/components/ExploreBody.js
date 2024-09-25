import React, { useEffect, useState } from 'react';
import ExploreCard from './ExploreCard';
import url from '../url.json';  // Adjust this path as needed
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const ExploreBody = () => {
  const [publicServers, setPublicServers] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchPublicServers = async () => {
      try {
        const response = await fetch(`${url.server}api/get/server`, {
          method: "POST",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: user.id })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // Filter for public servers
        const filteredPublicServers = data.servers.filter(server => server.isPublic);
        setPublicServers(filteredPublicServers);
      } catch (error) {
        console.error('Error fetching public servers:', error);
      }
    };

    fetchPublicServers();
  }, [user.id]);

  return (
    <div className='explore_body mx-4'>
      {publicServers.map(server => (
        <ExploreCard
          key={server._id}
          serverName={server.serverName}
          serverDescription={server.description || "No description available."}  // Assuming description exists
        />
      ))}
    </div>
  );
};

export default ExploreBody;
