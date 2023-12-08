import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import productSlice from './slices/productSlice';
import alertSlice from './slices/alertSlice';
import selectedProductSlice from './slices/selectedProductSlice';
import invoiceSlice from './slices/invoiceSlice';

const logger = createLogger();

const store = configureStore({
    reducer: {
        alert: alertSlice,
        product: productSlice,
        selectedProduct: selectedProductSlice,
        invoice: invoiceSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
