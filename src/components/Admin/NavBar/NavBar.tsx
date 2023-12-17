import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../provider/AuthProvider';

const NavBarItem = [
    {
        id: '0',
        name: 'Tổng quan',
        path: '/admin',
    },
    {
        id: '1',
        name: 'Hàng hoá',
        path: '/admin/product',
    },
    {
        id: '2',
        name: 'Hóa đơn',
        path: '/admin/billing',
    },
    {
        id: '3',
        name: 'Khách hàng',
        path: '/admin/customer',
    },
    {
        id: '4',
        name: 'Nhân viên',
        path: '/admin/staff',
    },
    {
        id: '5',
        name: 'Voucher',
        path: '/admin/voucher',
    },
    {
        id: '6',
        name: 'Bán hàng',
        path: '/admin/checkout',
    },
];

export default function AdminLayout() {
    // State of current active nav bar item
    const { user } = useAuth();
    const [active, setActive] = useState('0');
    const navigate = useNavigate();
    const newNavBarItem = useRef(NavBarItem);
    // Keep track of current path to set active nav bar item accordingly
    useEffect(() => {
        const currentPath = window.location.pathname;
        const currentActive = newNavBarItem.current.find((item) => item.path === currentPath);
        // If current path is not in the list of nav bar items, set active to default else set active to current path
        if (currentActive) {
            setActive(currentActive.id);
        } else {
            setActive('0');
        }
    }, []);
    // Update nav bar item when user change role
    useEffect(() => {
        if (user?.role === 1) {
            newNavBarItem.current = NavBarItem;
        } else {
            newNavBarItem.current = NavBarItem.filter((item) => item.id === '2' || item.id === '6');
        }
    }, [user]);
    return (
        <div className="sticky flex h-[3.125rem] w-screen flex-row items-center justify-center bg-[#3758F9] px-[16rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {newNavBarItem.current.map((item) => (
                <div
                    key={item.id}
                    className={` ${
                        active === item.id ? 'bg-[#1C3FB7]' : ''
                    } flex h-full w-[8rem] cursor-pointer select-none flex-row items-center justify-center font-sans text-[1rem] font-bold text-white hover:bg-[#1C3FB7]`}
                    onClick={() => {
                        setActive(item.id);
                        navigate(item.path);
                    }}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
}
