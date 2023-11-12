import React from 'react';
import AdminLayout from '../../../layout/AdminLayout/AdminLayout';
import TodayResult from '../../../components/Admin/TodayResult/TodayResult';

export default function DashboardPage() {
    return (
        <AdminLayout className="flex-col items-center justify-start pl-[4.13rem] pr-[4.19rem] pt-[1.87rem]">
            <TodayResult
                billCompleted={3}
                billCompletedAmount={100000}
                yesterdayBillCompletedAmount={200000}
                billServing={2}
                billServingAmount={50000}
                customer={5}
                yesterdayCustomer={3}
            />
        </AdminLayout>
    );
}
