import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AnalyticsPage = () => {
  const trendData = [
    { week: 'Week 1', cravings: 8, avgIntensity: 8.5, savedMoney: 1500 },
    { week: 'Week 2', cravings: 5, avgIntensity: 6.0, savedMoney: 3000 },
    { week: 'Week 3', cravings: 4, avgIntensity: 4.2, savedMoney: 4500 },
    { week: 'Week 4', cravings: 2, avgIntensity: 2.8, savedMoney: 6000 },
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-8">
      
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <BarChart3 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Recovery Analytics</h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Comprehensive progress tracking: urge reduction, saved capital, and behavioral habit consistency over time.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xl">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Weekly Recovery Highlight</span>
          <h3 className="text-xl font-bold text-white">Average Craving Intensity Decreased by 28%</h3>
        </div>
        <div className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-sm">
          High Recovery Progress
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Gambling-Free Days</span>
          <div className="text-3xl font-black text-amber-400">12 Days</div>
          <div className="text-[10px] text-slate-500">100% Streak</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Money Saved</span>
          <div className="text-3xl font-black text-emerald-400">₹6,000</div>
          <div className="text-[10px] text-slate-500">Kept in bank account</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Cravings Intercepted</span>
          <div className="text-3xl font-black text-cyan-400">4 Recent Logs</div>
          <div className="text-[10px] text-slate-500">100% Intervention completed</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Habit Tasks Completed</span>
          <div className="text-3xl font-black text-indigo-400">82% Rate</div>
          <div className="text-[10px] text-slate-500">480 Total XP</div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white">Monthly Craving Intensity Reduction Trend</h3>
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
              <Area type="monotone" dataKey="avgIntensity" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Avg Intensity (1-10)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};