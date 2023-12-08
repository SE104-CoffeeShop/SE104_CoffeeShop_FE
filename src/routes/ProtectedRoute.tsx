import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../provider/AuthProvider';
import axiosClient from '../utils/axiosClient';

export default function ProtectedRoute() {
    const { token, setUser, user } = useAuth();
    // Get current route
    const navigate = useNavigate();
    // Check if exist user in local storage
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);
    // RUn on first render
    // useEffect(() => {
    //     // Get staff info
    //     getStaff();
    // }, []);
    // const getStaff = async () => {
    //     axiosClient
    //         .get('/staffs')
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .then((err) => {
    //             navigate('/login');
    //         });
    // };
    if (!token) {
        return <Navigate to="/login" />;
    }
    if (window.location.pathname === '/login' && token && user?.role !== 1) {
        return <Navigate to="/admin/billing" />;
    }
    if (window.location.pathname === '/login' && token && user?.role === 1) {
        return <Navigate to="/admin" />;
    }
    // // If user is logged in and not on dashboard, redirect to admin page
    // if (window.location.pathname === '/' && token && user?.role === 1) {
    //     return <Navigate to="/admin" />;
    // }
    // if (window.location.pathname === '/' && token && user?.role !== 1) {
    //     return <Navigate to="/admin/billing" />;
    // }
    // If user is logged in and not on dashboard, redirect to admin page
    if (window.location.pathname === '/' && token && user?.role === 1) {
        return <Navigate to="/admin" />;
    }
    if (window.location.pathname === '/' && token && user?.role !== 1) {
        return <Navigate to="/admin/billing" />;
    }
    return <Outlet />;
}
