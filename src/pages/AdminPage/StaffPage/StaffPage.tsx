/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../../layout/AdminLayout/AdminLayout';
import Loading from '../../../components/Loading/Loading';
import SearchStaff from '../../../components/Admin/SearchStaff/SearchStaff';
import useGetTotalPage from '../../../hooks/useGetTotalPage';
import useGetStaffs from '../../../hooks/useGetStaffs';
import { setStaff } from '../../../stores/slices/staffSlice';
import { Staff } from '../../../hooks/useGetInvoices';
import StaffTable from '../../../components/Admin/StaffTable/StaffTable';
import { RootState } from '../../../stores/store';
import DeleteStaffList from '../../../components/Admin/DeleteStaff/DeleteStaffList';
import AddStaff from '../../../components/Admin/AddStaff/AddStaff';
import fuzzyMatch from '../../../utils/customFunction';
import Pagination from '../../../components/Admin/Pagination/Pagination';

export default function StaffPage() {
    const [searchValue, setSearchValue] = useState<string>('');
    const [showDeleteStaffModal, setShowDeleteStaffModal] = useState<boolean>(false);
    const [showAddStaffModal, setShowAddStaffModal] = useState<boolean>(false);
    const { totalPage } = useGetTotalPage('/staffs');
    const [activePage, setActivePage] = useState<number>(1);
    const { loading, staffList, getStaffs } = useGetStaffs();
    const [filterStaffList, setFilterStaffList] = useState<Staff[]>([]);
    const staffs = useSelector((state: RootState) => state.staff.staff);
    const selectedStaffList = useSelector((state: RootState) => state.selectedStaff.selectedStaff);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setStaff(staffList));
        setFilterStaffList(staffList);
    }, []);
    const filterBySearchValue = (staffList: Staff[], searchValue: string) => {
        return staffList.filter((staff) => {
            return (
                fuzzyMatch(staff.name, searchValue) ||
                fuzzyMatch(searchValue, staff.name) ||
                fuzzyMatch(String(staff.id), searchValue) ||
                fuzzyMatch(searchValue, String(staff.id))
            );
        });
    };
    // Filter staff list by search value and set to filterStaffList
    useEffect(() => {
        let filteredStaffList = staffs;

        filteredStaffList = filterBySearchValue(staffs, searchValue);

        setFilterStaffList(filteredStaffList);
    }, [searchValue, staffs, filterStaffList]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <AdminLayout className="flex-col items-start justify-start pl-[3.56rem] pr-[4.63rem] pt-[0.81rem]">
                    <div className="flex w-full flex-row items-center justify-between">
                        <h1 className="font-sans text-[1.5rem] font-bold">Nhân viên</h1>
                        <div className="flex flex-row items-center justify-start">
                            <div className="flex flex-row items-center justify-between">
                                {/* Xoá hàng hoá */}
                                {/** Only render delete product button if selectedProduct is not empty */}
                                {selectedStaffList.length > 0 && (
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md bg-[#E10E0E] px-[1.5rem]
                    py-[0.75rem]"
                                        onClick={() => {
                                            setShowDeleteStaffModal(true);
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
                                            Xoá nhân viên
                                        </p>
                                    </button>
                                )}
                                {/* Thêm hàng hoá */}
                                <button
                                    type="button"
                                    className="ml-[1.25rem] inline-flex items-center rounded-md bg-[#1C3FB7]
                    px-[1.5rem] py-[0.75rem]"
                                    onClick={() => {
                                        setShowAddStaffModal(true);
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
                                <SearchStaff
                                    searchValue={searchValue}
                                    setSearchValue={setSearchValue}
                                />
                            </div>

                            {/* Delete Button and Add New Staff */}
                        </div>
                    </div>
                    <div className="mt-[1rem] flex w-full flex-col items-center justify-start">
                        {/* Table */}
                        <StaffTable staffs={filterStaffList} />
                        {totalPage > 1 && (
                            <Pagination
                                path="/staffs"
                                totalPage={totalPage}
                                activePage={activePage}
                                setActivePage={setActivePage}
                            />
                        )}
                    </div>
                    {showDeleteStaffModal && (
                        <DeleteStaffList
                            setShowDeleteStaffModal={setShowDeleteStaffModal}
                            showDeleteStaffModal={showDeleteStaffModal}
                        />
                    )}
                    {showAddStaffModal && <AddStaff setShowAddStaffModal={setShowAddStaffModal} />}
                </AdminLayout>
            )}
        </>
    );
}
