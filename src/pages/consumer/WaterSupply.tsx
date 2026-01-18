import React from 'react';
import { Clock, Calendar, AlertTriangle, Download, MapPin, Droplets } from 'lucide-react';
import { SupplySchedule } from '../../types';

const MOCK_SCHEDULES: SupplySchedule[] = [
    { id: '1', zone: 'Zone 4 - North District', morningSlot: '06:00 AM - 08:30 AM', eveningSlot: '05:30 PM - 07:00 PM', status: 'On Time' },
    { id: '2', zone: 'Zone 4 - South Sector', morningSlot: '06:30 AM - 09:00 AM', eveningSlot: '06:00 PM - 07:30 PM', status: 'Delayed' },
];

const WaterSupply: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Water Supply Information</h2>
                    <p className="text-slate-500">Track real-time supply schedule and area updates</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg shadow-sm hover:shadow hover:border-blue-300 transition-all font-medium text-sm">
                    <Download size={18} /> Download Schedule PDF
                </button>
            </div>

            {/* Main Status Card */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                            <MapPin size={14} /> Zone 4
                        </span>
                        <span className="bg-emerald-400/20 text-emerald-50 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium border border-emerald-400/30">
                            Supply Active
                        </span>
                    </div>
                    <h3 className="text-4xl font-bold mb-2">06:00 AM - 08:30 AM</h3>
                    <p className="text-blue-100 text-lg">Morning Supply • Currently Flowing</p>

                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <div className="text-blue-200 text-sm mb-1">Pressure</div>
                            <div className="text-2xl font-bold">4.2 bar</div>
                        </div>
                        <div>
                            <div className="text-blue-200 text-sm mb-1">Quality (pH)</div>
                            <div className="text-2xl font-bold">7.2</div>
                        </div>
                        <div>
                            <div className="text-blue-200 text-sm mb-1">Turbidity</div>
                            <div className="text-2xl font-bold">0.8 NTU</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weekly Schedule */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Calendar className="text-blue-500" /> Weekly Schedule
                    </h3>
                    <div className="overflow-hidden bg-slate-50 rounded-xl border border-slate-200">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Day</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Morning</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Evening</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, idx) => (
                                    <tr key={day} className="hover:bg-white transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{day}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">06:00 - 08:30</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">17:30 - 19:00</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Normal
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Alerts & Notifications */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <AlertTriangle className="text-amber-500" /> Alerts
                        </h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                                <h4 className="font-semibold text-amber-800 mb-1">Pipeline Maintenance</h4>
                                <p className="text-sm text-amber-700">Scheduled maintenance in Sector 7 on 24th Jan. Supply may be affected between 10 AM - 2 PM.</p>
                            </div>
                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                                <h4 className="font-semibold text-blue-800 mb-1">Water Conservation</h4>
                                <p className="text-sm text-blue-700">Please reduce usage during peak hours to ensure equitable distribution.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaterSupply;
