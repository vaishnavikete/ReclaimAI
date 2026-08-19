import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

export const RiskBadge = ({ level = "LOW", score = 34 }) => {
  const isLow = level.toUpperCase() === "LOW";
  const isMedium = level.toUpperCase() === "MEDIUM";

  let bgClass = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
  let Icon = ShieldCheck;

  if (isMedium) {
    bgClass = "bg-amber-500/10 border-amber-500/30 text-amber-400";
    Icon = AlertTriangle;
  } else if (!isLow) {
    bgClass = "bg-rose-500/10 border-rose-500/30 text-rose-400";
    Icon = AlertOctagon;
  }

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${bgClass}`}>
      <Icon className="w-4 h-4" />
      <span>{score}/100 — {level.toUpperCase()} RISK</span>
    </div>
  );
};