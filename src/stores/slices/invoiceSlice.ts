import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Invoice } from '../../hooks/useGetInvoices';

export interface InvoiceState {
    invoices: Invoice[];
}

const initialState: InvoiceState = {
    invoices: [],
};

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setInvoices: (state, action: PayloadAction<Invoice[]>) => {
            state.invoices = action.payload;
        },
        updateInvoice: (state, action: PayloadAction<Invoice>) => {
            // Find index of invoice in invoices array and replace it with new invoice
            const index = state.invoices.findIndex((invoice) => invoice.id === action.payload.id);
            // If invoice is found, replace it else do nothing
            if (index !== -1) state.invoices[index] = action.payload;
            // Update invoice list
            state.invoices = [...state.invoices];
        },
        removeInvoiceItem: (state, action: PayloadAction<number>) => {
            // Find index of invoice in invoices array and remove it using invoice_code
            const index = state.invoices.findIndex((invoice) => invoice.id === action.payload);
            // If found then remove it else do nothing
            if (index !== -1) state.invoices.splice(index, 1);
            // Update invoice list
            state.invoices = [...state.invoices];
        },
        removeAllInvoices: (state, action: PayloadAction<number[]>) => {
            // Remove all invoices that match invoice_code in action.payload
            action.payload.forEach((item) => {
                const index = state.invoices.findIndex((invoice) => invoice.id === item);
                // If found then remove it else do nothing
                if (index !== -1) state.invoices.splice(index, 1);
                // Update invoice list
                state.invoices = [...state.invoices];
            });
        },
        addInvoice: (state, action: PayloadAction<Invoice>) => {
            // CHeck if invoice is already in invoices array
            const index = state.invoices.findIndex((invoice) => invoice.id === action.payload.id);
            // If found then do nothing else add new invoice
            if (index === -1) {
                // Add new invoice to invoices array
                state.invoices.push(action.payload);
                // Update invoice list
                state.invoices = [...state.invoices];
            }
        },
    },
});

export const { setInvoices, updateInvoice, removeAllInvoices, removeInvoiceItem, addInvoice } =
    invoiceSlice.actions;
export default invoiceSlice.reducer;
