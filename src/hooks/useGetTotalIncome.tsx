import React, { useState, useEffect } from 'react';
import { Invoice } from './useGetInvoices';
import axiosClient from '../utils/axiosClient';
import useGetTotalPage from './useGetTotalPage';
import { useAuth } from '../provider/AuthProvider';

export default function useGetTotalIncome() {
    // Get total income
    const [totalIncome, setTotalIncome] = useState<number>(0);
    // State for hold API endpoint
    let endPoint = '/invoices-pending';
    // Check user role to call the right API (admin call /invoices API, staff call /invoices-pending API)
    const { user } = useAuth();
    if (user?.role === 1) {
        endPoint = '/invoices';
    } else {
        endPoint = '/invoices-pending';
    }
    // Get all invoices
    let total = 0;
    const { totalPage } = useGetTotalPage(`${endPoint}?page=1`);
    // Get all invoices
    const getInvoices = (page: string) => {
        total = 0;
        axiosClient.get(`${endPoint}?page=${page}`).then((res) => {
            if (res.status === 200) {
                const invoices: Invoice[] = res.data.data;
                invoices.forEach((invoice) => {
                    setTotalIncome((total) => total + invoice.final_price);
                });
            }
        });
    };

    useEffect(() => {
        for (let i = 1; i <= totalPage; i += 1) {
            getInvoices(i.toString());
        }
    }, [totalPage]);

    return totalIncome;
}
