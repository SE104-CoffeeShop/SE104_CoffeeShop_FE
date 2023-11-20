import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import productReducer from './slices/productSlice';
import selectedProductSlice from './slices/selectedProductSlice';

const logger = createLogger();

const store = configureStore({
    reducer: {
        product: productReducer,
        selectedProduct: selectedProductSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
