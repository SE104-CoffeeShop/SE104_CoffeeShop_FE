import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CustomerState {
    selectedCustomer: string[];
}

const initialState: CustomerState = {
    selectedCustomer: [],
};

const selectedCustomerSlice = createSlice({
    name: 'selectedCustomer',
    initialState,
    reducers: {
        setSelectedCustomer(state, action: PayloadAction<string[]>) {
            state.selectedCustomer = action.payload;
        },
        addSelectedCustomer(state, action: PayloadAction<string>) {
            const index = state.selectedCustomer.findIndex((c) => c === action.payload);
            if (index === -1) {
                state.selectedCustomer.push(action.payload);
                state.selectedCustomer = [...state.selectedCustomer];
            }
        },
        removeSelectedCustomer(state, action: PayloadAction<string>) {
            const index = state.selectedCustomer.findIndex((c) => c === action.payload);
            if (index !== -1) {
                state.selectedCustomer.splice(index, 1);
            }
            state.selectedCustomer = [...state.selectedCustomer];
        },
        removeAllSelectedCustomer: (state) => {
            state.selectedCustomer = [];
        },
        clearSelectedCustomer: (state) => {
            state.selectedCustomer = [];
        },
    },
});

export const {
    setSelectedCustomer,
    addSelectedCustomer,
    removeSelectedCustomer,
    removeAllSelectedCustomer,
    clearSelectedCustomer,
} = selectedCustomerSlice.actions;
export default selectedCustomerSlice.reducer;
