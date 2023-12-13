import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SelectedVoucherState {
    selectedVoucher: string[];
}

const initialState: SelectedVoucherState = {
    selectedVoucher: [],
};

const selectedVoucherSlice = createSlice({
    name: 'selectedVoucher',
    initialState,
    reducers: {
        setSelectedVoucher: (state, action: PayloadAction<string[]>) => {
            state.selectedVoucher = action.payload;
        },
        addVoucher: (state, action: PayloadAction<string>) => {
            // Check if voucher is already in selectedVoucher array
            const index = state.selectedVoucher.findIndex((voucher) => voucher === action.payload);
            // If voucher is not in array, add it
            if (index === -1) state.selectedVoucher.push(action.payload);
        },
        removeVoucher: (state, action: PayloadAction<string>) => {
            // Find index of voucher in selectedVoucher array and remove it
            const index = state.selectedVoucher.findIndex((voucher) => voucher === action.payload);
            // If voucher is found, remove it else do nothing
            if (index !== -1) state.selectedVoucher.splice(index, 1);
        },
        removeVouchers: (state) => {
            state.selectedVoucher = [];
        },
        clearVoucher: (state) => {
            state.selectedVoucher = [];
        },
    },
});

export const { setSelectedVoucher, addVoucher, removeVoucher, removeVouchers, clearVoucher } =
    selectedVoucherSlice.actions;
export default selectedVoucherSlice.reducer;
