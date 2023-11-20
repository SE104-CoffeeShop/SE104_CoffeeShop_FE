import React from 'react';
import Header from '../../components/Admin/Header/Header';

interface ErrorLayoutProps {
    children: React.ReactNode;
}
export default function ErrorLayout({ children }: ErrorLayoutProps) {
    return (
        <div className="relative flex h-screen w-full flex-col items-center justify-start overflow-scroll bg-[#F2F3F3]">
            <Header />
            <div className="flex h-full w-full flex-col items-center justify-start pl-[4.13rem] pr-[4.19rem] pt-[1.87rem]">
                {children}
            </div>
        </div>
    );
}
