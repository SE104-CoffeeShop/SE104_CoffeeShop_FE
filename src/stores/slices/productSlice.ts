import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../api/productAPI';

interface ProductState {
    products: Product[];
    isLoading: boolean;
}

const initialState: ProductState = {
    products: [],
    isLoading: true,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.isLoading = false;
        },
        setLoadingSuccess: (state) => {
            state.isLoading = false;
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            // Find index of product in products array and replace it with new product
            const index = state.products.findIndex(
                (product) => product.product_code === action.payload.product_code,
            );
            // If product is found, replace it else do nothing
            if (index !== -1) state.products[index] = action.payload;
        },
    },
});

export const { setProducts, setLoadingSuccess, updateProduct } = productSlice.actions;
export default productSlice.reducer;
