import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Voucher } from '../../hooks/useGetVouchers';

interface VoucherState {
    vouchers: Voucher[];
}

const initialState: VoucherState = {
    vouchers: [],
};

const voucherSlice = createSlice({
    name: 'voucher',
    initialState,
    reducers: {
        setVouchers: (state, action: PayloadAction<Voucher[]>) => {
            state.vouchers = action.payload;
        },
        updateVoucher: (state, action: PayloadAction<Voucher>) => {
            // Find index of voucher in vouchers array and replace it with new voucher
            const index = state.vouchers.findIndex((voucher) => voucher.id === action.payload.id);
            // If voucher is found, replace it else do nothing
            if (index !== -1) state.vouchers[index] = action.payload;
            // Update voucher list
            state.vouchers = [...state.vouchers];
        },
        removeAllVouchers: (state, action: PayloadAction<string[]>) => {
            // Remove all vouchers that match id in action.payload
            action.payload.forEach((item) => {
                const index = state.vouchers.findIndex((voucher) => String(voucher.id) === item);
                // If found then remove it else do nothing
                if (index !== -1) state.vouchers.splice(index, 1);
                // Update voucher list
                state.vouchers = [...state.vouchers];
            });
        },
        removeVoucherItem: (state, action: PayloadAction<string>) => {
            // Find index of voucher in vouchers array and remove it using id
            const index = state.vouchers.findIndex(
                (voucher) => String(voucher.id) === action.payload,
            );
            // If found then remove it else do nothing
            if (index !== -1) state.vouchers.splice(index, 1);
            // Update voucher list
            state.vouchers = [...state.vouchers];
        },
        clearVouchers: (state) => {
            state.vouchers = [];
        },
    },
});

export const { setVouchers, updateVoucher, removeVoucherItem, removeAllVouchers, clearVouchers } =
    voucherSlice.actions;
export default voucherSlice.reducer;
