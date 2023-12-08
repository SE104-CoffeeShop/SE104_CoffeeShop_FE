import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { clearMessage, setError } from '../stores/slices/alertSlice';
import axiosClient from '../utils/axiosClient';
import { User } from '../provider/AuthProvider';

export default function LoginAPI(
    dispatch: Dispatch<AnyAction>,
    email: string,
    password: string,
    setToken: (token: string) => void,
    setUser: (user: User | null) => void,
    navigate: (path: string) => void,
) {
    dispatch(clearMessage());
    // If input enough field, call api
    axiosClient
        .post('/login', {
            email,
            password,
        })
        .then((res) => {
            if (res.status === 200) {
                setToken(res.data.token);
                setUser(res.data.user);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                localStorage.setItem('userId', res.data.user.id);
                navigate('/admin');
            } else {
                throw new Error('Login failed');
            }
        })
        .catch((err) => {
            dispatch(setError('Tên tài khoản hoặc mật khẩu không đúng!'));
        });
}
