import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Staff } from '../../hooks/useGetStaffs';

export interface StaffState {
    staff: Staff[];
}

const initialState: StaffState = {
    staff: [],
};

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        setStaff: (state, action: PayloadAction<Staff[]>) => {
            state.staff = action.payload;
        },
        updateStaff: (state, action: PayloadAction<Staff>) => {
            // Find index of staff in staff array and replace it with new staff
            const index = state.staff.findIndex((staff) => staff.id === action.payload.id);
            // If staff is found, replace it else do nothing
            if (index !== -1) state.staff[index] = action.payload;
            // Update staff list
            state.staff = [...state.staff];
        },
        removeStaffItem: (state, action: PayloadAction<string>) => {
            // Find index of staff in staff array and remove it using staff_code
            const index = state.staff.findIndex((staff) => String(staff.id) === action.payload);
            // If found then remove it else do nothing
            if (index !== -1) state.staff.splice(index, 1);
            // Update staff list
            state.staff = [...state.staff];
        },
        removeAllStaffs: (state, action: PayloadAction<string[]>) => {
            // Remove all staffs that match staff_code in action.payload
            action.payload.forEach((item) => {
                const index = state.staff.findIndex((staff) => String(staff.id) === item);
                // If found then remove it else do nothing
                if (index !== -1) state.staff.splice(index, 1);
                // Update staff list
                state.staff = [...state.staff];
            });
        },
        addStaff: (state, action: PayloadAction<Staff>) => {
            // CHeck if staff is already in staffs array
            const index = state.staff.findIndex((staff) => staff.id === action.payload.id);
            // If found then do nothing else add new staff
            if (index === -1) {
                // Add new staff to staffs array
                state.staff.push(action.payload);
                // Update staff list
                state.staff = [...state.staff];
            }
        },
    },
});

export const { setStaff, updateStaff, removeAllStaffs, removeStaffItem, addStaff } =
    staffSlice.actions;
export default staffSlice.reducer;
