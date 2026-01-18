import React, { useState } from 'react';
import { Calendar, AlertTriangle, Edit2, Save, X, Plus } from 'lucide-react';
import { SupplySchedule } from '../../types';

const MOCK_SCHEDULES: SupplySchedule[] = [
    { id: '1', zone: 'Zone 4 - North District', morningSlot: '06:00 AM - 08:30 AM', eveningSlot: '05:30 PM - 07:00 PM', status: 'On Time' },
    { id: '2', zone: 'Zone 4 - South Sector', morningSlot: '06:30 AM - 09:00 AM', eveningSlot: '06:00 PM - 07:30 PM', status: 'Delayed' },
    { id: '3', zone: 'Zone 5 - East Wing', morningSlot: '05:30 AM - 08:00 AM', eveningSlot: '05:00 PM - 06:30 PM', status: 'On Time' },
];

const SupplyManagement: React.FC = () => {
    const [schedules, setSchedules] = useState(MOCK_SCHEDULES);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<SupplySchedule>>({});

    const handleEdit = (schedule: SupplySchedule) => {
        setEditingId(schedule.id);
        setEditForm(schedule);
    };

    const handleSave = () => {
        setSchedules(schedules.map(s => s.id === editingId ? { ...s, ...editForm } as SupplySchedule : s));
        setEditingId(null);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Supply Management</h2>
                    <p className="text-slate-500">Manage water distribution schedules and zones</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors font-semibold">
                    <AlertTriangle size={18} /> Emergency Cut
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Zone Schedules</h3>
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
                        <Plus size={16} /> Add New Schedule
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-600">Zone Name</th>
                                <th className="px-6 py-4 font-semibold text-slate-600">Morning Slot</th>
                                <th className="px-6 py-4 font-semibold text-slate-600">Evening Slot</th>
                                <th className="px-6 py-4 font-semibold text-slate-600">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {schedules.map((schedule) => (
                                <tr key={schedule.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{schedule.zone}</td>

                                    <td className="px-6 py-4 text-slate-600">
                                        {editingId === schedule.id ? (
                                            <input
                                                value={editForm.morningSlot}
                                                onChange={(e) => setEditForm({ ...editForm, morningSlot: e.target.value })}
                                                className="border rounded px-2 py-1 w-full text-sm"
                                            />
                                        ) : schedule.morningSlot}
                                    </td>

                                    <td className="px-6 py-4 text-slate-600">
                                        {editingId === schedule.id ? (
                                            <input
                                                value={editForm.eveningSlot}
                                                onChange={(e) => setEditForm({ ...editForm, eveningSlot: e.target.value })}
                                                className="border rounded px-2 py-1 w-full text-sm"
                                            />
                                        ) : schedule.eveningSlot}
                                    </td>

                                    <td className="px-6 py-4">
                                        {editingId === schedule.id ? (
                                            <select
                                                value={editForm.status}
                                                onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                                                className="border rounded px-2 py-1 text-sm bg-white"
                                            >
                                                <option>On Time</option>
                                                <option>Delayed</option>
                                                <option>Maintenance</option>
                                            </select>
                                        ) : (
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${schedule.status === 'On Time' ? 'bg-green-100 text-green-700' :
                                                    schedule.status === 'Delayed' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {schedule.status}
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        {editingId === schedule.id ? (
                                            <div className="flex items-center gap-2">
                                                <button onClick={handleSave} className="p-1 text-green-600 hover:bg-green-50 rounded"><Save size={18} /></button>
                                                <button onClick={() => setEditingId(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded"><X size={18} /></button>
                                            </div>
                                        ) : (
                                            <button onClick={() => handleEdit(schedule)} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                <Edit2 size={16} /> Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SupplyManagement;
