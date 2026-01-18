import React from 'react';
import { Map, Plus, Layers, MapPin } from 'lucide-react';

const ZoneManagement: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Zone Configuration</h2>
                    <p className="text-slate-500">Manage water distribution zones and areas</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors font-semibold">
                    <Plus size={18} /> Add Zone
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Zone Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Map size={100} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <Layers size={24} />
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Active</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Zone 4: North District</h3>
                        <p className="text-slate-500 text-sm mb-6">Covering residential sectors 7-12 and industrial area A.</p>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <MapPin size={16} className="text-slate-400" />
                                <span>5 Sub-Areas</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white">W</div>
                                <span>Capacity: 50 ML/day</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">Edit Details</button>
                            <button className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">View Map</button>
                        </div>
                    </div>
                </div>

                {/* Zone Card 2 */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Map size={100} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                <Layers size={24} />
                            </div>
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">Maintenance</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Zone 5: East Wing</h3>
                        <p className="text-slate-500 text-sm mb-6">Commercial district and downtown area.</p>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <MapPin size={16} className="text-slate-400" />
                                <span>3 Sub-Areas</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white">W</div>
                                <span>Capacity: 80 ML/day</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">Edit Details</button>
                            <button className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">View Map</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZoneManagement;
