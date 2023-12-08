import React, { useState } from 'react';
import useGetTotalIncome from '../../../hooks/useGetTotalIncome';
import TotalIncome from '../TotalIncome/TotalIncome';

export default function BillingTable() {
    const totalIncome = useGetTotalIncome();
    return (
        <div className="flex w-full flex-col items-center justify-center">
            {/** Header */}
            <div className="flex h-fit w-full flex-row items-center justify-between">
                <h1 className="font-sans text-[1.5rem] font-bold">Hoá đơn</h1>
                <TotalIncome totalIncome={totalIncome} />
            </div>
        </div>
    );
}
