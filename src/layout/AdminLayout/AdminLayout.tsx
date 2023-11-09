import React from 'react';
import Header from '../../components/Admin/Header/Header';
import NavBar from '../../components/Admin/NavBar/NavBar';
import Loading from '../../components/Loading/Loading';

export default function AdminLayout() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-start bg-[#F2F3F3] pb-[1rem] pt-[0.88rem]">
            <Header />
            <NavBar />
            <Loading />
        </div>
    );
}
