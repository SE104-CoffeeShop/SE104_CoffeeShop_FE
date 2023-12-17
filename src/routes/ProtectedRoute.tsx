import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../provider/AuthProvider';

export default function ProtectedRoute() {
    const { token, setUser, user } = useAuth();
    // Get current route
    const navigate = useNavigate();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (window.location.pathname === '/') {
        if (user?.role === 1) {
            return <Navigate to="/admin" />;
        }
        return <Navigate to="/admin/billing" />;
    }

    if (window.location.pathname.startsWith('/admin')) {
        if (user?.role !== 1) {
            if (
                window.location.pathname === '/admin/billing' ||
                window.location.pathname === '/admin/checkout'
            ) {
                return <Outlet />;
            }
            return <Navigate to="/admin/billing" />;
        }
    }

    return <Outlet />;
}
