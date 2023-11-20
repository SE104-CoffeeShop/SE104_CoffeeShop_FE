import React from 'react';

interface LoginLayoutProps {
    children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-background-image bg-cover bg-center bg-no-repeat">
            {children}
        </div>
    );
}
