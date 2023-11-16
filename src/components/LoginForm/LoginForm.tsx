import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo_form.png';
import { ErrorAlert } from '../ErrorAlert/ErrorAlert';
import axiosClient from '../../utils/axiosClient';
import { useAuth } from '../../provider/AuthProvider';

export default function LoginForm() {
    const { setUser, setToken } = useAuth();
    const navigate = useNavigate();

    // State for each input
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(false);

    // State for show erorr popup when login fail
    const [close, setClose] = useState<boolean>(true);
    // State for errorMessage in popup
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Timeout for error
    useEffect(() => {
        const timeout = setTimeout(() => {
            setHasError(false);
        }, 5000);
        return () => clearTimeout(timeout);
    }, [email, password, hasError]);

    // Timeout for error popup
    useEffect(() => {
        const timeout = setTimeout(() => {
            setClose(true);
            setErrorMessage('');
        }, 3000);
        return () => clearTimeout(timeout);
    }, [close]);

    // Clear error message when close popup
    useEffect(() => {
        if (close === true && errorMessage !== '') setErrorMessage('');
    }, [close, errorMessage]);

    // Update value for each input
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // If not input enough field, show error
        if (email.length === 0 || password.length === 0) {
            setHasError(true);
            setClose(false);
            setErrorMessage('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        // If input enough field, call api
        axiosClient
            .post('/login', {
                email,
                password,
            })
            .then((res) => {
                setToken(res.data.token);
                setUser(res.data.user);
                localStorage.setItem('userId', res.data.user.id);
                navigate('/admin');
            })
            .catch((err) => {
                setHasError(true);
                setClose(false);
                setErrorMessage('Email hoặc mật khẩu không đúng!');
            });
    };
    return (
        <>
            {close === false && (
                <ErrorAlert
                    message={errorMessage}
                    close={close}
                    onClose={setClose}
                    className="absolute right-0 top-0 mr-[1.25rem] mt-[1.25rem] h-[3.75rem] w-[26.5625rem]"
                />
            )}
            <div className="flex h-[24.125rem] w-[26.5625rem] flex-col items-center justify-start rounded-[0.625rem] bg-white pb-[1.37rem] pl-[2.37rem] pr-[2.31rem] pt-[2rem]">
                <img src={logo} alt="logo" className="h-[2.375rem] w-[11.375rem]" />
                <form onSubmit={handleSubmit}>
                    <div className="mt-[0.81rem] flex flex-col items-start justify-start">
                        <label
                            htmlFor="email"
                            className="select-none font-sans text-[1rem] font-medium text-[#212B36]"
                        >
                            Tên đăng nhập
                        </label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="email"
                                onChange={handleChangeEmail}
                                value={email}
                                maxLength={255}
                                className={`mt-[0.63rem] h-[2.875rem] w-[21.875rem] rounded-md border-[1px] ${
                                    hasError ? 'border-red-500' : 'border-[#DFE4EA]'
                                } py-[0.75rem] pl-[1.25rem] pr-[1rem]`}
                            />
                            {hasError === true && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="#ef4444"
                                    className="absolute right-0 top-5 mr-[1rem] h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>
                    <div className="mt-[0.81rem] flex flex-col items-start justify-start">
                        <label
                            htmlFor="password"
                            className="select-none font-sans text-[1rem] font-medium text-[#212B36]"
                        >
                            Mật khẩu
                        </label>
                        <div className="relative w-full">
                            <input
                                type="password"
                                id="password"
                                maxLength={50}
                                value={password}
                                onChange={handleChangePassword}
                                className={`mt-[0.63rem] h-[2.875rem] w-[21.875rem] rounded-md border-[1px] ${
                                    hasError ? 'border-red-500' : 'border-[#DFE4EA]'
                                } py-[0.75rem] pl-[1.25rem] pr-[1rem]`}
                            />
                            {hasError === true && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="#ef4444"
                                    className="absolute right-0 top-5 mr-[1rem] h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>
                    <div className="mt-[0.44rem] flex items-center justify-end">
                        <a href="/" className="font-sans text-[1rem] text-[#3758F9]">
                            Quên mật khẩu?
                        </a>
                    </div>
                    <div className="mt-[1.62rem] flex items-center justify-center">
                        <button
                            type="submit"
                            className="h-[3rem] w-[8.6875rem] rounded-md bg-[#3758F9] font-sans text-[1rem] font-medium text-white"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
