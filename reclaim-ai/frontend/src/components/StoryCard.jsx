import React from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export const StoryCard = ({ scenario, activeStage, onSelectStage }) => {
  const stages = scenario.stages;
  const current = stages[activeStage];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">{scenario.role} Perspective</span>
          <h3 className="text-xl font-bold text-white mt-0.5">{scenario.title}</h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700">
          Stage {activeStage + 1} of {stages.length}
        </span>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {stages.map((st, idx) => (
          <button
            key={idx}
            onClick={() => onSelectStage(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeStage === idx
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Stage {idx + 1}: {st.heading}
          </button>
        ))}
      </div>

      <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${current.isWarning ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
            {current.isWarning ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
          </div>
          <h4 className="text-lg font-bold text-slate-100">{current.heading}</h4>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">{current.storyText}</p>

        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-amber-300">
          <strong>Behavioral Lesson:</strong> {current.lesson}
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <button
          disabled={activeStage === 0}
          onClick={() => onSelectStage(activeStage - 1)}
          className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
        >
          Previous Stage
        </button>
        <button
          disabled={activeStage === stages.length - 1}
          onClick={() => onSelectStage(activeStage + 1)}
          className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-500 shadow-md"
        >
          <span>Next Stage</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};