import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, IndianRupee, Zap, Bot, CheckSquare, HeartHandshake, ShieldCheck, Smile } from 'lucide-react';
import { RiskBadge } from '../components/RiskBadge';
import { fetchDashboardSummary } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    const res = await fetchDashboardSummary();
    setData(res);
    setLoading(false);
  };

  if (loading || !data) {
    return <div className="py-20 text-center text-slate-400 font-medium">Loading Recovery Dashboard...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Good morning, {data.user_name || user?.name || 'Alex'} 👋
            </h1>
            <RiskBadge level={data.risk_level} score={data.risk_score} />
          </div>
          <p className="text-xs text-slate-400">
            You are actively taking control of your financial and emotional well-being today.
          </p>
        </div>

        <Link
          to="/craving"
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-rose-500/25 transition-transform active:scale-95 animate-pulse"
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>I HAVE A CRAVING</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recovery Streak</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400"><Flame className="w-5 h-5 fill-amber-400" /></div>
          </div>
          <div className="text-3xl font-black text-white">{data.recovery_streak} <span className="text-sm font-normal text-slate-400">Days</span></div>
          <div className="text-[11px] text-emerald-400 font-semibold">100% Gambling-Free Streak</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimated Money Saved</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400"><IndianRupee className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-black text-emerald-400">₹{data.total_saved.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400">Kept in your savings account</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Relapse Risk</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400"><ShieldCheck className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-black text-white">{data.risk_level}</div>
          <div className="text-[11px] text-slate-400">Score: {data.risk_score}/100 (Low risk)</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Today's Tasks</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400"><CheckSquare className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-black text-white">{data.completed_tasks_count} / {data.total_tasks_count}</div>
          <div className="text-[11px] text-indigo-400 font-semibold">+60 XP Earned Today</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Bot className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">ReClaim AI Coach</h3>
                <p className="text-xs text-slate-300 max-w-md">"Trying to recover losses can lead to deeper cycles. Let's pause together for 10 minutes."</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/ai-coach')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md whitespace-nowrap"
            >
              Talk to AI Coach
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckSquare className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Today's Highlighted Task</h3>
              </div>
              <Link to="/tasks" className="text-xs font-semibold text-emerald-400 hover:underline">View All Tasks →</Link>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase">Mindfulness Habit</span>
                <h4 className="text-base font-bold text-white mt-0.5">{data.today_task}</h4>
              </div>
              <Link
                to="/tasks"
                className="px-4 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold hover:bg-indigo-600/30"
              >
                Complete
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link to="/finance" className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center hover:border-emerald-500/50 transition-colors">
              <IndianRupee className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
              <span className="text-xs font-bold text-slate-200">Financial Simulator</span>
            </Link>
            <Link to="/risk" className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center hover:border-cyan-500/50 transition-colors">
              <ShieldCheck className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
              <span className="text-xs font-bold text-slate-200">Relapse Score</span>
            </Link>
            <Link to="/mood" className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center hover:border-amber-500/50 transition-colors">
              <Smile className="w-6 h-6 text-amber-400 mx-auto mb-1" />
              <span className="text-xs font-bold text-slate-200">Mood Check-in</span>
            </Link>
            <Link to="/support" className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center hover:border-rose-500/50 transition-colors">
              <HeartHandshake className="w-6 h-6 text-rose-400 mx-auto mb-1" />
              <span className="text-xs font-bold text-slate-200">Support Center</span>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Recent Cravings Logged</h3>
              <Link to="/craving" className="text-xs font-semibold text-rose-400 hover:underline">+ Log Urge</Link>
            </div>

            <div className="space-y-3">
              {data.recent_cravings.map((c) => (
                <div key={c.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200">{c.trigger}</span>
                    <span className="text-[10px] text-slate-500">{c.created_at}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-rose-400 font-bold">Initial: {c.intensity_before}/10</span>
                    <span className="text-slate-500">→</span>
                    <span className="text-emerald-400 font-bold">Post 10-min: {c.intensity_after}/10</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-center space-y-3">
            <HeartHandshake className="w-8 h-8 text-rose-400 mx-auto" />
            <h4 className="text-base font-bold text-white">Need Immediate Help?</h4>
            <p className="text-xs text-slate-300">Access confidential helpline numbers, trusted circle alerts, and crisis guidelines.</p>
            <Link
              to="/support"
              className="inline-block px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md"
            >
              Open Support Center
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};