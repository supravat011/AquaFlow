import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BarChart2, Shield, Settings, Map, FileText, Activity, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_REVENUE_DATA = [
    { month: 'Jul', revenue: 45000 },
    { month: 'Aug', revenue: 52000 },
    { month: 'Sep', revenue: 49000 },
    { month: 'Oct', revenue: 58000 },
    { month: 'Nov', revenue: 62000 },
    { month: 'Dec', revenue: 68000 },
];

const AdminDashboard: React.FC = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">System Overview</h2>
                <p className="text-slate-500">Monitor system performance and administrative tasks</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                            <Users size={24} />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">2,450</h3>
                        <p className="text-sm text-slate-500">Total Consumers</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                            <Activity size={24} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-full">98.5%</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">Operational</h3>
                        <p className="text-sm text-slate-500">System Uptime</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                            <BarChart2 size={24} />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+8%</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">$68.4k</h3>
                        <p className="text-sm text-slate-500">Monthly Revenue</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-red-50 rounded-xl text-red-600">
                            <AlertTriangle size={24} />
                        </div>
                        <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">Critical</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">2 Zones</h3>
                        <p className="text-sm text-slate-500">Require Maintenance</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue Analytics</h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={MOCK_REVENUE_DATA}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <Link to="/admin/users" className="block bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600 group-hover:scale-110 transition-transform">
                                <Users size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800">User Management</h4>
                                <p className="text-xs text-slate-500">Manage roles & access</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/admin/zones" className="block bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="bg-amber-50 p-3 rounded-lg text-amber-600 group-hover:scale-110 transition-transform">
                                <Map size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800">Zone Configuration</h4>
                                <p className="text-xs text-slate-500">Setup distribution areas</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/admin/reports" className="block bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="bg-cyan-50 p-3 rounded-lg text-cyan-600 group-hover:scale-110 transition-transform">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800">System Reports</h4>
                                <p className="text-xs text-slate-500">Download detailed logs</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/admin/settings" className="block bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="bg-slate-50 p-3 rounded-lg text-slate-600 group-hover:scale-110 transition-transform">
                                <Settings size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800">Settings</h4>
                                <p className="text-xs text-slate-500">Global configurations</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
