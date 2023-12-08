import React, { useState, useEffect } from 'react';
import { Invoice } from './useGetInvoices';
import axiosClient from '../utils/axiosClient';
import useGetTotalPage from './useGetTotalPage';

export default function useGetTotalIncome() {
    // Get total income
    const [totalIncome, setTotalIncome] = useState<number>(0);
    // Get all invoices
    let invoices = [] as Invoice[];
    const { totalPage } = useGetTotalPage('/invoices');
    // Get all invoices
    const getInvoices = (page: string) => {
        axiosClient.get(`/invoices/${page}`).then((res) => {
            if (res.status === 200) {
                invoices = [...invoices, ...res.data];
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
        console.log(invoices);
        let total = 0;
        for (let i = 0; i < invoices.length; i += 1) {
            if (invoices[i].status === 'pending') total += invoices[i].total_price;
        }
        setTotalIncome(total);
    }, [invoices]);

    return totalIncome;
}
