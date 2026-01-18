import React, { useState } from 'react';
import { Search, MapPin, User, FileText, Upload, Save, Droplet } from 'lucide-react';

const ConsumerManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock user list
    const [users, setUsers] = useState([
        { id: '8829-192-X', name: 'John Doe', address: '12 Box Street, Zone 4', meterId: 'M-4921', lastReading: 14500, status: 'Active' },
        { id: '8829-193-Y', name: 'Sarah Smith', address: '14 Elm Road, Zone 4', meterId: 'M-4922', lastReading: 13200, status: 'Active' },
        { id: '8829-194-Z', name: 'Mike Johnson', address: '8 Pine Lane, Zone 4', meterId: 'M-4923', lastReading: 11000, status: 'Disconnected' },
    ]);

    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [newReading, setNewReading] = useState('');

    const handleUpdateReading = (userId: string) => {
        // Mock update
        const updatedUsers = users.map(u =>
            u.id === userId ? { ...u, lastReading: parseInt(newReading) || u.lastReading } : u
        );
        setUsers(updatedUsers);
        setNewReading('');
        alert('Meter reading updated successfully and bill generated.');
    };

    const filteredUsers = searchTerm
        ? users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.id.includes(searchTerm))
        : users;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Consumer Records</h2>
                    <p className="text-slate-500">Manage connections and enter meter readings</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search consumer by Name or ID..."
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User List */}
                <div className="lg:col-span-2 space-y-4">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
                            className={`p-6 rounded-xl border cursor-pointer transition-all ${selectedUser?.id === user.id
                                    ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-300'
                                    : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-md'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono bg-slate-100 px-2 py-1 rounded text-xs font-semibold text-slate-600">#{user.id}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {user.status}
                                    </span>
                                </div>
                                <span className="text-xs text-slate-400 font-medium">Meter: {user.meterId}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <User size={18} className="text-blue-500" /> {user.name}
                            </h3>
                            <p className="text-slate-500 text-sm flex items-center gap-2 mt-1">
                                <MapPin size={14} /> {user.address}
                            </p>
                            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                                <div className="text-sm">
                                    <span className="text-slate-400">Last Reading:</span>
                                    <span className="font-semibold text-slate-700 ml-2">{user.lastReading.toLocaleString()} L</span>
                                </div>
                                <div className="text-sm text-blue-600 font-medium hover:underline">View Details</div>
                            </div>
                        </div>
                    ))}
                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12 text-slate-400">
                            No consumers found matching "{searchTerm}"
                        </div>
                    )}
                </div>

                {/* Meter Entry Panel */}
                <div className="lg:col-span-1">
                    {selectedUser ? (
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Droplet className="text-blue-600" /> Meter Entry
                            </h3>

                            <div className="space-y-6">
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <p className="text-sm text-slate-500 mb-1">Consumer</p>
                                    <p className="font-bold text-slate-800 text-lg">{selectedUser.name}</p>
                                    <p className="text-xs text-slate-400 font-mono mt-1">ID: {selectedUser.id}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Previous Reading</label>
                                    <div className="w-full p-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 font-mono">
                                        {selectedUser.lastReading}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Current Reading</label>
                                    <input
                                        type="number"
                                        placeholder="Enter value..."
                                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-mono text-lg"
                                        value={newReading}
                                        onChange={(e) => setNewReading(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                                    <input type="date" className="w-full p-3 border border-slate-200 rounded-lg text-slate-600" defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={() => handleUpdateReading(selectedUser.id)}
                                        disabled={!newReading}
                                        className="w-full py-3 bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Save size={18} /> Update & Bill
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center text-slate-400 h-64 flex flex-col items-center justify-center">
                            <FileText size={48} className="mb-4 opacity-50" />
                            <p>Select a consumer to enter meter reading</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConsumerManagement;
