import React from 'react';
import {
    BrowserRouter,
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter,
} from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/LoginPage/LoginPage';
import DashboardPage from '../pages/AdminPage/DashboardPage/DashboardPage';
import BillingPage from '../pages/AdminPage/BillingPage/BillingPage';
import CustomerPage from '../pages/AdminPage/CustomerPage/CustomerPage';
import ProductPage from '../pages/AdminPage/ProductPage/ProductPage';

import StaffPage from '../pages/AdminPage/StaffPage/StaffPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import { Voucher } from '../hooks/useGetInvoices';
import VoucherPage from '../pages/AdminPage/VoucherPage/VoucherPage';
import CheckoutPage from '../pages/AdminPage/CheckoutPage/CheckoutPage';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" Component={LoginPage} />
                <Route element={<ProtectedRoute />}>
                    <Route path="*" Component={ErrorPage} />
                    <Route path="/admin/billing" Component={BillingPage} />
                    <Route path="/admin/customer" Component={CustomerPage} />
                    <Route path="/admin/product" Component={ProductPage} />
                    <Route path="/admin/checkout" Component={CheckoutPage} />
                    <Route path="/admin/staff" Component={StaffPage} />
                    <Route path="/admin/voucher" Component={VoucherPage} />
                    <Route path="/admin" Component={DashboardPage} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
