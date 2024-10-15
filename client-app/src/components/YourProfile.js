import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../url.json';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import { selectUser, logout } from '../features/userSlice'; // Import logout action

const YourProfile = () => {
    const [userData, setUserData] = useState(null);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const dispatch = useDispatch(); // Initialize dispatch

    // Handle logout by clearing session storage, Redux state, and navigating to the landing page
    const handleLogout = async () => {
        try {
            // Optionally make an API call to log out from the server if needed
            await axios.post(`${url.server}auth/logout`, {}, { withCredentials: true });

            // Clear the user's authentication state (JWT or session cookies)
            localStorage.removeItem('authToken'); // If you are using localStorage for token
            sessionStorage.removeItem('authToken'); // If you use sessionStorage
            localStorage.clear(); // Or you can clear all storage
            sessionStorage.clear();

            // Dispatch the logout action to clear user data in Redux
            dispatch(logout());

            // Redirect to the landing page
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        // Fetch user data on component mount
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${url.server}auth/user`, { withCredentials: true });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!file) return; // Ensure a file is selected

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`${url.server}update/userdata`, formData, {
                withCredentials: true,
            });
            if (response.data.status === 'Uploaded') {
                setMessage('Profile updated successfully!');
                // Optionally, fetch user data again to update the UI
                const updatedResponse = await axios.get(`${url.server}auth/user`, { withCredentials: true });
                setUserData(updatedResponse.data);
            } else {
                setMessage('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('An error occurred while updating the profile.');
        }
    };

    return (
        <div className="profile-container bg-[#1f232b] h-[100vh] w-[95vw]">
            <div className="bg-red-0 text-white py-2 px-2 bg-transparent h-fit w-[94vw] items-center">
                <div className="container mx-[10px] flex justify-between items-center">
                    {/* Heading */}
                    <h1 className="text-[18px] font-[500]">Explore</h1>

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
            </div>

            {userData ? (
                <div className="container mx-auto p-4 rounded-lg text-white">
                    <h2 className="text-2xl font-bold text-center mb-4">Your Profile</h2>
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src={`/${userData.profile}`}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-2 border-gray-300 mb-3"
                        />
                        <p className="text-lg font-semibold">Name: {userData.name}</p>
                        <p className="text-gray-600">Email: {userData.email}</p>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="flex flex-col items-center">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="mb-4 p-2 border border-gray-300 rounded-md"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-200"
                        >
                            Update Profile
                        </button>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-red-600 transition duration-200 mt-4"
                        >
                            Log Out
                        </button>
                    </form>
                    {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default YourProfile;
