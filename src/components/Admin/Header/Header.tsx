import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileButton from '../ProfileButton/ProfileButton';

export default function Header() {
    const [showProfileButton, setShowProfileButton] = useState(true);
    useEffect(() => {
        const currentPath = window.location.pathname;
        // If current path is valid then show ProfileButton else hide ProfileButton
        if (
            currentPath === '/admin' ||
            currentPath === '/admin/billing' ||
            currentPath === '/admin/product' ||
            currentPath === '/admin/profit' ||
            currentPath === '/admin/staff' ||
            currentPath === '/admin/customer'
        ) {
            setShowProfileButton(true);
        } else {
            setShowProfileButton(false);
        }
    }, []);
    return (
        <div className="sticky flex h-fit w-full flex-row items-center justify-between pb-[1rem] pl-[4.81rem] pr-[4.63rem] pt-[0.88rem]">
            <Link to="/admin">
                <h1 className="cursor-pointer select-none font-sans text-[1rem] font-bold">
                    THE COFFEESHOP
                </h1>
            </Link>
            {showProfileButton === true && <ProfileButton username="Phan Văn Thiện" />}
        </div>
    );
}
