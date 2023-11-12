import React from 'react';
import AdminLayout from '../../../layout/AdminLayout/AdminLayout';
import Loading from '../../../components/Loading/Loading';
import ProductTable from '../../../components/Admin/ProductTable/ProductTable';
import SearchProduct from '../../../components/Admin/SearchProduct/SearchProduct';
import ProductType from '../../../components/Admin/ProductType/ProductType';

export default function ProductPage() {
    return (
        <AdminLayout className="flex-row items-start justify-between pb-[4.63rem] pl-[4.81rem] pr-[4.63rem] pt-[1.5rem]">
            <div className="mr-[3.62rem] flex w-fit flex-col items-start justify-center">
                <SearchProduct />
                <ProductType />
            </div>
            <ProductTable />
        </AdminLayout>
    );
}
