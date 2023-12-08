import React, { useState } from 'react';
import { select } from '@material-tailwind/react';
import AdminLayout from '../../../layout/AdminLayout/AdminLayout';
import Loading from '../../../components/Loading/Loading';
import SearchBilling from '../../../components/Admin/SearchBilling/SearchBilling';
import TimeFilter from '../../../components/Admin/TimeFilter/TimeFilter';
import BillingTable from '../../../components/Admin/BillingTable/BillingTable';
import StatusFilter from '../../../components/Admin/StatusFilter.tsx/StatusFilter';

export default function BillingPage() {
    const [searchBillID, setSearchBillID] = useState<string>('');
    const [searchCustomerID, setSearchCustomerID] = useState<string>('');
    const [selectedDateRange, setSelectedDateRange] = useState<string>('allTime');
    const [selectedStatus, setSelectedStatus] = useState<string>('allStatus');
    return (
        <AdminLayout className="flex-row items-start justify-between pb-[2.5rem] pl-[4.81rem] pr-[5.94rem] pt-[1.56rem]">
            <div className="flex w-[13.625rem] flex-col items-start justify-center">
                <SearchBilling
                    searchBillID={searchBillID}
                    setSearchBillID={setSearchBillID}
                    searchCustomerID={searchCustomerID}
                    setSearchCustomerID={setSearchCustomerID}
                />
                <TimeFilter
                    selectedDateRange={selectedDateRange}
                    setSelectedDateRange={setSelectedDateRange}
                />
                <StatusFilter
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                />
            </div>
            <div className="ml-[1.56rem] flex w-full flex-col items-center justify-center">
                <BillingTable />
            </div>
        </AdminLayout>
    );
}
