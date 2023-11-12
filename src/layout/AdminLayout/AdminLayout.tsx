import React from 'react';
import Header from '../../components/Admin/Header/Header';
import NavBar from '../../components/Admin/NavBar/NavBar';

interface AdminLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export default function AdminLayout({ children, className }: AdminLayoutProps) {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-scroll bg-[#F2F3F3]">
            <Header />
            <NavBar />
            <div className={`flex h-full w-full  ${className}`}>{children}</div>
        </div>
    );
}
