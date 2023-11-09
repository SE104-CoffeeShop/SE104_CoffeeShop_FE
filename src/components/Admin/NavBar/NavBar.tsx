import React, { useState } from 'react';

const NavBarItem = [
    {
        id: '0',
        name: 'Tổng quan',
        path: '/dashboard',
    },
    {
        id: '1',
        name: 'Hàng hoá',
        path: '/product',
    },
    {
        id: '2',
        name: 'Hóa đơn',
        path: '/billing',
    },
    {
        id: '3',
        name: 'Khách hàng',
        path: '/customer',
    },
    {
        id: '4',
        name: 'Nhân viên',
        path: '/staff',
    },
    {
        id: '5',
        name: 'Doanh thu',
        path: '/profit',
    },
];

export default function AdminLayout() {
    // State of current active nav bar item
    const [active, setActive] = useState('0');
    return (
        <div className="sticky flex h-[3.125rem] w-full flex-row items-center justify-center bg-[#3758F9] px-[16rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {NavBarItem.map((item) => (
                <div
                    key={item.id}
                    className={` ${
                        active === item.id ? 'bg-[#1C3FB7]' : ''
                    } flex h-full w-[8rem] cursor-pointer select-none flex-row items-center justify-center font-sans text-[1rem] font-bold text-white hover:bg-[#1C3FB7]`}
                    onClick={() => setActive(item.id)}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
}
