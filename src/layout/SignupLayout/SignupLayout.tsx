import React from 'react';

interface SignupLayoutProps {
    children: React.ReactNode;
}

export default function SignupLayout({ children }: SignupLayoutProps) {
    return (
        <div className="relative flex h-screen w-full items-center justify-end bg-background-image bg-cover bg-center bg-no-repeat">
            {children}
        </div>
    );
}
