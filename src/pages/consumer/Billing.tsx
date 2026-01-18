import React, { useState } from 'react';
import { CreditCard, Download, Clock, CheckCircle, AlertCircle, DollarSign, History } from 'lucide-react';

const Billing: React.FC = () => {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Billing & Payments</h2>
                    <p className="text-slate-500">Manage your bills and view payment history</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Current Bill Card */}
                <div className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16"></div>
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Current Bill Due</p>
                                <h3 className="text-5xl font-bold text-slate-900 tracking-tight">$42.50</h3>
                            </div>
                            <span className="px-4 py-1.5 bg-red-100 text-red-700 font-semibold rounded-full text-sm border border-red-200">
                                Unpaid
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <p className="text-slate-500 text-sm mb-1">Billing Period</p>
                                <p className="font-semibold text-slate-800">1 Dec - 31 Dec 2024</p>
                            </div>
                            <div>
                                <p className="text-slate-500 text-sm mb-1">Due Date</p>
                                <p className="font-semibold text-red-600">15 Jan 2025 (Overdue)</p>
                            </div>
                            <div>
                                <p className="text-slate-500 text-sm mb-1">Consumption</p>
                                <p className="font-semibold text-slate-800">14,500 Liters</p>
                            </div>
                            <div>
                                <p className="text-slate-500 text-sm mb-1">Bill Number</p>
                                <p className="font-semibold text-slate-800">#INV-2024-12-8829</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setIsPaymentModalOpen(true)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                            >
                                <CreditCard size={20} /> Pay Now
                            </button>
                            <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                                <Download size={20} /> Download Bill
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Payment Info */}
                <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <DollarSign className="text-indigo-400" /> Payment Methods
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg border border-white/10 cursor-pointer hover:bg-white/20 transition">
                            <div className="w-10 h-6 bg-white/20 rounded"></div>
                            <span>**** **** **** 4242</span>
                            <CheckCircle size={16} className="ml-auto text-emerald-400" />
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5 cursor-pointer hover:bg-white/20 transition text-slate-300">
                            <CreditCard size={20} />
                            <span>Add New Card</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5 cursor-pointer hover:bg-white/20 transition text-slate-300">
                            <span className="font-bold text-lg w-5 text-center">UPI</span>
                            <span>Pay via UPI</span>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-400 text-center">
                        Secure SSL Encrypted Payment
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <History className="text-slate-500" /> Payment History
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="py-4 font-semibold text-slate-600">Date</th>
                                <th className="py-4 font-semibold text-slate-600">Description</th>
                                <th className="py-4 font-semibold text-slate-600">Amount</th>
                                <th className="py-4 font-semibold text-slate-600">Status</th>
                                <th className="py-4 font-semibold text-slate-600">Reference</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                { date: '10 Dec 2024', desc: 'Water Bill - Nov', amount: '$42.50', status: 'Success', ref: 'TXN-99812' },
                                { date: '11 Nov 2024', desc: 'Water Bill - Oct', amount: '$38.20', status: 'Success', ref: 'TXN-88219' },
                                { date: '05 Oct 2024', desc: 'Water Bill - Sep', amount: '$45.00', status: 'Success', ref: 'TXN-77123' },
                            ].map((txn) => (
                                <tr key={txn.ref} className="group hover:bg-slate-50 transition">
                                    <td className="py-4 text-slate-600">{txn.date}</td>
                                    <td className="py-4 font-medium text-slate-800">{txn.desc}</td>
                                    <td className="py-4 font-medium text-slate-900">{txn.amount}</td>
                                    <td className="py-4">
                                        <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full font-medium border border-emerald-100">
                                            {txn.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-slate-400 font-mono text-sm">{txn.ref}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mock Payment Modal */}
            {isPaymentModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl transform transition-all animate-bounce-in">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <DollarSign className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Confirm Payment</h3>
                            <p className="text-slate-500">Total amount to pay</p>
                            <p className="text-3xl font-bold text-slate-900 mt-2">$42.50</p>
                        </div>
                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    alert('Payment Successful!');
                                    setIsPaymentModalOpen(false);
                                }}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition-all"
                            >
                                Pay $42.50
                            </button>
                            <button
                                onClick={() => setIsPaymentModalOpen(false)}
                                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Billing;
