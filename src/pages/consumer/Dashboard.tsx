import React from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  FileText,
  Droplet,
  ChevronRight,
  PlusCircle,
  MessageSquare,
  CreditCard,
  MapPin,
  Bell
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AIAssistant from '../../components/AIAssistant';

const MOCK_USAGE_DATA = [
  { month: 'Jan', usage: 12000, amount: 450 },
  { month: 'Feb', usage: 11500, amount: 420 },
  { month: 'Mar', usage: 13000, amount: 480 },
  { month: 'Apr', usage: 14500, amount: 550 },
  { month: 'May', usage: 16000, amount: 620 },
  { month: 'Jun', usage: 15500, amount: 590 },
];

const ConsumerDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">

      {/* Welcome & Alert Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2 tracking-tight">Welcome back, Resident</h2>
              <div className="flex items-center gap-2 text-blue-200 mb-8 bg-blue-900/30 w-fit px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-blue-500/30">
                <MapPin size={14} /> Zone 4 - North District
              </div>
            </div>
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          <div className="flex gap-4">
            <Link to="/consumer/water-supply" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl flex-1 transition-all group/card border border-white/5 hover:border-white/20">
              <div className="flex items-center gap-2 text-blue-200 mb-1 text-sm font-medium">
                <Clock size={16} className="group-hover/card:text-white transition-colors" /> Next Supply
              </div>
              <div className="text-2xl font-bold">05:30 PM</div>
              <div className="text-sm text-blue-200">Today • On Time</div>
            </Link>
            <Link to="/consumer/billing" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl flex-1 transition-all group/card border border-white/5 hover:border-white/20">
              <div className="flex items-center gap-2 text-blue-200 mb-1 text-sm font-medium">
                <FileText size={16} className="group-hover/card:text-white transition-colors" /> Current Bill
              </div>
              <div className="text-2xl font-bold">$42.50</div>
              <div className="text-sm text-red-200 font-medium">Due Yesterday</div>
            </Link>
          </div>
        </div>

        {/* AI Assistant Sidebar Place */}
        <div className="md:row-span-3">
          <AIAssistant />
        </div>

        {/* Quick Actions Grid */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link to="/consumer/water-supply" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all flex flex-col items-center justify-center text-center gap-2 group">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Droplet size={20} />
            </div>
            <span className="text-sm font-semibold text-slate-700">Water Supply</span>
          </Link>
          <Link to="/consumer/billing" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all flex flex-col items-center justify-center text-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <CreditCard size={20} />
            </div>
            <span className="text-sm font-semibold text-slate-700">Pay Bill</span>
          </Link>
          <Link to="/consumer/complaints" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all flex flex-col items-center justify-center text-center gap-2 group">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare size={20} />
            </div>
            <span className="text-sm font-semibold text-slate-700">Complaints</span>
          </Link>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlusCircle size={20} />
            </div>
            <span className="text-sm font-semibold text-slate-700">New Request</span>
          </div>
        </div>

        {/* Usage Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg text-slate-800">Consumption Trends</h3>
            <select className="text-sm border-none bg-slate-50 rounded-lg px-2 py-1 text-slate-600 focus:ring-0 cursor-pointer hover:bg-slate-100">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_USAGE_DATA}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="usage" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;