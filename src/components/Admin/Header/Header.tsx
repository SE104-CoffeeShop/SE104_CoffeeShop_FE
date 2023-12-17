import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileButton from '../ProfileButton/ProfileButton';
import { useAuth } from '../../../provider/AuthProvider';

export interface HeaderProps {
    setShowAccountModal?: (showAccountModal: boolean) => void;
}

export default function Header({ setShowAccountModal }: HeaderProps) {
    // State for showing ProfileButton or not
    const [showProfileButton, setShowProfileButton] = useState<boolean>(true);
    // State for holding sticky header
    const [sticky, setSticky] = useState<boolean>(false);
    // Add event listener for scroll event
    useEffect(() => {
        const handleScroll = () => {
            // If scroll down more than 50px, set sticky to true else set sticky to false
            if (window.scrollY > 50) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        // Remove event listener when component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    // Get user data from AuthProvider
    const { user } = useAuth();
    useEffect(() => {
        const currentPath = window.location.pathname;
        // If current path is valid then show ProfileButton else hide ProfileButton
        if (
            currentPath === '/admin' ||
            currentPath === '/admin/billing' ||
            currentPath === '/admin/product' ||
            currentPath === '/admin/voucher' ||
            currentPath === '/admin/staff' ||
            currentPath === '/admin/checkout' ||
            currentPath === '/admin/customer'
        ) {
            setShowProfileButton(true);
        } else {
            setShowProfileButton(false);
        }
    }, []);
    return (
        <div
            className={`${
                sticky === true ? 'sticky' : ''
            } flex h-fit w-full flex-row items-center justify-between pb-[1rem] pl-[4.81rem] pr-[4.63rem] pt-[0.88rem]`}
        >
            <Link to="/admin">
                <h1 className="cursor-pointer select-none font-sans text-[1rem] font-bold">
                    THE COFFEESHOP
                </h1>
            </Link>
            {/** Make sure got user data from AuthProvider */}
            {showProfileButton === true && user !== null && (
                <ProfileButton setShowAccountModal={setShowAccountModal} username={user?.name} />
            )}
        </div>
    );
}
