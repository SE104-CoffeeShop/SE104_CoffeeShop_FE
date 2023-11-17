import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SelectedProductState {
    selectedProduct: string[];
}

const initialState: SelectedProductState = {
    selectedProduct: [],
};

const selectedProductSlice = createSlice({
    name: 'selectedProduct',
    initialState,
    reducers: {
        setSelectedProduct: (state, action: PayloadAction<string[]>) => {
            state.selectedProduct = action.payload;
        },
        addProduct: (state, action: PayloadAction<string>) => {
            // Check if product is already in selectedProduct array
            const index = state.selectedProduct.findIndex((product) => product === action.payload);
            // If product is not in array, add it
            if (index === -1) state.selectedProduct.push(action.payload);
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            // Find index of product in selectedProduct array and remove it
            const index = state.selectedProduct.findIndex((product) => product === action.payload);
            // If product is found, remove it else do nothing
            if (index !== -1) state.selectedProduct.splice(index, 1);
        },
        removeProducts: (state) => {
            state.selectedProduct = [];
        },
        clearProduct: (state) => {
            state.selectedProduct = [];
        },
    },
});

export const { setSelectedProduct, addProduct, removeProduct, removeProducts, clearProduct } =
    selectedProductSlice.actions;
export default selectedProductSlice.reducer;
