import { set } from 'react-hook-form';
import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { setSuccess } from '../stores/slices/alertSlice';
import axiosClient from '../utils/axiosClient';
import { removeProductItem } from '../stores/slices/productSlice';
import { clearProduct } from '../stores/slices/selectedProductSlice';

export default function deleteProductAPI(
    productCode: string,
    setShowDeleteProductModal: (showDeleteProductModal: boolean) => void,
    setShowProductDetail: (showProductDetail: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    axiosClient
        .post(`/products/${productCode}`, {
            _method: 'DELETE',
        })
        .then((res) => {
            if (res.status === 204) {
                // Update close state to show success alert and close modal
                dispatch(setSuccess('Xoá hàng hoá thành công'));
                dispatch(removeProductItem(productCode));
                dispatch(clearProduct());
                setShowDeleteProductModal(false);
                setShowProductDetail(false);
            } else {
                throw new Error('Xoá hàng hoá thất bại !');
            }
        })
        .catch((error) => {
            // Update close state to show error alert
            dispatch(setSuccess('Xoá hàng hoá thất bại !'));
            setShowDeleteProductModal(false);
        });
}
