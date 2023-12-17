import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../stores/store';
import { formatCurrency } from '../../../utils/customFunction';
import { addItem, decItem, removeItem } from '../../../stores/slices/checkoutSlice';

export interface BillingItemProps {
    productID: string;
    quantity: number;
    productPrice: number;
}

export default function BillingItem({ productID, quantity, productPrice }: BillingItemProps) {
    const products = useSelector((state: RootState) => state.product.products);
    // Map productID to product name
    const productName = products.find((product) => product.id === productID)?.name;
    const dispatch = useDispatch();
    // Check if product item quantity is 0, remove it from checkout list
    useEffect(() => {
        if (quantity === 0) {
            dispatch(removeItem(productID));
        }
    }, [quantity]);
    return (
        <div
            className="my-[0.5rem] grid  h-[4.625rem] w-[30.875rem] grid-cols-4 grid-rows-1 items-center justify-between rounded-[0.625rem]
bg-white py-[0.25rem] pl-[0.5rem] pr-[0.69rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
        >
            {/** Remove Item  */}
            <button
                type="button"
                className=" flex h-[2.5rem] w-[2.5rem] flex-row items-center justify-center rounded-full bg-[#F2F3F3]"
                onClick={() => {
                    dispatch(removeItem(productID));
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </svg>
            </button>
            {/** Product Name */}
            <p className="font-sans text-[1rem] font-bold text-black">{productName}</p>
            {/** Quantity Increase and Decrease */}
            <div className="flex h-[2.5rem] w-[6.25rem] flex-row items-center justify-between rounded-full bg-[#F2F3F3]">
                <button
                    type="button"
                    onClick={() => {
                        dispatch(decItem(productID));
                    }}
                    className="flex h-[2.5rem] w-[2.5rem] flex-row items-center justify-center rounded-full bg-[#F2F3F3]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
                <p className="font-sans text-[1rem] font-bold text-black">{quantity}</p>
                <button
                    onClick={() => {
                        dispatch(
                            addItem({
                                productID,
                                quantity: 1,
                                unit_price: productPrice,
                            }),
                        );
                    }}
                    type="button"
                    className="flex h-[2.5rem] w-[2.5rem] flex-row items-center justify-center rounded-full bg-[#F2F3F3]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
            </div>
            {/** Product Price */}
            <div className="flex h-fit w-[6.625rem] flex-row items-center justify-center border-b border-[#DFE4EA]">
                <p className="font-sans text-[1rem] font-bold text-black">
                    {formatCurrency(productPrice)}
                </p>
            </div>
        </div>
    );
}
