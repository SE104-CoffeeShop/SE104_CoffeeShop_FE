import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../../layout/AdminLayout/AdminLayout';
import Loading from '../../../components/Loading/Loading';
import SearchBilling from '../../../components/Admin/SearchBilling/SearchBilling';
import TimeFilter from '../../../components/Admin/TimeFilter/TimeFilter';
import BillingTable from '../../../components/Admin/BillingTable/BillingTable';
import StatusFilter from '../../../components/Admin/StatusFilter/StatusFilter';
import useGetInvoices, { Invoice } from '../../../hooks/useGetInvoices';
import { setInvoices } from '../../../stores/slices/invoiceSlice';
import fuzzyMatch, { filterByTimeRange } from '../../../utils/customFunction';
import { RootState } from '../../../stores/store';
import { useAuth } from '../../../provider/AuthProvider';
import useGetTotalPage from '../../../hooks/useGetTotalPage';
import Pagination from '../../../components/Admin/Pagination/Pagination';

export default function BillingPage() {
    const [searchBillID, setSearchBillID] = useState<string>('');
    const [searchCustomerID, setSearchCustomerID] = useState<string>('');
    const [selectedDateRange, setSelectedDateRange] = useState<string>('allTime');
    const [selectedStatus, setSelectedStatus] = useState<string>('allStatus');
    const [activePage, setActivePage] = useState<number>(1);
    const [filterBillList, setFilterBillList] = useState<Invoice[]>([]);
    let endPoint = '/invoices-pending';
    const { invoicesList, loading } = useGetInvoices();

    const invoices = useSelector((state: RootState) => state.invoice.invoices);
    const dispatch = useDispatch();
    const { user } = useAuth();
    if (user?.role === 1) {
        endPoint = '/invoices';
    } else {
        endPoint = '/invoices-pending';
    }
    const { totalPage } = useGetTotalPage(endPoint);
    useEffect(() => {
        dispatch(setInvoices(invoicesList));
        setFilterBillList(invoices);
    }, []);
    // Check user role to render table content
    // If admin then show all invoices
    // If staff then show only invoices that in status pending
    // Filter invoices by bill id
    const filterByBillID = (invoices: Invoice[], searchBillID: string) => {
        return invoices.filter((invoice) => {
            return (
                fuzzyMatch(searchBillID, String(invoice.id)) ||
                fuzzyMatch(String(invoice.id), searchBillID)
            );
        });
    };
    // Filter invoices by customer id or customer name
    const filterByCustomerID = (invoices: Invoice[], searchCustomerID: string) => {
        return invoices.filter((invoice) => {
            if (invoice.customer) {
                return (
                    fuzzyMatch(searchCustomerID, String(invoice.customer_id)) ||
                    fuzzyMatch(String(invoice.customer_id), searchCustomerID) ||
                    fuzzyMatch(searchCustomerID, invoice.customer.name) ||
                    fuzzyMatch(invoice.customer.name, searchCustomerID)
                );
            }
            return true;
        });
    };
    // Filter invoices by date range
    const filterByDateRange = (invoices: Invoice[], selectedDateRange: string) => {
        return filterByTimeRange(invoices, selectedDateRange);
    };
    // Filter invoices by status
    const filterByStatus = (invoices: Invoice[], selectedStatus: string) => {
        return invoices.filter((invoice) => {
            if (selectedStatus === 'allStatus') return true;
            return invoice.status === selectedStatus;
        });
    };
    useEffect(() => {
        let newFilterList = invoices;
        newFilterList = filterByBillID(newFilterList, searchBillID);
        newFilterList = filterByCustomerID(newFilterList, searchCustomerID);
        newFilterList = filterByDateRange(newFilterList, selectedDateRange);
        newFilterList = filterByStatus(newFilterList, selectedStatus);
        setFilterBillList(newFilterList);
    }, [searchBillID, searchCustomerID, selectedDateRange, selectedStatus, invoices]);

    // Check user role to render table content (staff only show pending invoices and admin show all invoices)
    useEffect(() => {
        if (user?.role !== 1) {
            setFilterBillList(invoices.filter((invoice) => invoice.status === 'pending'));
        } else {
            setFilterBillList(invoices);
        }
    }, [user, invoices]);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {loading ? (
                <Loading />
            ) : (
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
                        {/** Only show status filter when user role is 1 */}
                        {user?.role === 1 && (
                            <StatusFilter
                                selectedStatus={selectedStatus}
                                setSelectedStatus={setSelectedStatus}
                            />
                        )}
                    </div>
                    <div className="ml-[1.56rem] flex w-full flex-col items-center justify-center">
                        <BillingTable invoices={filterBillList} />
                        {totalPage > 1 && (
                            <Pagination
                                path="/invoices"
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
