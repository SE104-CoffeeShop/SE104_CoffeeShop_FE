import React, { useState, useEffect } from 'react';
import { Alert } from '@material-tailwind/react';

interface ErrorAlertProps {
    message: string;
    className: string;
    close: boolean;
    onClose: (close: boolean) => void;
}

// Error icon
export function ErrorIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#ffffff"
            className="h-6 w-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
        </svg>
    );
}

export function ErrorAlert({ message, close, className, onClose }: ErrorAlertProps) {
    return (
        <Alert
            open={!close}
            color="red"
            icon={<ErrorIcon />}
            onClose={() => onClose(true)}
            className={className}
        >
            {message}
        </Alert>
    );
}
