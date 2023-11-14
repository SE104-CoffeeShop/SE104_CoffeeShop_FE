import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Loading from '../../components/Loading/Loading';

export interface User {
    // TODO: more fields
    name: string;
    email: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    error: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    token: null,
    user: null,
    error: false,
    isLoading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            // Get user from payload and set it to state
            state.user = action.payload;
            state.isLoading = false;
        },
        setToken: (state, action: PayloadAction<string>) => {
            // Get token from payload and set it to state
            state.token = action.payload;
            // If token is not null, set it to local storage else remove it
            if (action.payload) {
                localStorage.setItem('ACCESS_TOKEN', action.payload);
            } else {
                localStorage.removeItem('ACCESS_TOKEN');
            }
            state.isLoading = false;
        },
        setError: (state, action: PayloadAction<boolean>) => {
            // Get error from payload and set it to state
            state.error = action.payload;
            state.isLoading = false;
        },
        LoadingSuccess: (state) => {
            state.isLoading = true;
        },
        clearError: (state) => {
            state.error = false;
        },
    },
});

export const { setUser, setToken, setError, LoadingSuccess, clearError } = authSlice.actions;
export default authSlice.reducer;
