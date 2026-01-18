import React, { useState } from 'react';
import { Search, Filter, CheckCircle, Clock, AlertCircle, ChevronDown, User, MapPin } from 'lucide-react';
import { Complaint } from '../../types';

const StaffComplaints: React.FC = () => {
    // Extended complaint type for staff view could imply using the same as consumer but with more context in real app
    const [complaints, setComplaints] = useState<Complaint[]>([
        { id: 'CMP-2024-001', category: 'Low Pressure', description: 'Water pressure is very low in the mornings.', status: 'In Progress', date: '2024-05-10' },
        { id: 'CMP-2024-003', category: 'Leakage', description: 'Main pipe leaking near Park Avenue.', status: 'Open', date: '2024-05-12' },
        { id: 'CMP-2024-002', category: 'No Water', description: 'No water supply since yesterday evening.', status: 'Resolved', date: '2024-04-22' },
    ]);

    const handleStatusUpdate = (id: string, newStatus: Complaint['status']) => {
        setComplaints(complaints.map(c => c.id === id ? { ...c, status: newStatus } : c));
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Complaint Redressal</h2>
                    <p className="text-slate-500">View and resolve consumer complaints</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium uppercase">Pending Actions</p>
                        <p className="text-3xl font-bold text-slate-800">{complaints.filter(c => c.status === 'Open').length}</p>
                    </div>
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg"><AlertCircle size={24} /></div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium uppercase">In Progress</p>
                        <p className="text-3xl font-bold text-slate-800">{complaints.filter(c => c.status === 'In Progress').length}</p>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Clock size={24} /></div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium uppercase">Resolved Today</p>
                        <p className="text-3xl font-bold text-slate-800">12</p>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle size={24} /></div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Search by ID, Area or Issue..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" />
                    </div>
                    <button className="px-4 py-2 border border-slate-200 rounded-lg flex items-center gap-2 text-slate-600 hover:bg-slate-50">
                        <Filter size={16} /> Filter
                    </button>
                </div>

                <div className="divide-y divide-slate-100">
                    {complaints.map((complaint) => (
                        <div key={complaint.id} className="p-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-mono text-xs text-slate-400">#{complaint.id}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${complaint.status === 'Open' ? 'bg-red-100 text-red-700' :
                                                complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-emerald-100 text-emerald-700'
                                            }`}>
                                            {complaint.status}
                                        </span>
                                        <span className="text-xs text-slate-400">{complaint.date}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-1">{complaint.category}</h3>
                                    <p className="text-slate-600 text-sm mb-3">{complaint.description}</p>

                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                        <div className="flex items-center gap-1"><User size={14} /> John Doe</div>
                                        <div className="flex items-center gap-1"><MapPin size={14} /> Zone 4, Sector 7</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {complaint.status === 'Open' && (
                                        <button
                                            onClick={() => handleStatusUpdate(complaint.id, 'In Progress')}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                                        >
                                            Start Review
                                        </button>
                                    )}
                                    {complaint.status === 'In Progress' && (
                                        <button
                                            onClick={() => handleStatusUpdate(complaint.id, 'Resolved')}
                                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
                                        >
                                            Mark Resolved
                                        </button>
                                    )}
                                    <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
                                        <ChevronDown size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StaffComplaints;
