import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { setStaff } from '../stores/slices/staffSlice';
import { setError } from '../stores/slices/alertSlice';

export interface Staff {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role: number;
    created_at: string;
    updated_at: string;
}

export default function useGetStaffs() {
    const [staffList, setStaffList] = useState<Staff[]>([]);
    // State for hold loading status
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const getStaffs = (page: number) => {
        setLoading(true);
        axiosClient
            .get(`/staffs?page=${page}`)
            .then((res) => {
                if (res.status === 200) {
                    setStaffList(res.data.data);
                    dispatch(setStaff(res.data.data));
                } else {
                    throw new Error('Có lỗi xảy ra khi lấy dữ liệu nhân viên');
                }
            })
            .catch((err) => {
                dispatch(setError('Có lỗi xảy ra khi lấy dữ liệu nhân viên'));
            })
            .finally(() => {
                setLoading(false);
            });
    };
    useEffect(() => {
        getStaffs(1);
    }, []);
    return { staffList, loading, getStaffs };
}
