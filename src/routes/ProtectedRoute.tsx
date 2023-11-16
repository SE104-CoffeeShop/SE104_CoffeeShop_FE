import { Navigate, Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAuth } from '../provider/AuthProvider';
import axiosClient from '../utils/axiosClient';

export default function ProtectedRoute() {
    const { user, token, setUser, setToken } = useAuth();

    // get user data
    useEffect(() => {
        getUser();
    }, []);
    const getUser = async () => {
        try {
            const res = await axiosClient.get('/user');
            // If the user is logged in, set the user state in the context else redirect to login page
            // if not logged in (401 error)
            setUser(res.data.user);
        } catch (error) {
            console.log(error);
        }
    };
    if (!token) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}
