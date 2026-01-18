import React from 'react';
import { FileText, Download, BarChart2, PieChart, Calendar } from 'lucide-react';

const Reports: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">System Reports</h2>
                    <p className="text-slate-500">Generate and download detailed analytics</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 transition-colors font-medium">
                        <Calendar size={18} /> Last 30 Days
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors font-semibold">
                        <Download size={18} /> Export All
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: 'Water Consumption Report', type: 'Daily Log', size: '2.4 MB', icon: <BarChart2 size={24} className="text-blue-600" />, color: 'bg-blue-50' },
                    { title: 'Revenue & Billing Analysis', type: 'Financial', size: '1.8 MB', icon: <PieChart size={24} className="text-emerald-600" />, color: 'bg-emerald-50' },
                    { title: 'Complaint Resolution Stats', type: 'Operational', size: '850 KB', icon: <FileText size={24} className="text-amber-600" />, color: 'bg-amber-50' },
                    { title: 'Zone Performance Audit', type: 'Technical', size: '5.2 MB', icon: <BarChart2 size={24} className="text-purple-600" />, color: 'bg-purple-50' },
                ].map((report, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${report.color} group-hover:scale-110 transition-transform`}>
                                {report.icon}
                            </div>
                            <div className="p-2 text-slate-400 hover:bg-slate-50 rounded-full">
                                <Download size={20} />
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{report.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                            <span>{report.type}</span>
                            <span>•</span>
                            <span>{report.size}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reports;
