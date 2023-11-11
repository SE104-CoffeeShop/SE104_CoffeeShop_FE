import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
                <Route path="/admin/billing" Component={BillingPage} />
                <Route path="/admin/customer" Component={CustomerPage} />
                <Route path="/admin/product" Component={ProductPage} />
                <Route path="/admin/profit" Component={ProfitPage} />
                <Route path="/admin/staff" Component={StaffPage} />
                <Route path="/login" Component={LoginPage} />
                <Route path="/signup" Component={SignupPage} />
                <Route path="/admin" Component={DashboardPage} />
                <Route path="*" Component={ErrorPage} />
            </Routes>
        </BrowserRouter>
    );
}
