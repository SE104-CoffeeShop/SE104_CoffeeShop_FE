import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearMessage, setError } from '../stores/slices/alertSlice';
import axiosClient from '../utils/axiosClient';
import { setVouchers } from '../stores/slices/voucherSlice';

export interface Voucher {
    id: number;
    voucher_code: string;
    type: 'percent' | 'direct';
    amount: number;
    quantity: number;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
}

export default function useGetVouchers() {
    // State for vouchers list
    const [vouchersList, setVouchersList] = useState<Voucher[]>([]);
    // State for loading
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    // Get vouchers list
    const getVouchers = (page: number) => {
        dispatch(clearMessage());
        setLoading(true);
        // Get vouchers list from API
        axiosClient
            .get(`/vouchers?page=${page}`)
            .then((res) => {
                if (res.status === 200) {
                    setVouchersList(res.data.data);
                    dispatch(setVouchers(res.data.data));
                } else {
                    throw new Error('Có lỗi xảy ra khi lấy danh sách voucher');
                }
            })
            .catch((error) => {
                dispatch(setError('Có lỗi xảy ra khi lấy danh sách voucher'));
            })
            .finally(() => {
                setLoading(false);
            });
    };
    // Run to get first page of vouchers list when component first mounted
    useEffect(() => {
        getVouchers(1);
    }, []);
    return { vouchersList, getVouchers, loading };
}
