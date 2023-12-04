import React from 'react';
import { AlertMessage } from '../../components/AlertMessage/AlertMessage';

interface LoginLayoutProps {
    children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-background-image bg-cover bg-center bg-no-repeat">
            <AlertMessage className="absolute right-0 top-0 mr-[1.25rem] mt-[1.25rem] h-[3.75rem] w-[26.5625rem]" />
            {children}
        </div>
    );
}
