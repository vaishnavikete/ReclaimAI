import React from 'react';
import { AlertCircle, Flame, Cpu, ShieldCheck, Activity, Award } from 'lucide-react';

export const BehavioralLoop = () => {
  const steps = [
    { title: "1. Trigger", desc: "Stress, boredom, loss", icon: AlertCircle, color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
    { title: "2. Craving", desc: "Compulsive urge", icon: Flame, color: "text-rose-400 border-rose-500/30 bg-rose-500/10" },
    { title: "3. AI Detection", desc: "Pattern recognition", icon: Cpu, color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
    { title: "4. Intervention", desc: "10-min breathing delay", icon: ShieldCheck, color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
    { title: "5. Healthy Action", desc: "Walk, call, habit task", icon: Activity, color: "text-teal-400 border-teal-500/30 bg-teal-500/10" },
    { title: "6. Progress", desc: "XP, money saved", icon: Award, color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10" },
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="text-center space-y-1">
        <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">Hackathon Differentiator</span>
        <h3 className="text-xl font-bold text-white">The ReClaim AI Recovery Loop</h3>
        <p className="text-sm text-slate-400">Instead of only blocking apps, ReClaim AI understands WHY you want to gamble and intervenes before urge becomes relapse.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-2">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="relative flex flex-col items-center text-center p-3 rounded-xl border bg-slate-950/50 hover:scale-105 transition-all">
              <div className={`p-2 rounded-lg border mb-2 ${s.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-200">{s.title}</span>
              <span className="text-[10px] text-slate-400 mt-1">{s.desc}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};