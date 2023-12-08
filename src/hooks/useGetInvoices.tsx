import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setInvoices } from '../stores/slices/invoiceSlice';
import { clearMessage, setError } from '../stores/slices/alertSlice';
import axiosClient from '../utils/axiosClient';
import { data } from '../components/Admin/RecentProfit/RecentProfit';

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
    email: string;
    email_verified_at: string;
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

export default function useGetInvoices(page: number) {
    const dispatch = useDispatch();
    const [invoicesList, setInvoicesList] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // Get invoices from API
    const getInvoices = () => {
        setLoading(true);
        dispatch(clearMessage());
        axiosClient
            .get(`/invoices?page=${page}`)
            .then((res) => {
                if (res.status === 200) {
                    const data: Invoice[] = [...res.data.data];
                    setInvoicesList(data);
                    dispatch(setInvoices(data));
                } else {
                    throw new Error('Có lỗi xảy ra khi lấy dữ liệu hóa đơn');
                }
            })
            .catch((error) => {
                dispatch(setError('Có lỗi xảy ra khi lấy dữ liệu hóa đơn'));
            })
            .finally(() => {
                setLoading(false);
            });
    };
    // Get invoices from API, delay 0.5s to show loading
    useEffect(() => {
        const timeout = setTimeout(() => {
            getInvoices();
        }, 500);
        return () => clearTimeout(timeout);
    }, [page]);
    return { invoicesList, loading, getInvoices };
}
