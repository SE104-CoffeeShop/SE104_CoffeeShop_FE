import React from 'react';
import { useNavigate } from 'react-router-dom';
import notfound from '../../assets/images/not_found.png';
import { useAuth } from '../../provider/AuthProvider';

export default function NotFound() {
    const { user } = useAuth();
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center">
            <img src={notfound} alt="not found" className="h-[20rem] w-[20rem]" />
            <h1 className="mt-[2rem] font-sans text-[1.5rem] font-bold">
                404 - Không tìm thấy trang
            </h1>
            <p className="mt-[1rem] font-sans text-[1rem] font-medium">
                Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa
            </p>
            <button
                className="mt-[1rem] rounded bg-[#3758F9] px-[1.5rem] py-[0.5rem] font-sans text-[1rem] font-bold text-white hover:bg-[#1C3FB7]"
                type="button"
                onClick={() => {
                    // Check route to reddirect back
                    if (user?.role === 1) {
                        navigate('/admin');
                    } else {
                        navigate('/admin/billing');
                    }
                }}
            >
                Quay lại trang chủ
            </button>
        </div>
    );
}
