import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import ConsumerDashboard from './pages/consumer/Dashboard';
import WaterSupply from './pages/consumer/WaterSupply';
import Complaints from './pages/consumer/Complaints';
import Billing from './pages/consumer/Billing';
import StaffDashboard from './pages/staff/Dashboard';
import SupplyManagement from './pages/staff/SupplyManagement';
import StaffComplaints from './pages/staff/ComplaintManagement';
import ConsumerManagement from './pages/staff/ConsumerManagement';
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import ZoneManagement from './pages/admin/ZoneManagement';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />

            {/* Consumer Routes */}
            <Route path="consumer">
              <Route path="dashboard" element={<ConsumerDashboard />} />
              <Route path="water-supply" element={<WaterSupply />} />
              <Route path="complaints" element={<Complaints />} />
              <Route path="billing" element={<Billing />} />
            </Route>

            {/* Staff Routes */}
            <Route path="staff">
              <Route path="dashboard" element={<StaffDashboard />} />
              <Route path="supply-management" element={<SupplyManagement />} />
              <Route path="complaints" element={<StaffComplaints />} />
              <Route path="consumers" element={<ConsumerManagement />} />
            </Route>

            {/* Admin Routes */}
            <Route path="admin">
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="zones" element={<ZoneManagement />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;