import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { RiskBadge } from '../components/RiskBadge';
import { fetchRelapseRisk } from '../services/api';

export const RiskPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRisk();
  }, []);

  const loadRisk = async () => {
    setLoading(true);
    const res = await fetchRelapseRisk();
    setData(res);
    setLoading(false);
  };

  if (loading || !data) {
    return <div className="py-20 text-center text-slate-400">Loading Relapse Risk Analysis...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">AI Relapse Risk Visualizer</h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Continuous behavioral score mapping your current craving intensity, streak length, and protective habits.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 shadow-2xl">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Behavioral Health Indicator</span>
          <div className="text-5xl font-black text-white">{data.score} <span className="text-2xl text-slate-500 font-normal">/ 100</span></div>
          <RiskBadge level={data.level} score={data.score} />
        </div>

        <p className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl max-w-md mx-auto">
          {data.disclaimer}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg font-bold text-white">Risk Elevators (+ Points)</h3>
          </div>

          <div className="space-y-3">
            {data.risk_factors.map((rf, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">{rf.title}</span>
                <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 font-black font-mono">
                  {rf.impact}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Protective Buffers (- Points)</h3>
          </div>

          <div className="space-y-3">
            {data.protective_factors.map((pf, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">{pf.title}</span>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-black font-mono">
                  {pf.impact}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">AI Behavioral Action Recommendations</h3>
        </div>

        <ul className="space-y-3">
          {data.recommendations.map((rec, idx) => (
            <li key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};