import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, Flame, Zap, User, Menu, X, HeartHandshake, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, loadJudgeDemo } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleJudgeDemoClick = async () => {
    await loadJudgeDemo();
    navigate('/dashboard');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'AI Coach', path: '/ai-coach' },
    { name: 'Daily Tasks', path: '/tasks' },
    { name: 'Financial Reality', path: '/finance' },
    { name: 'Risk Analytics', path: '/risk' },
    { name: 'Awareness Stories', path: '/stories' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                ReClaim AI
              </span>
              <span className="block text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Recovery Companion
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Action Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Craving Urge Button */}
            <Link
              to="/craving"
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 font-semibold text-xs transition-all shadow-sm animate-pulse"
            >
              <Zap className="w-4 h-4 text-rose-400" />
              <span>I Have a Craving</span>
            </Link>

            {/* 1-Click Judge Demo Trigger */}
            <button
              onClick={handleJudgeDemoClick}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Judge Demo</span>
            </button>

            {/* User Streak Pill */}
            {user && (
              <Link to="/dashboard" className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-400">
                <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{user.recovery_streak}d Free</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={handleJudgeDemoClick}
              className="px-2.5 py-1 rounded bg-emerald-600 text-white text-xs font-bold"
            >
              Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/craving"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-rose-600 text-white font-bold text-sm"
          >
            <Zap className="w-4 h-4" />
            <span>I Have a Craving (Instant Intervene)</span>
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};