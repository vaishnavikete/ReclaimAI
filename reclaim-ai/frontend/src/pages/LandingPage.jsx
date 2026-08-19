import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Sparkles, ArrowRight, Zap, TrendingUp, Lock, Users, Cpu } from 'lucide-react';
import { BehavioralLoop } from '../components/BehavioralLoop';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const { loadJudgeDemo } = useAuth();
  const navigate = useNavigate();

  const handleDemoClick = async () => {
    await loadJudgeDemo();
    navigate('/dashboard');
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 text-center max-w-5xl mx-auto px-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI-Powered Addiction Prevention & Recovery Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Win Back Your Life, <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Not Your Losses.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          ReClaim AI uses personalized AI coaching, behavioral insights, financial forecasting, and real-time habit replacement to help young people break the gambling cycle for good.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/assessment"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/25 transition-transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>Start My Recovery</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <button
            onClick={handleDemoClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-base shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>1-Click Judge Demo</span>
          </button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center space-x-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /><span>Zero Gambling Advice</span></div>
          <div className="flex items-center space-x-1.5"><Lock className="w-4 h-4 text-teal-400" /><span>100% Privacy-First & Opt-In</span></div>
          <div className="flex items-center space-x-1.5"><Cpu className="w-4 h-4 text-cyan-400" /><span>Configurable AI Architecture</span></div>
        </div>
      </section>

      {/* HACKATHON DIFFERENTIATOR LOOP */}
      <section className="max-w-6xl mx-auto px-4">
        <BehavioralLoop />
      </section>

      {/* PROBLEM vs SOLUTION */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">The Problem</span>
          <h3 className="text-2xl font-bold text-white">The Hidden Gambling Trap</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Gamified betting apps, fantasy sports, and online casinos target young adults with illusion-of-control loops. Chasing losses creates compounding financial stress, anxiety, and relationship strain.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">The Solution</span>
          <h3 className="text-2xl font-bold text-white">ReClaim AI Prevention Engine</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            ReClaim AI combines empathetic AI coaching, 10-minute urge delay timers, alternative financial reality modeling, and supportive trusted-circle alerts to break compulsive urges before relapse occurs.
          </p>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Core Recovery Modules</h2>
          <p className="text-slate-400 text-sm">Everything required for long-term behavioral replacement & freedom.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit"><Zap className="w-6 h-6" /></div>
            <h4 className="text-lg font-bold text-white">"I Have a Craving" Button</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Instant 10-minute scientific box breathing & distraction tasks to de-escalate acute gambling urges.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 w-fit"><TrendingUp className="w-6 h-6" /></div>
            <h4 className="text-lg font-bold text-white">Financial Reality Simulator</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Transform daily gambling spend into compounding savings goals like education, tech gear, or travel.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit"><Cpu className="w-6 h-6" /></div>
            <h4 className="text-lg font-bold text-white">ReClaim AI Coach</h4>
            <p className="text-xs text-slate-400 leading-relaxed">24/7 empathetic companion trained in non-judgmental addiction recovery tactics.</p>
          </div>
        </div>
      </section>

      {/* DEMO CALLOUT BANNER */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-900/60 to-slate-900 border border-emerald-500/30 text-center space-y-4 shadow-2xl">
          <h3 className="text-2xl font-bold text-white">Ready for live Hackathon Demonstration?</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">Click below to auto-load Rahul's 12-day recovery profile, pre-calculated ₹6,000 saved, and live craving history!</p>
          <button
            onClick={handleDemoClick}
            className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base shadow-lg transition-transform active:scale-95"
          >
            Launch Judge Demo Mode
          </button>
        </div>
      </section>

    </div>
  );
};