import React, { useState } from 'react';
import { MessageSquare, Plus, Search, Filter, AlertCircle, CheckCircle, Clock, ChevronRight, Upload } from 'lucide-react';
import { Complaint } from '../../types';

const Complaints: React.FC = () => {
    const [complaints, setComplaints] = useState<Complaint[]>([
        { id: 'CMP-2024-001', category: 'Low Pressure', description: 'Water pressure is very low in the mornings.', status: 'In Progress', date: '2024-05-10' },
        { id: 'CMP-2024-002', category: 'No Water', description: 'No water supply since yesterday evening.', status: 'Resolved', date: '2024-04-22' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newComplaint, setNewComplaint] = useState({ category: '', description: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const complaint: Complaint = {
            id: `CMP-${Date.now()}`,
            category: newComplaint.category,
            description: newComplaint.description,
            status: 'Open',
            date: new Date().toISOString().split('T')[0]
        };
        setComplaints([complaint, ...complaints]);
        setIsModalOpen(false);
        setNewComplaint({ category: '', description: '' });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200 icon-emerald-500';
            case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200 icon-blue-500';
            default: return 'bg-amber-100 text-amber-700 border-amber-200 icon-amber-500';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Complaints & Requests</h2>
                    <p className="text-slate-500">Report issues and track resolution status</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:bg-blue-700 transition-all font-semibold"
                >
                    <Plus size={20} /> New Complaint
                </button>
            </div>

            {/* Filters & stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                        <MessageSquare size={20} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs uppercase font-bold">Total</p>
                        <p className="text-xl font-bold text-slate-900">{complaints.length}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                        <Clock size={20} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs uppercase font-bold">Pending</p>
                        <p className="text-xl font-bold text-slate-900">{complaints.filter(c => c.status === 'Open').length}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                        <CheckCircle size={20} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs uppercase font-bold">Resolved</p>
                        <p className="text-xl font-bold text-slate-900">{complaints.filter(c => c.status === 'Resolved').length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search complaints..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium">
                        <Filter size={16} /> Filter Status
                    </button>
                </div>

                <div className="divide-y divide-slate-100">
                    {complaints.map((complaint) => (
                        <div key={complaint.id} className="p-6 hover:bg-slate-50 transition-colors group cursor-pointer">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(complaint.status).split(' ')[0]} ${getStatusColor(complaint.status).split(' ')[1]} ${getStatusColor(complaint.status).split(' ')[2]}`}>
                                            {complaint.status}
                                        </span>
                                        <span className="text-slate-400 text-xs font-mono">{complaint.id}</span>
                                        <span className="text-slate-400 text-xs">• {complaint.date}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-1">{complaint.category}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">{complaint.description}</p>
                                </div>
                                <div className="ml-4 flex items-center self-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight className="text-slate-400" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* New Complaint Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl animate-scale-in overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-lg text-slate-800">New Complaint</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                &times;
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Issue Category</label>
                                <select
                                    required
                                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                    value={newComplaint.category}
                                    onChange={(e) => setNewComplaint({ ...newComplaint, category: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    <option value="No Water">No Water Supply</option>
                                    <option value="Low Pressure">Low Pressure</option>
                                    <option value="Leakage">Pipeline Leakage</option>
                                    <option value="Water Quality">Bad Water Quality</option>
                                    <option value="Billing">Billing Issue</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none"
                                    placeholder="Please describe the issue in detail..."
                                    value={newComplaint.description}
                                    onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Upload Photo (Optional)</label>
                                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                                    <Upload className="mx-auto text-slate-400 mb-2" size={24} />
                                    <p className="text-xs text-slate-500">Click to upload or drag and drop</p>
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                                >
                                    Submit Complaint
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Complaints;
