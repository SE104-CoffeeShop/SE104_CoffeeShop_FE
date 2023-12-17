import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../hooks/useGetProducts';

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: [],
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },

        updateProduct: (state, action: PayloadAction<Product>) => {
            // Find index of product in products array and replace it with new product
            const index = state.products.findIndex((product) => product.id === action.payload.id);
            // If product is found, replace it else do nothing
            if (index !== -1) state.products[index] = action.payload;
            // Update product list
            state.products = [...state.products];
        },
        removeProductItem: (state, action: PayloadAction<string>) => {
            // Find index of product in products array and remove it using product_code
            const index = state.products.findIndex((product) => product.id === action.payload);
            // If found then remove it else do nothing
            if (index !== -1) state.products.splice(index, 1);
            // Update product list
            state.products = [...state.products];
        },
        removeAllProducts: (state, action: PayloadAction<string[]>) => {
            // Remove all products that match product_code in action.payload
            action.payload.forEach((item) => {
                const index = state.products.findIndex((product) => product.id === item);
                // If found then remove it else do nothing
                if (index !== -1) state.products.splice(index, 1);
                // Update product list
                state.products = [...state.products];
            });
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            // CHeck if product is already in products array
            const index = state.products.findIndex((product) => product.id === action.payload.id);
            // If found then do nothing else add new product
            if (index === -1) {
                // Add new product to products array
                state.products.push(action.payload);
                // Update product list
                state.products = [...state.products];
            }
        },
    },
});

export const { setProducts, updateProduct, removeAllProducts, removeProductItem, addProduct } =
    productSlice.actions;
export default productSlice.reducer;
