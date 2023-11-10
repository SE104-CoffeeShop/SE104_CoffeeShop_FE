import React from 'react';
import AdminLayout from '../../../layout/AdminLayout/AdminLayout';
import Loading from '../../../components/Loading/Loading';
import TodayResult from '../../../components/Admin/TodayResult/TodayResult';

export default function DashboardPage() {
    return (
        <AdminLayout>
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
