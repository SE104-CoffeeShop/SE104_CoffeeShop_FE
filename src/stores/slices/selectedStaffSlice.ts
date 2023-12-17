import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SelectedStaffState {
    selectedStaff: string[];
}

const initialState: SelectedStaffState = {
    selectedStaff: [],
};

const selectedStaffSlice = createSlice({
    name: 'selectedStaff',
    initialState,
    reducers: {
        setSelectedStaff: (state, action: PayloadAction<string[]>) => {
            state.selectedStaff = action.payload;
        },
        addSelectedStaff: (state, action: PayloadAction<string>) => {
            // Check if staff is already in selectedStaff array
            const index = state.selectedStaff.findIndex((staff) => staff === action.payload);
            // If staff is not in array, add it
            if (index === -1) state.selectedStaff.push(action.payload);
        },
        removeStaff: (state, action: PayloadAction<string>) => {
            // Find index of staff in selectedStaff array and remove it
            const index = state.selectedStaff.findIndex((staff) => staff === action.payload);
            // If staff is found, remove it else do nothing
            if (index !== -1) state.selectedStaff.splice(index, 1);
            // Update selectedStaff list
            state.selectedStaff = [...state.selectedStaff];
        },
        removeStaffs: (state) => {
            state.selectedStaff = [];
        },
        clearStaff: (state) => {
            state.selectedStaff = [];
        },
    },
});

export const { setSelectedStaff, addSelectedStaff, removeStaff, removeStaffs, clearStaff } =
    selectedStaffSlice.actions;
export default selectedStaffSlice.reducer;
