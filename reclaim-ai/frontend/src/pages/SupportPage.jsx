import React, { useState, useEffect } from 'react';
import { HeartHandshake, PhoneCall, AlertTriangle, Users, Bell, CheckCircle2 } from 'lucide-react';
import { fetchSupportHelplines } from '../services/api';

export const SupportPage = () => {
  const [helplineData, setHelplineData] = useState(null);
  const [alertSent, setAlertSent] = useState(false);
  const [alertTarget, setAlertTarget] = useState('');

  useEffect(() => {
    loadHelplines();
  }, []);

  const loadHelplines = async () => {
    const res = await fetchSupportHelplines();
    setHelplineData(res);
  };

  const handleSendAlert = (name) => {
    setAlertTarget(name);
    setAlertSent(true);
    setTimeout(() => setAlertSent(false), 5000);
  };

  if (!helplineData) return <div className="py-20 text-center text-slate-400">Loading Support Resources...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
          <HeartHandshake className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Emergency Support Center & Trusted Circle</h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          You are never alone. Access immediate crisis helplines, peer support groups, or alert your trusted personal contacts.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start space-x-3 text-xs text-amber-300">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">{helplineData.disclaimer}</p>
      </div>

      {alertSent && (
        <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-semibold flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Alert Sent: Your trusted contact '{alertTarget}' has been notified because you requested support.</span>
        </div>
      )}

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Your Trusted Circle</h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">Strictly Opt-In Control</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-100">Sunita Sharma (Mother)</h4>
              <p className="text-xs text-slate-400">Parent • +91 98765 43210</p>
            </div>
            <button
              onClick={() => handleSendAlert('Sunita Sharma')}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/30 flex items-center space-x-1"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Notify Now</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-100">Aman Verma (Best Friend)</h4>
              <p className="text-xs text-slate-400">Friend • +91 91234 56789</p>
            </div>
            <button
              onClick={() => handleSendAlert('Aman Verma')}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/30 flex items-center space-x-1"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Notify Now</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2">
          <PhoneCall className="w-5 h-5 text-rose-400" />
          <h3 className="text-lg font-bold text-white">Professional & Crisis Helplines</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {helplineData.resources.map((res, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-bold text-[10px] uppercase">
                {res.category}
              </span>
              <h4 className="text-sm font-bold text-slate-100">{res.title}</h4>
              <div className="text-sm font-mono text-emerald-400 font-bold">{res.number || res.website}</div>
              <div className="text-[10px] text-slate-500 font-semibold">{res.available}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};