import React, { useEffect } from 'react';

interface CheckBoxAgreeProps {
    checked: boolean;
    onChecked: (checked: boolean) => void;
}

export default function CheckBoxAgree({ checked, onChecked }: CheckBoxAgreeProps) {
    return (
        <div className="inline-flex items-center">
            <label
                className="relative flex cursor-pointer items-center rounded-full"
                htmlFor="ripple-on"
                data-ripple-dark="true"
            >
                <input
                    id="ripple-on"
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                        onChecked(!checked);
                    }}
                    onClick={() => {
                        onChecked(!checked);
                    }}
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-[0.375rem] border border-blue-gray-200 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#3758F9] checked:bg-[#3758F9] checked:before:bg-[#3758F9] hover:before:opacity-10"
                />
                <div className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </label>
            <label
                className="ml-[0.62rem] cursor-pointer select-none font-sans font-medium"
                htmlFor="ripple-on"
            >
                Tôi đã đọc{' '}
                <span className="font-sans font-bold text-[#005B6F]">
                    điều khoản và điều kiện sử dụng.
                </span>
            </label>
        </div>
    );
}