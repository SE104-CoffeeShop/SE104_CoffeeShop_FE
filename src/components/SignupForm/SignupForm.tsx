import React, { useState, useEffect } from 'react';
import { set } from 'react-hook-form';
import logo from '../../assets/images/logo_form.png';
import CheckBoxAgree from '../CheckBoxAgree/CheckBoxAgree';
import { ErrorAlert } from '../ErrorAlert/ErrorAlert';

export default function SignupForm() {
    // State for each input
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // State for show error popup when signup fail
    const [close, setClose] = useState<boolean>(true);
    // State for handle each input error
    const [phoneError, setPhoneError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    // State for errorMessage in popup
    const [errorMessage, setErrorMessage] = useState<string>('');
    // State for policy checkbox
    const [checked, setChecked] = useState<boolean>(false);
    // Timeout for error popup for each input
    useEffect(() => {
        const timeout = setTimeout(() => {
            setClose(true);
            if (phoneError) {
                setPhoneError(false);
                setErrorMessage('');
            }
            if (emailError) {
                setEmailError(false);
                setErrorMessage('');
            }
            if (passwordError) {
                setPasswordError(false);
                setErrorMessage('');
            }
        }, 3000);
        return () => clearTimeout(timeout);
    }, [close, errorMessage, phoneError, emailError, passwordError]);
    // If close popup, clear error message and error state
    useEffect(() => {
        if (close === true && errorMessage !== '') {
            setClose(true);
            setPhoneError(false);
            setEmailError(false);
            setPasswordError(false);
            setErrorMessage('');
        }
    }, [close, errorMessage]);
    // check if use is typing to disable show error style
    useEffect(() => {
        // Add event listener for each input to disable show error style
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        if (phoneInput !== null) {
            phoneInput.addEventListener('input', () => {
                setPhoneError(false);
            });
        }
        if (emailInput !== null) {
            emailInput.addEventListener('input', () => {
                setEmailError(false);
            });
        }
        if (passwordInput !== null) {
            passwordInput.addEventListener('input', () => {
                setPasswordError(false);
            });
        }
        // Remove event listener when component unmount
        return () => {
            if (phoneInput !== null) {
                phoneInput.removeEventListener('input', () => {
                    setPhoneError(false);
                });
            }
            if (emailInput !== null) {
                emailInput.removeEventListener('input', () => {
                    setEmailError(false);
                });
            }
            if (passwordInput !== null) {
                passwordInput.removeEventListener('input', () => {
                    setPasswordError(false);
                });
            }
        };
    }, [phone, email, password]);
    // TODO: Handle signup
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validatePhone(phone) || !validateEmail(email) || !validatePassword(password)) {
            return;
        }
        // If not agree policy, show error
        if (!checked) {
            setClose(false);
            setErrorMessage('Bạn chưa đồng ý với điều khoản và điều kiện');
            return;
        }
    };
    // Validate phone
    const validatePhone = (inputPhone: string) => {
        // Check if first character is 0
        const firstCharacter = inputPhone.charAt(0) === '0';
        // Check if phone is enough 10 characters
        const length = inputPhone.length === 10;
        setPhoneError(!firstCharacter || !length);
        setErrorMessage('Số điện thoại không hợp lệ');
        setClose(false);
        return firstCharacter && length;
    };
    // Validate email
    const validateEmail = (inputEmail: string) => {
        // Check if email is valid
        const emailRegex = /\S+@\S+\.\S+/;
        setEmailError(!emailRegex.test(inputEmail));
        setErrorMessage('Email không hợp lệ');
        setClose(false);
        return emailRegex.test(inputEmail);
    };
    // Validate password
    const validatePassword = (inputPassword: string) => {
        // Check if password is valid
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        setPasswordError(!passwordRegex.test(inputPassword));
        setErrorMessage('Mật khẩu không hợp lệ phải gồm 8 ký tự, ít nhất 1 chữ cái và 1 số');
        setClose(false);
        return passwordRegex.test(inputPassword);
    };

    const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const sanitizedInput = input.replace(/\D/g, ''); // Remove non-digit characters
        const truncatedInput = sanitizedInput.slice(0, 10);
        setPhone(truncatedInput);
    };
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    return (
        <>
            {close === false && (
                <ErrorAlert
                    message={errorMessage}
                    close={close}
                    onClose={setClose}
                    className="absolute right-0 top-0 mr-[1.25rem] mt-[1.25rem] h-[3.75rem] w-[30.5625rem] items-center"
                />
            )}
            <div className="ml-[29.06rem] flex h-full w-1/2 flex-col items-center justify-start bg-white pb-[15rem] pl-[11.44rem] pr-[11.44rem] pt-[10.38rem]">
                <img src={logo} alt="logo" className="h-[2.375rem] w-[11.375rem]" />
                <form onSubmit={handleSubmit}>
                    <div className="mt-[2.19rem] flex w-full flex-col items-start justify-start">
                        <label
                            htmlFor="phone"
                            className="select-none font-sans text-[1rem] font-bold"
                        >
                            Số điện thoại
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            className={`mt-[0.63rem] h-[2.5rem] w-[28.125rem] rounded-md border-[1px] ${
                                phoneError === true ? 'border-red-500' : 'border-[#DFE4EA]'
                            } py-[0.75rem] pl-[1.25rem] pr-[1rem] font-sans placeholder:text-[#9CA3AF] `}
                            maxLength={10}
                            placeholder="Nhập số điện thoại"
                            value={phone}
                            onChange={handleChangePhone}
                        />
                    </div>
                    <div className="mt-[0.81rem] flex w-full flex-col items-start justify-start">
                        <label
                            htmlFor="email"
                            className="select-none font-sans text-[1rem] font-bold"
                        >
                            Nhập email của bạn
                        </label>
                        <input
                            type="text"
                            id="email"
                            className={`mt-[0.63rem] h-[2.5rem]  w-[28.125rem] rounded-md border-[1px] ${
                                emailError === true ? 'border-red-500' : 'border-[#DFE4EA]'
                            } py-[0.75rem] pl-[1.25rem] pr-[1rem] font-sans placeholder:text-[#9CA3AF]`}
                            maxLength={255}
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={handleChangeEmail}
                        />
                    </div>
                    <div className="mt-[0.81rem] flex w-full flex-col items-start justify-start">
                        <label
                            htmlFor="password"
                            className="select-none font-sans text-[1rem] font-bold"
                        >
                            Nhập mật khẩu của bạn
                        </label>
                        <input
                            type="password"
                            id="password"
                            className={`mt-[0.63rem] h-[2.5rem] w-[28.125rem]  rounded-md border-[1px] ${
                                passwordError === true ? 'border-red-500' : 'border-[#DFE4EA]'
                            } py-[0.75rem] pl-[1.25rem] pr-[1rem] font-sans placeholder:text-[#9CA3AF]`}
                            maxLength={50}
                            placeholder="Nhập mật khẩu của bạn"
                            value={password}
                            onChange={handleChangePassword}
                        />
                    </div>
                    <div className="mt-[0.28rem] flex w-full flex-col items-start justify-start">
                        <CheckBoxAgree checked={checked} onChecked={setChecked} />
                    </div>
                    <div className="mt-[1.66rem] flex w-full flex-col items-center justify-center">
                        <button
                            type="submit"
                            className="h-[3rem] w-[9.75rem] rounded-md bg-[#3758F9] font-sans text-[1rem] font-medium text-white"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
