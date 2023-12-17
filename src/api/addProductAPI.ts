import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import axiosClient from '../utils/axiosClient';
import { setError, setSuccess } from '../stores/slices/alertSlice';

export default function addProductAPI(
    image: File | null,
    name: string,
    type: string,
    unitPrice: number,
    dispatch: Dispatch<AnyAction>,
    setShowAddProductModal: (showAddProductModal: boolean) => void,
) {
    axiosClient
        .post(
            '/products',
            {
                image,
                name,
                type,
                unit_price: unitPrice,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        )
        .then((res) => {
            if (res.status === 201 || res.status === 200 || res.status === 204) {
                dispatch(setSuccess('Thêm sản phẩm thành công'));
                setShowAddProductModal(false);
                // Update product list after add new product after 2s
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                throw new Error('Đã có lỗi khi thêm sản phẩm');
            }
        })
        .catch((err) => {
            dispatch(setError('Đã có lỗi khi thêm sản phẩm'));
        });
}
