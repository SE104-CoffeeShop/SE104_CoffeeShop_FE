import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CheckoutItem {
    productID: string;
    quantity: number;
    unit_price: number;
}

export interface CheckoutList {
    items: CheckoutItem[];
    totalPrice: number;
    discountPrice: number;
    voucherCode: string | null;
    note: string | null;
    customerPhone: string | null;
    tableNumber: number;
}

export interface CheckoutState {
    checkoutList: CheckoutList;
}

const initialState: CheckoutState = {
    checkoutList: {
        items: [],
        totalPrice: 0,
        discountPrice: 0,
        voucherCode: null,
        note: null,
        customerPhone: null,
        tableNumber: 0,
    },
};

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CheckoutItem>) => {
            // Check if item already exists then increase quantity
            const itemIndex = state.checkoutList.items.findIndex(
                (item) => item.productID === action.payload.productID,
            );
            if (itemIndex !== -1) {
                state.checkoutList.items[itemIndex].quantity += action.payload.quantity;
            } else {
                state.checkoutList.items.push(action.payload);
            }
        },
        decItem: (state, action: PayloadAction<string>) => {
            const itemIndex = state.checkoutList.items.findIndex(
                (item) => item.productID === action.payload,
            );
            if (itemIndex !== -1) {
                state.checkoutList.items[itemIndex].quantity -= 1;
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.checkoutList.items = state.checkoutList.items.filter(
                (item) => item.productID !== action.payload,
            );
        },
        updateItem: (state, action: PayloadAction<CheckoutItem>) => {
            const itemIndex = state.checkoutList.items.findIndex(
                (item) => item.productID === action.payload.productID,
            );
            state.checkoutList.items[itemIndex] = action.payload;
        },
        updateTotalPrice: (state, action: PayloadAction<number>) => {
            state.checkoutList.totalPrice = action.payload;
        },
        updateDiscountPrice: (state, action: PayloadAction<number>) => {
            state.checkoutList.discountPrice = action.payload;
        },
        updateVoucherCode: (state, action: PayloadAction<string | null>) => {
            state.checkoutList.voucherCode = action.payload;
        },
        updateNote: (state, action: PayloadAction<string | null>) => {
            state.checkoutList.note = action.payload;
        },
        updateCustomerPhone: (state, action: PayloadAction<string | null>) => {
            state.checkoutList.customerPhone = action.payload;
        },
        updateTableNumber: (state, action: PayloadAction<number>) => {
            state.checkoutList.tableNumber = action.payload;
        },
        clearCheckoutList: (state) => {
            state.checkoutList = initialState.checkoutList;
        },
    },
});

export const {
    addItem,
    removeItem,
    decItem,
    updateItem,
    updateTotalPrice,
    updateDiscountPrice,
    updateVoucherCode,
    updateNote,
    updateCustomerPhone,
    updateTableNumber,
    clearCheckoutList,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
