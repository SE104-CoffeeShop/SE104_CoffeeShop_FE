import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearMessage, setError } from '../stores/slices/alertSlice';
import axiosClient from '../utils/axiosClient';

export default function useGetTotalPage(path: string) {
    // State for hold items per page
    const [totalPage, setTotalPage] = useState<number>(0);
    const dispatch = useDispatch();
    const getTotalPage = async () => {
        dispatch(clearMessage());
        axiosClient
            .get(path)
            .then((res) => {
                if (res.status === 200) {
                    setTotalPage(res.data.last_page);
                } else {
                    throw new Error('Có lỗi xảy ra khi lấy dữ liệu');
                }
            })
            .catch((error) => {
                dispatch(setError('Có lỗi xảy ra khi lấy dữ liệu'));
                // Set default items per page to 1
                setTotalPage(1);
            });
    };
    useEffect(() => {
        getTotalPage();
    }, []);
    // Run only once when component mount
    return { totalPage, getTotalPage };
}
