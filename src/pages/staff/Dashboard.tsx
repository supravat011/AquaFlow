import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Users, Droplets, AlertTriangle, MessageSquare, ClipboardList, PenTool } from 'lucide-react';

const StaffDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Staff Dashboard</h2>
          <p className="text-slate-500">Overview of operational metrics and tasks</p>
        </div>
        <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm border border-blue-100">
          Zone 4: North District
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Quick Stat Cards */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <Droplets size={24} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+2.5%</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">2.4 ML</h3>
            <p className="text-sm text-slate-500">Water Distributed Today</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
              <MessageSquare size={24} />
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">5 New</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">18</h3>
            <p className="text-sm text-slate-500">Pending Complaints</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
              <Users size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">84%</h3>
            <p className="text-sm text-slate-500">Bill Collection Rate</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-red-50 rounded-xl text-red-600">
              <AlertTriangle size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">3</h3>
            <p className="text-sm text-slate-500">Active Alerts</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/staff/supply-management" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all group">
          <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Settings className="text-blue-600" size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Supply Management</h3>
          <p className="text-sm text-slate-500 mb-4">Update distribution schedules, slots and maintenance alerts.</p>
          <span className="text-blue-600 font-semibold text-sm group-hover:underline">Manage Schedules &rarr;</span>
        </Link>

        <Link to="/staff/complaints" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all group">
          <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ClipboardList className="text-amber-600" size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Complaint Redressal</h3>
          <p className="text-sm text-slate-500 mb-4">View, assign and resolve consumer complaints filed in your zone.</p>
          <span className="text-blue-600 font-semibold text-sm group-hover:underline">View Complaints &rarr;</span>
        </Link>

        <Link to="/staff/consumers" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all group">
          <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <PenTool className="text-emerald-600" size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Meter Reading & Billing</h3>
          <p className="text-sm text-slate-500 mb-4">Search consumers and enter meter readings manually.</p>
          <span className="text-blue-600 font-semibold text-sm group-hover:underline">Access Records &rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default StaffDashboard;