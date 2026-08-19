import React, { useState, useEffect } from 'react';
import { Eye, Lock, Smartphone } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { fetchMonitoringSummary } from '../services/api';

export const MonitoringPage = () => {
  const [data, setData] = useState(null);
  const [optIn, setOptIn] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    const res = await fetchMonitoringSummary();
    setData(res);
  };

  if (!data) return <div className="py-20 text-center text-slate-400">Loading Privacy Monitoring Logs...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
          <Eye className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Privacy-First Behavioral Monitoring Demo</h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Simulated app & web activity logs demonstrating how ReClaim AI detects risk patterns without compromising private user data.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start space-x-3">
          <Lock className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Opt-In Consent Guarantee</h4>
            <p className="text-xs text-slate-300 max-w-xl">{data.disclaimer}</p>
          </div>
        </div>

        <button
          onClick={() => setOptIn(!optIn)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            optIn ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'bg-slate-800 text-slate-400'
          }`}
        >
          {optIn ? '✓ Monitoring Active (Opted-In)' : 'Enable Monitoring'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-semibold">Today's Betting Detections</span>
          <div className="text-3xl font-black text-amber-400">{data.today_detections} Attempts</div>
          <div className="text-[10px] text-slate-500">Intercepted by ReClaim Coach</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-semibold">Protected Hours</span>
          <div className="text-3xl font-black text-emerald-400">Late Night (11 PM - 3 AM)</div>
          <div className="text-[10px] text-slate-500">Highest urge window monitoring</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-semibold">Prevented Relapses</span>
          <div className="text-3xl font-black text-cyan-400">100% Intervention Rate</div>
          <div className="text-[10px] text-slate-500">12 Days Gambling-Free</div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white">Weekly Gambling Activity Intercepts</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.weekly_breakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
              <Bar dataKey="attempts" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Detected Attempts" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white">Recent Activity Interceptions</h3>
        <div className="space-y-3">
          {data.recent_logs.map((log, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400"><Smartphone className="w-4 h-4" /></div>
                <div>
                  <div className="font-semibold text-slate-200">{log.type}</div>
                  <div className="text-[10px] text-slate-400">{log.target} • {log.time}</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};