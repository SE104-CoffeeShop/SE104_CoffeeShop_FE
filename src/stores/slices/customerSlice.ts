import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '../../hooks/useGetCustomers';

export interface CustomerState {
    customers: Customer[];
}

const initialState: CustomerState = {
    customers: [],
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomers(state, action: PayloadAction<Customer[]>) {
            state.customers = action.payload;
        },
        updateCustomer(state, action: PayloadAction<Customer>) {
            const customer = action.payload;
            const index = state.customers.findIndex((c) => c.id === customer.id);
            if (index !== -1) {
                state.customers[index] = customer;
            }
            state.customers = [...state.customers];
        },
        removeCustomer(state, action: PayloadAction<string>) {
            const index = state.customers.findIndex((c) => String(c.id) === action.payload);
            if (index !== -1) {
                state.customers.splice(index, 1);
            }
            state.customers = [...state.customers];
        },
        removeAllCustomer: (state, action: PayloadAction<string[]>) => {
            action.payload.forEach((item) => {
                const index = state.customers.findIndex((c) => String(c.id) === item);
                if (index !== -1) {
                    state.customers.splice(index, 1);
                }
                state.customers = [...state.customers];
            });
        },
        addCustomer(state, action: PayloadAction<Customer>) {
            const index = state.customers.findIndex((c) => c.id === action.payload.id);
            if (index === -1) {
                state.customers.push(action.payload);
                state.customers = [...state.customers];
            }
        },
    },
});

export const { setCustomers, updateCustomer, removeAllCustomer, removeCustomer, addCustomer } =
    customerSlice.actions;
export default customerSlice.reducer;
