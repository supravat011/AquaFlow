import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { Droplets, ShieldCheck, Wrench, ArrowRight, Loader2 } from 'lucide-react';

const LoginPage: React.FC = () => {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = async (role: UserRole) => {
        setSelectedRole(role);
        setIsLoggingIn(true);
        try {
            await login(role);
            navigate(`/${role.toLowerCase()}/dashboard`);
        } catch (error) {
            console.error('Login failed', error);
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 to-blue-50/50">
            <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl max-w-5xl w-full border border-white/50 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-100/50 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>

                <div className="relative z-10 text-center mb-12">
                    <div className="bg-gradient-to-br from-blue-600 to-cyan-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3 group-hover:rotate-6 transition-transform duration-300">
                        <Droplets className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Welcome Back</h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        Select your portal to access the Aquaflow Water Management System.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {/* Consumer Card */}
                    <button
                        onClick={() => handleLogin(UserRole.CONSUMER)}
                        disabled={isLoggingIn}
                        className="group relative bg-white hover:bg-blue-50/50 p-8 rounded-2xl border border-slate-200 hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left"
                    >
                        <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Droplets className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Consumer</h3>
                        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                            Pay bills, check supply timings, and register complaints.
                        </p>
                        <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                            {isLoggingIn && selectedRole === UserRole.CONSUMER ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                <>Access Portal <ArrowRight size={16} className="ml-1" /></>
                            )}
                        </div>
                    </button>

                    {/* Staff Card */}
                    <button
                        onClick={() => handleLogin(UserRole.STAFF)}
                        disabled={isLoggingIn}
                        className="group relative bg-white hover:bg-indigo-50/50 p-8 rounded-2xl border border-slate-200 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left"
                    >
                        <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Wrench className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Staff</h3>
                        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                            Manage schedules, update complaints, and view records.
                        </p>
                        <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:gap-2 transition-all">
                            {isLoggingIn && selectedRole === UserRole.STAFF ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                <>Enter Workspace <ArrowRight size={16} className="ml-1" /></>
                            )}
                        </div>
                    </button>

                    {/* Admin Card */}
                    <button
                        onClick={() => handleLogin(UserRole.ADMIN)}
                        disabled={isLoggingIn}
                        className="group relative bg-white hover:bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left"
                    >
                        <div className="bg-slate-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <ShieldCheck className="h-6 w-6 text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Admin</h3>
                        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                            System configuration, user management, and analytics.
                        </p>
                        <div className="flex items-center text-slate-600 font-semibold text-sm group-hover:gap-2 transition-all">
                            {isLoggingIn && selectedRole === UserRole.ADMIN ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                <>Admin Console <ArrowRight size={16} className="ml-1" /></>
                            )}
                        </div>
                    </button>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-400 text-xs">
                        Protected by 256-bit encryption. Authorized access only.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
