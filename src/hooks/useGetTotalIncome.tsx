import React, { useState, useEffect } from 'react';
import { Invoice } from './useGetInvoices';
import axiosClient from '../utils/axiosClient';
import useGetTotalPage from './useGetTotalPage';

export default function useGetTotalIncome() {
    // Get total income
    const [totalIncome, setTotalIncome] = useState<number>(0);
    // Get all invoices
    let total = 0;
    const { totalPage } = useGetTotalPage('/invoices?page=1');
    // Get all invoices
    const getInvoices = (page: string) => {
        total = 0;
        axiosClient.get(`/invoices?page=${page}`).then((res) => {
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
