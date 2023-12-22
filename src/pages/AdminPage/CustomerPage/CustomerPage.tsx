/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set } from 'react-hook-form';
import AdminLayout from '../../../layout/AdminLayout/AdminLayout';
import Loading from '../../../components/Loading/Loading';
import SearchCustomer from '../../../components/Admin/SearchCustomer/SearchCustomer';
import useGetTotalPage from '../../../hooks/useGetTotalPage';
import useGetCustomers, { Customer } from '../../../hooks/useGetCustomers';
import { setCustomers } from '../../../stores/slices/customerSlice';
import fuzzyMatch from '../../../utils/customFunction';
import { RootState } from '../../../stores/store';
import CustomerTable from '../../../components/Admin/CustomerTable/CustomerTable';
import DeleteCustomerList from '../../../components/Admin/DeleteCustomer/DeleteCustomerList';
import AddCustomer from '../../../components/Admin/AddCustomer/AddCustomer';
import Pagination from '../../../components/Admin/Pagination/Pagination';

export default function CustomerPage() {
    const [searchValue, setSearchValue] = useState<string>('');
    const [showDeleteCustomerModal, setShowDeleteCustomerModal] = useState<boolean>(false);
    const [showAddCustomerModal, setShowAddCustomerModal] = useState<boolean>(false);
    const { totalPage } = useGetTotalPage('/customers');
    const { customerList, loading, getCustomers } = useGetCustomers();
    const [activePage, setActivePage] = useState<number>(1);
    const [filterCustomerList, setFilterCustomerList] = useState<Customer[]>([]);
    const dispatch = useDispatch();
    const customers = useSelector((state: RootState) => state.customer.customers);
    const selectedCustomerList = useSelector(
        (state: RootState) => state.selectedCustomer.selectedCustomer,
    );
    useEffect(() => {
        dispatch(setCustomers(customerList));
        setFilterCustomerList(customerList);
    }, []);
    const filterCustomerBySearchValue = (customerList: Customer[], searchValue: string) => {
        return customerList.filter((customer) => {
            return (
                fuzzyMatch(customer.name, searchValue) ||
                fuzzyMatch(searchValue, customer.name) ||
                fuzzyMatch(String(customer.id), searchValue) ||
                fuzzyMatch(searchValue, String(customer.id))
            );
        });
    };
    // Filter staff list when searchValue change
    useEffect(() => {
        let filteredCustomerList = customers;
        filteredCustomerList = filterCustomerBySearchValue(filteredCustomerList, searchValue);
        setFilterCustomerList(filteredCustomerList);
    }, [searchValue, customers, searchValue, filterCustomerList]);

    return (
        <>
            {loading === true ? (
                <Loading />
            ) : (
                <AdminLayout className="flex-col items-start justify-start pl-[3.56rem] pr-[4.63rem] pt-[0.81rem]">
                    <div className="flex w-full flex-row items-center justify-between">
                        <h1 className="font-sans text-[1.5rem] font-bold">Khách hàng</h1>
                        <div className="flex flex-row items-center justify-start">
                            <div className="flex flex-row items-center justify-between">
                                {/* Xoá hàng hoá */}
                                {/** Only render delete product button if selectedProduct is not empty */}
                                {selectedCustomerList.length > 0 && (
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md bg-[#E10E0E] px-[1.5rem]
                    py-[0.75rem]"
                                        onClick={() => {
                                            setShowDeleteCustomerModal(true);
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="#DFE4EA"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <p className="ml-[0.5rem] font-sans text-[1rem] font-medium text-white">
                                            Xoá khách hàng
                                        </p>
                                    </button>
                                )}
                                {/* Thêm hàng hoá */}
                                <button
                                    type="button"
                                    className="ml-[1.25rem] inline-flex items-center rounded-md bg-[#1C3FB7]
                    px-[1.5rem] py-[0.75rem]"
                                    onClick={() => {
                                        setShowAddCustomerModal(true);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="#DFE4EA"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    <p className="ml-[0.5rem] font-sans text-[1rem] font-medium text-white">
                                        Thêm mới
                                    </p>
                                </button>
                                <SearchCustomer
                                    searchValue={searchValue}
                                    setSearchValue={setSearchValue}
                                />
                            </div>

                            {/* Delete Button and Add New Staff */}
                        </div>
                    </div>
                    <div className="mt-[1rem] flex w-full flex-col items-center justify-start">
                        <CustomerTable customers={filterCustomerList} />
                        {totalPage > 1 && (
                            <Pagination
                                path="/customers"
                                totalPage={totalPage}
                                activePage={activePage}
                                setActivePage={setActivePage}
                            />
                        )}
                    </div>
                    {showDeleteCustomerModal && (
                        <DeleteCustomerList
                            setShowDeleteCustomerModal={setShowDeleteCustomerModal}
                            showDeleteCustomerModal={showDeleteCustomerModal}
                        />
                    )}
                    {showAddCustomerModal && (
                        <AddCustomer
                            setShowAddCustomerModal={setShowAddCustomerModal}
                            showAddCustomerModal={showAddCustomerModal}
                        />
                    )}
                </AdminLayout>
            )}
        </>
    );
}
