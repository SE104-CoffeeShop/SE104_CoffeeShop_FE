import React, { useState, useEffect } from 'react';
import { Invoice } from './useGetInvoices';
import axiosClient from '../utils/axiosClient';
import useGetTotalPage from './useGetTotalPage';

export default function useGetTotalIncome() {
    // Get total income
    const [totalIncome, setTotalIncome] = useState<number>(0);
    // Get all invoices
    let invoices = [] as Invoice[];
    const { totalPage } = useGetTotalPage('/invoices?page=1');
    // Get all invoices
    const getInvoices = (page: string) => {
        axiosClient.get(`/invoices/${page}`).then((res) => {
            if (res.status === 200) {
                const { data } = res;
                invoices = [...invoices, ...data];
            }
        });
    };
    // Get all invoices
    useEffect(() => {
        for (let i = 1; i <= totalPage; i += 1) {
            getInvoices(i.toString());
        }
    }, [totalPage]);
    // Get total income
    useEffect(() => {
        if (invoices.length > 0) {
            let total = 0;
            invoices.forEach((invoice) => {
                if (invoice.status === 'pending') total += invoice.total_price;
            });
            setTotalIncome(total);
        }
    }, [invoices]);

    return totalIncome;
}
