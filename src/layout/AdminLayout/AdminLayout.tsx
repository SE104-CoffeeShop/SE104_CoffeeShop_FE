import React, { useState } from 'react';
import Header from '../../components/Admin/Header/Header';
import NavBar from '../../components/Admin/NavBar/NavBar';
import { AlertMessage } from '../../components/AlertMessage/AlertMessage';
import AccountDetail from '../../components/Admin/AccountDetail/AccountDetail';

interface AdminLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export default function AdminLayout({ children, className }: AdminLayoutProps) {
    const [showAccountModal, setShowAccountModal] = useState<boolean>(false);
    return (
        <div className="min-w-screen relative flex min-h-screen flex-col items-center justify-start bg-[#F2F3F3]">
            <Header setShowAccountModal={setShowAccountModal} />
            <NavBar />
            <AlertMessage className="absolute right-0 top-0 mr-[1.25rem] mt-[1.25rem] h-[3.75rem] w-[28.5625rem]" />
            {showAccountModal && <AccountDetail setShowAccountModal={setShowAccountModal} />}
            <div className={`flex h-full w-full ${className}`}>{children}</div>
        </div>
    );
}
