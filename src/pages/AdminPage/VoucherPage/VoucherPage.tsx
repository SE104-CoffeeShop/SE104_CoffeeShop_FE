import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading/Loading';
import AdminLayout from '../../../layout/AdminLayout/AdminLayout';
import SearchVoucher from '../../../components/Admin/SearchVoucher/SearchVoucher';
import VoucherType from '../../../components/Admin/VoucherType/VoucherType';
import VoucherTable from '../../../components/Admin/VoucherTable/VoucherTable';
import { RootState } from '../../../stores/store';
import useGetVouchers, { Voucher } from '../../../hooks/useGetVouchers';
import { setVouchers } from '../../../stores/slices/voucherSlice';
import fuzzyMatch from '../../../utils/customFunction';
import useGetTotalPage from '../../../hooks/useGetTotalPage';
import Pagination from '../../../components/Admin/Pagination/Pagination';

export default function VoucherPage() {
    const { vouchersList, getVouchers, loading } = useGetVouchers();
    // State for hold search value
    const [searchValue, setSearchValue] = useState<string>('');
    const [activePage, setActivePage] = useState<number>(1);
    const { totalPage } = useGetTotalPage('/vouchers');
    // State for hold selected voucher type
    const [selectedVoucherType, setSelectedVoucherType] = useState<string>('');
    // State for filter voucher list
    const [filteredVoucherList, setFilteredVoucherList] = useState<Voucher[]>([]);
    const vouchers = useSelector((state: RootState) => state.voucher.vouchers);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setVouchers(vouchersList));
        setFilteredVoucherList(vouchersList);
    }, []);
    // filter voucher list by search value
    const filterVoucherBySearchValue = (vouchers: Voucher[], searchValue: string) => {
        return vouchers.filter((voucher) => {
            return (
                fuzzyMatch(searchValue, voucher.voucher_code) ||
                fuzzyMatch(voucher.voucher_code, searchValue) ||
                fuzzyMatch(searchValue, String(voucher.id)) ||
                fuzzyMatch(String(voucher.id), searchValue)
            );
        });
    };

    const filterVoucherByType = (vouchers: Voucher[], type: string) => {
        return vouchers.filter((voucher) => {
            return voucher.type === type;
        });
    };
    // Filter voucher list when search value, or selected voucher type change
    useEffect(() => {
        let filteredVoucherList = vouchers;
        if (searchValue) {
            filteredVoucherList = filterVoucherBySearchValue(vouchersList, searchValue);
        }
        if (selectedVoucherType) {
            filteredVoucherList = filterVoucherByType(filteredVoucherList, selectedVoucherType);
        }
        setFilteredVoucherList(filteredVoucherList);
    }, [searchValue, selectedVoucherType, vouchers, filteredVoucherList]);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {loading === true ? (
                <Loading />
            ) : (
                <AdminLayout className="flex-row items-start justify-between pb-[4.63rem] pl-[4.81rem] pr-[4.63rem] pt-[1.5rem]">
                    <div className="mr-[3.62rem] flex w-fit flex-col items-start justify-center">
                        <SearchVoucher searchValue={searchValue} setSearchValue={setSearchValue} />
                        <VoucherType
                            selectedVoucherType={selectedVoucherType}
                            setSelectedVoucherType={setSelectedVoucherType}
                        />
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                        <VoucherTable vouchers={filteredVoucherList} />
                        {totalPage > 1 && (
                            <Pagination
                                path="/vouchers"
                                totalPage={totalPage}
                                activePage={activePage}
                                setActivePage={setActivePage}
                            />
                        )}
                    </div>
                </AdminLayout>
            )}
        </>
    );
}
