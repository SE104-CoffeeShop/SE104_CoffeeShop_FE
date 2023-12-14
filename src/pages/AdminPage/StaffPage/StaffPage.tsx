import React, { useState } from 'react';
import AdminLayout from '../../../layout/AdminLayout/AdminLayout';
import Loading from '../../../components/Loading/Loading';
import SearchStaff from '../../../components/Admin/SearchStaff/SearchStaff';

export default function StaffPage() {
    const [searchValue, setSearchValue] = useState<string>('');
    return (
        <AdminLayout className="flex-col items-start justify-start pl-[3.56rem] pr-[4.63rem] pt-[0.81rem]">
            <div className="flex w-full flex-row items-center justify-between">
                <h1 className="font-sans text-[1.5rem] font-bold">Nhân viên</h1>
                <SearchStaff searchValue={searchValue} setSearchValue={setSearchValue} />
                {/* Delete Button and Add New Staff */}
            </div>
            <div className="mt-[1rem] flex w-full flex-col items-center justify-start">
                {/* Table */}
                HEHEHE
            </div>
        </AdminLayout>
    );
}
