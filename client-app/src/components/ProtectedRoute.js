import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../features/userSlice'; // Import your selector

const ProtectedRoute = ({ children }) => {
    const user = useSelector(selectUser); // Fetch the user from Redux state

    // If the user is not logged in, redirect to the login page
    if (!user) {
        return <Navigate to="/" />;
    }

    // Otherwise, render the children (i.e., the protected component)
    return children;
};

export default ProtectedRoute;
