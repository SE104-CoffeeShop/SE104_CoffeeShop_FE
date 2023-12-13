import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import productSlice from './slices/productSlice';
import alertSlice from './slices/alertSlice';
import selectedProductSlice from './slices/selectedProductSlice';
import invoiceSlice from './slices/invoiceSlice';
import checkoutSlice from './slices/checkoutSlice';
import voucherSlice from './slices/voucherSlice';
import selectedVoucherSlice from './slices/selectedVoucherSlice';

const store = configureStore({
    reducer: {
        alert: alertSlice,
        checkout: checkoutSlice,
        product: productSlice,
        selectedProduct: selectedProductSlice,
        invoice: invoiceSlice,
        voucher: voucherSlice,
        selectedVoucher: selectedVoucherSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
