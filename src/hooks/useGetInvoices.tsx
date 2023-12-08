import React from 'react';

// Interface for invoices detail
export interface InvoiceDetail {
    id: number;
    invoice_id: number;
    product_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    unit_price: number;
}

// Interface for staff in invoices
export interface Staff {
    id: number;
    name: string;
    phone_number: string;
    email: string;
    role: number;
    created_at: string;
    updated_at: string;
}
// Interface for vouchers in invoices
export interface Voucher {
    id: number;
    voucher_code: string;
    type: string;
    amount: number;
    quantity: number;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
}
// Interface for customers in invoices
export interface Customer {
    id: number;
    name: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
}
// Interface for invoices
export interface Invoice {
    id: number;
    user_id: number;
    customer_id: number;
    table_number: number | null;
    voucher_code: string;
    note: string | null;
    total_price: number;
    discount_price: number;
    final_price: number;
    status: string;
    created_at: string;
    updated_at: string;
    invoice_details: InvoiceDetail[];
    customer: Customer | null;
    staff: Staff | null;
    voucher: Voucher | null;
}
