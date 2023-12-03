import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect, useLayoutEffect } from 'react';
import { useAuth } from '../provider/AuthProvider';
import axiosClient from '../utils/axiosClient';

export default function ProtectedRoute() {
    const { token, setUser, user } = useAuth();
    // Get current route
    const navigate = useNavigate();
    // useEffect(() => {
    //     getUser();
    // }, []);
    // const getUser = async () => {
    //     try {
    //         const res = await axiosClient.get('/user');
    //         // If the user is logged in, set the user state in the context else redirect to login page
    //         // if not logged in (401 error)
    //         setUser(res.data);
    //     } catch (error) {
    //         // If cannot get user data, redirect to login page
    //         navigate('/login');
    //     }
    // };
    if (!token) {
        return <Navigate to="/login" />;
    }
    if (window.location.pathname === '/login' && token) {
        return <Navigate to="/admin" />;
    }
    // If user is logged in and not on dashboard, redirect to admin page
    if (window.location.pathname === '/' && token) {
        return <Navigate to="/admin" />;
    }
    return <Outlet />;
}
