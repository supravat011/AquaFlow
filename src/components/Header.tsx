import React from 'react';
import { Droplets, User, ShieldCheck, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { UserRole } from '../types';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-2 rounded-lg shadow-lg group-hover:shadow-blue-200/50 transition-all duration-300">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">AquaFlow</h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Smart Water Management</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {!user ? (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100/80 rounded-full transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                  <User size={18} /> Login
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-3 bg-slate-50 pl-2 pr-4 py-1.5 rounded-full border border-slate-200/60 shadow-sm">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full ring-2 ring-white" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800 leading-none">{user.name}</span>
                    <span className="text-[10px] uppercase font-bold text-blue-600 leading-none mt-1 text-left">{user.role}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;