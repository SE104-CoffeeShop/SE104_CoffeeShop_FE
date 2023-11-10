import React from 'react';
import Header from '../../components/Admin/Header/Header';
import NavBar from '../../components/Admin/NavBar/NavBar';
import Loading from '../../components/Loading/Loading';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-scroll bg-[#F2F3F3]">
            <Header />
            <NavBar />
            <div className="flex h-full w-full flex-col items-center justify-start pl-[4.13rem] pr-[4.19rem] pt-[1.87rem]">
                {children}
            </div>
        </div>
    );
}
