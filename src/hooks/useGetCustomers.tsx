import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { setCustomers } from '../stores/slices/customerSlice';
import { setError } from '../stores/slices/alertSlice';

export interface Customer {
    id: number;
    name: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
}

export default function useGetCustomers() {
    // State for customer list
    const [customerList, setCustomerList] = useState<Customer[]>([]);
    // State for loading
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    // Function to get customer list
    const getCustomers = (page: number) => {
        setLoading(true);
        axiosClient
            .get(`/customers?page=${page}`)
            .then((res) => {
                if (res.status === 200) {
                    setCustomerList(res.data.data);
                    dispatch(setCustomers(res.data.data));
                } else {
                    throw new Error('Có lỗi xảy ra khi lấy dữ liệu khách hàng');
                }
            })
            .catch((error) => {
                dispatch(setError('Có lỗi xảy ra khi lấy dữ liệu khách hàng'));
            })
            .finally(() => {
                setLoading(false);
            });
    };
    useEffect(() => {
        getCustomers(1);
    }, []);
    return { customerList, loading, getCustomers };
}
