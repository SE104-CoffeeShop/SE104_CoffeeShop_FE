import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { clearMessage, setError, setSuccess } from '../stores/slices/alertSlice';
import axiosClient from '../utils/axiosClient';
import { removeAllProducts } from '../stores/slices/productSlice';

export default function deleteListProductAPI(
    selectProductList: string[],
    dispatch: Dispatch<AnyAction>,
    setShowDeleteProductModal: (showDeleteProductModal: boolean) => void,
) {
    dispatch(clearMessage());
    axiosClient
        .post('/products/bulk-delete', {
            _method: 'DELETE',
            ids: selectProductList,
        })
        .then((res) => {
            if (res.status === 204) {
                dispatch(removeAllProducts(selectProductList));
                dispatch(setSuccess('Xoá hàng hoá thành công !'));
                setShowDeleteProductModal(false);
            } else {
                throw new Error('Xoá hàng hoá thất bại !');
            }
        })
        .catch((err) => {
            dispatch(setError('Xoá hàng hoá thất bại !'));
        });
}
