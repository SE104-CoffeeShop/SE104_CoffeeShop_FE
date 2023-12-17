import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearMessage, setError } from '../stores/slices/alertSlice';
import axiosClient from '../utils/axiosClient';
import { setProducts } from '../stores/slices/productSlice';

export interface Product {
    id: string;
    name: string;
    image: string;
    type: string;
    unit_price: number;
    created_at: string;
    updated_at: string;
}

export default function useGetProducts() {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();

    const getProducts = async (page: number) => {
        setLoading(true);
        dispatch(clearMessage());
        try {
            const res = await axiosClient.get(`/products?page=${page}`);
            if (res.status === 200) {
                setProductsList(res.data.data);
                dispatch(setProducts(res.data.data));
            } else {
                throw new Error('Có lỗi xảy ra khi lấy dữ liệu sản phẩm');
            }
        } catch (error) {
            dispatch(setError('Có lỗi xảy ra khi lấy dữ liệu sản phẩm'));
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getProducts(1);
    }, []);

    return { productsList, loading, getProducts };
}
