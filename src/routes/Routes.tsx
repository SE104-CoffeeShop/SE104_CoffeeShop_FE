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
import SignupPage from '../pages/SignupPage/SignupPage';
import DashboardPage from '../pages/AdminPage/DashboardPage/DashboardPage';
import BillingPage from '../pages/AdminPage/BillingPage/BillingPage';
import CustomerPage from '../pages/AdminPage/CustomerPage/CustomerPage';
import ProductPage from '../pages/AdminPage/ProductPage/ProductPage';
import ProfitPage from '../pages/AdminPage/ProfitPage/ProfitPage';
import StaffPage from '../pages/AdminPage/StaffPage/StaffPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" Component={LoginPage} />
                <Route path="*" Component={ErrorPage} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/admin/billing" Component={BillingPage} />
                    <Route path="/admin/customer" Component={CustomerPage} />
                    <Route path="/admin/product" Component={ProductPage} />
                    <Route path="/admin/profit" Component={ProfitPage} />
                    <Route path="/admin/staff" Component={StaffPage} />
                    <Route path="/admin" Component={DashboardPage} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
