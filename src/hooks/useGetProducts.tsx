import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { clearMessage, setError } from '../stores/slices/alertSlice';
import axiosClient from '../utils/axiosClient';
import { setLoadingSuccess, setProducts } from '../stores/slices/productSlice';

export interface Product {
    id: string;
    name: string;
    image: string;
    type: string;
    unit_price: number;
    created_at: string;
    updated_at: string;
}

export default function useGetProducts(page: number) {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    // Get products from API
    const getProducts = async () => {
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
            if (error instanceof Error) dispatch(setError(error.message));
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getProducts();
    }, [page]);
    return { productsList, loading };
}
