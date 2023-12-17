import React from 'react';
import { useDispatch } from 'react-redux';
import { Invoice } from '../../../hooks/useGetInvoices';
import { updateInvoice } from '../../../stores/slices/invoiceSlice';
import { clearMessage, setError, setSuccess } from '../../../stores/slices/alertSlice';
import axiosClient from '../../../utils/axiosClient';
import { useAuth } from '../../../provider/AuthProvider';

export interface StatusDropdownProps {
    status: string;
    invoice: Invoice;
}

export default function StatusDropdown({ status, invoice }: StatusDropdownProps) {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const handleStatusChange = () => {
        dispatch(clearMessage());
        // If status is pending, change to finish
        // If status is finish then can't change anymore
        if (status === 'pending') {
            // Call api to update invoice status
            axiosClient
                .post(`/invoices-finish/${invoice.id}`)
                .then((res) => {
                    if (res.status === 200) {
                        const updateInvoiceItem = {
                            ...invoice,
                            status: 'finish',
                        };
                        dispatch(updateInvoice(updateInvoiceItem));
                        dispatch(setSuccess('Cập nhật trạng thái thành công'));
                    } else {
                        throw new Error('Cập nhật trạng thái thất bại');
                    }
                })
                .catch((err) => {
                    dispatch(setError('Cập nhật trạng thái thất bại'));
                });
        } else if (user?.role === 1) {
            // If user is admin, can change status from finish to pending
            axiosClient
                .post(`/invoices-undo/${invoice.id}`)
                .then((res) => {
                    if (res.status === 200) {
                        const updateInvoiceItem = {
                            ...invoice,
                            status: 'pending',
                        };
                        dispatch(updateInvoice(updateInvoiceItem));
                        dispatch(setSuccess('Cập nhật trạng thái thành công'));
                    } else {
                        throw new Error('Cập nhật trạng thái thất bại');
                    }
                })
                .catch((err) => {
                    dispatch(setError('Cập nhật trạng thái thất bại'));
                });
        }
    };
    return (
        <button
            type="button"
            className={` ${
                status === 'pending' ? 'border border-black' : 'bg-[#22AD5C]'
            } flex w-full flex-row items-center justify-center rounded-[0.635rem]  px-[0.5rem] py-[0.25rem]`}
            onClick={handleStatusChange}
        >
            <p
                className={`font-sans text-[0.9375rem] font-medium ${
                    status === 'pending' ? 'text-[#111928]' : 'text-white'
                }`}
            >
                {status === 'pending' ? 'Đang chờ' : 'Đã hoàn thành'}
            </p>
        </button>
    );
}
