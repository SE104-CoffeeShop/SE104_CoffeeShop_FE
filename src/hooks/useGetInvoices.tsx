import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setInvoices } from '../stores/slices/invoiceSlice';
import { clearMessage, setError } from '../stores/slices/alertSlice';
import axiosClient from '../utils/axiosClient';
import { useAuth } from '../provider/AuthProvider';

// Interface for invoices detail
export interface InvoiceDetail {
    id: number;
    invoice_id: number;
    product_id: number;
    product_name: string;
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

export default function useGetInvoices() {
    const dispatch = useDispatch();
    const [invoicesList, setInvoicesList] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useAuth();
    // const [endPoint, setEndPoint] = useState<string>('/invoices-pending');
    let endPoint = '/invoices-pending';
    if (user?.role === 1) {
        endPoint = '/invoices';
    } else {
        endPoint = '/invoices-pending';
    }
    // Get invoices from API
    const getInvoices = (page: number) => {
        setLoading(true);
        dispatch(clearMessage());
        axiosClient
            .get(`${endPoint}?page=${page}`)
            .then((res) => {
                if (res.status === 200) {
                    const invoices = [...res.data.data];
                    // Convert to array of invoices
                    setInvoicesList(invoices);
                    dispatch(setInvoices(invoices));
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
    // Get pending invoices from API
    const getPendingInvoices = (page: number) => {
        setLoading(true);
        dispatch(clearMessage());
        axiosClient
            .get(`/invoices-pending?page=${page}`)
            .then((res) => {
                if (res.status === 200) {
                    const invoices = [...res.data.data];
                    // Convert to array of invoices
                    setInvoicesList(invoices);
                    dispatch(setInvoices(invoices));
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
        if (user) getInvoices(1);
    }, [user]);
    return { invoicesList, loading, getInvoices };
}
