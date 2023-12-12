import React from 'react';
import { useDispatch } from 'react-redux';
import { Product } from '../../../hooks/useGetProducts';
import { formatCurrency, formatImageURL } from '../../../utils/customFunction';
import { addItem } from '../../../stores/slices/checkoutSlice';

export interface ProductGalleryProps {
    products: Product[];
}

export default function ProductGallery({ products }: ProductGalleryProps) {
    const dispatch = useDispatch();
    return (
        <div className="mt-[0.81rem] grid h-full w-full grid-cols-5 grid-rows-3 gap-2">
            {products.map((product) => (
                <div
                    onClick={() => {
                        // Add product to cart
                        dispatch(
                            addItem({
                                productID: product.id,
                                quantity: 1,
                                unit_price: product.unit_price,
                            }),
                        );
                    }}
                    key={product.id}
                    className="flex h-fit w-[8.375rem] cursor-pointer flex-col items-center justify-start overflow-hidden rounded-[0.625rem] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:bg-gray-200"
                >
                    <div className="relative flex flex-col items-center justify-center">
                        <img
                            src={formatImageURL(product.image)}
                            alt={product.name}
                            className="h-[8.80975rem] w-[8.375rem]"
                        />
                        <div className="absolute bottom-0 flex h-[1.14475rem] w-fit flex-row items-center justify-center rounded-t-[0.625rem] bg-[#D9D9D9] bg-opacity-50 px-[0.25rem]">
                            <p className="font-sans text-[1rem] font-bold text-[#1C3FB7]">
                                {formatCurrency(product.unit_price)}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center px-[0.5rem] py-[0.25rem]">
                        <p className="font-sans text-[0.75rem] font-bold text-black">
                            {product.name}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}