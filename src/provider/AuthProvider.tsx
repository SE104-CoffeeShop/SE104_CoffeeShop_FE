/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import axiosClient from '../utils/axiosClient';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role: number;
    created_at: string;
    updated_at: string;
}

const AuthContext = createContext<{
    user: User | null;
    setUser: (user: User | null) => void;
    token: string | null;
    setToken: (token: string | null) => void;
}>({
    user: null,
    setUser: () => {},
    token: null,
    setToken: () => {},
});

function AuthProvider({ children }: { children: ReactNode }) {
    // State to hold user information
    const [user, setUser] = useState<User | null>(
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    );
    // State to hold the authentication token
    const [token, setToken_] = useState(localStorage.getItem('ACCESS_TOKEN'));
    // Function to set the authentication token
    const setToken = (newToken: string | null) => {
        setToken_(newToken);
    };
    useEffect(() => {
        if (token) {
            axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            delete axiosClient.defaults.headers.common.Authorization;
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }, [token]);
    // Get user information from local storage when the app is first loaded and check whenever user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const contextValue = useMemo(
        () => ({
            user,
            setUser,
            token,
            setToken,
        }),
        [user, token],
    );

    // Provide the authentication context to the children components
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
