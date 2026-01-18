import React, { useState } from 'react';
import { Bell, CreditCard, Lock, Save, Database, Shield } from 'lucide-react';

const Settings: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">System Configuration</h2>
                    <p className="text-slate-500">Global settings and preferences</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors font-semibold">
                    <Save size={18} /> Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Notification Settings */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Bell className="text-blue-500" /> Notification Defaults
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <div>
                                <h4 className="font-semibold text-slate-800">Supply Alerts</h4>
                                <p className="text-sm text-slate-500">SMS & Email to consumers</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none ring-4 ring-blue-100 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <div>
                                <h4 className="font-semibold text-slate-800">Bill Generation</h4>
                                <p className="text-sm text-slate-500">Auto-send monthly invoices</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none ring-4 ring-blue-100 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Payment Gateway */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <CreditCard className="text-emerald-500" /> Payment Gateway
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 border border-slate-200 rounded-xl opacity-75">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-slate-800">Stripe Integration</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Connected</span>
                            </div>
                            <p className="text-slate-500 text-sm">Mode: Production</p>
                        </div>
                        <button className="w-full py-3 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50">
                            Configure API Keys
                        </button>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Shield className="text-purple-500" /> Access Control
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Admin Session Timeout (mins)</label>
                            <input type="number" defaultValue={30} className="w-full p-3 border border-slate-200 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Password Policy</label>
                            <select className="w-full p-3 border border-slate-200 rounded-xl bg-white">
                                <option>Strict (Symbols + Numbers + Caps)</option>
                                <option>Moderate</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
