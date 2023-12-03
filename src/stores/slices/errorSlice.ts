import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ErrorState {
    errorMessages: string | null;
    showError: boolean;
}

const initialState: ErrorState = {
    errorMessages: null,
    showError: false,
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.errorMessages = action.payload;
            state.showError = true;
        },
        clearError: (state) => {
            state.errorMessages = null;
            state.showError = false;
        },
    },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
