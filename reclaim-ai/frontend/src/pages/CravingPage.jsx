import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, HeartHandshake, Bot, CheckCircle, Flame, ArrowRight, Brain } from 'lucide-react';
import { BreathingExercise } from '../components/BreathingExercise';
import { logCraving } from '../services/api';

export const CravingPage = () => {
  const [step, setStep] = useState(1);
  const [intensityBefore, setIntensityBefore] = useState(7);
  const [intensityAfter, setIntensityAfter] = useState(2);
  const [trigger, setTrigger] = useState('Late Night Boredom');
  const [distractionComplete, setDistractionComplete] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const triggers = [
    'Late Night Boredom',
    'Work / Academic Stress',
    'Chasing Financial Loss',
    'Saw Betting Ad / Content',
    'Social Pressure / Friends',
    'Loneliness or Emotional Low'
  ];

  const handleStartIntervention = () => setStep(2);

  const handleFinishIntervention = async () => {
    await logCraving(intensityBefore, intensityAfter, trigger, 'Completed 10-minute delay intervention');
    setSaved(true);
    setStep(3);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
          <Zap className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Urge Intervention Engine</h1>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Scientific 10-minute delay tactic: Urges peak and decline naturally when your brain is provided with alternative focus.
        </p>
      </div>

      {step === 1 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Step 1 of 3</span>
            <span className="text-xs text-slate-400 font-semibold">Immediate Craving Check-in</span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-200">How strong is your craving right now?</span>
              <span className="text-2xl font-black text-rose-400">{intensityBefore} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={intensityBefore}
              onChange={(e) => setIntensityBefore(Number(e.target.value))}
              className="w-full accent-rose-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
              <span>Mild Urge (1)</span>
              <span>Moderate (5)</span>
              <span>Extreme Urge (10)</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-200">What triggered this urge?</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {triggers.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTrigger(t)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                    trigger === t
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartIntervention}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-slate-950 font-black text-sm shadow-lg shadow-rose-500/25 transition-transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>Start 10-Minute De-escalation</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Step 2 of 3</span>
            <span className="text-xs text-slate-300 font-semibold">Active Urge Interception</span>
          </div>

          <BreathingExercise onComplete={() => setDistractionComplete(true)} />

          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 text-center space-y-2">
            <Flame className="w-6 h-6 text-amber-400 mx-auto" />
            <h4 className="text-base font-bold text-white">"Urges are thoughts, not commands."</h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Every 10 minutes you delay, your prefrontal cortex regains logical control over impulse. You have already won 12 days!
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-indigo-400" />
              <h4 className="text-base font-bold text-white">Grounding Distraction Exercise (5-4-3-2-1 Technique)</h4>
            </div>
            <p className="text-xs text-slate-400">Name 5 things you see around you, 4 things you can physically touch, 3 sounds you hear, 2 things you smell, and 1 positive goal for tomorrow.</p>
            <button
              onClick={() => setDistractionComplete(true)}
              className={`w-full py-2.5 rounded-xl border text-xs font-bold transition-all ${
                distractionComplete
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {distractionComplete ? '✓ Grounding Task Completed (+30 XP)' : 'Mark Distraction Task Complete'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/ai-coach')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left hover:border-emerald-500/50 flex items-center space-x-3"
            >
              <Bot className="w-6 h-6 text-emerald-400" />
              <div>
                <div className="text-xs font-bold text-white">Chat with AI Coach</div>
                <div className="text-[10px] text-slate-400">Get supportive non-judgmental guidance</div>
              </div>
            </button>

            <button
              onClick={() => navigate('/support')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left hover:border-rose-500/50 flex items-center space-x-3"
            >
              <HeartHandshake className="w-6 h-6 text-rose-400" />
              <div>
                <div className="text-xs font-bold text-white">Contact Trusted Person</div>
                <div className="text-[10px] text-slate-400">Notify mother or friend for support</div>
              </div>
            </button>
          </div>

          <button
            onClick={handleFinishIntervention}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>Proceed to Urge Re-evaluation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 text-center shadow-2xl">
          <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-white">Is your craving lower now?</h2>
            <p className="text-xs text-slate-400">Rate your current urge strength after completing the 10-minute intervention.</p>
          </div>

          <div className="space-y-3 max-w-md mx-auto">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-300">Post-Intervention Urge:</span>
              <span className="text-2xl font-black text-emerald-400">{intensityAfter} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={intensityAfter}
              onChange={(e) => setIntensityAfter(Number(e.target.value))}
              className="w-full accent-emerald-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 max-w-md mx-auto">
            Urge reduced from <strong className="text-rose-400">{intensityBefore}/10</strong> down to <strong className="text-emerald-400">{intensityAfter}/10</strong>! You successfully protected your 12-day streak.
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-2 mx-auto"
          >
            <span>Return to Dashboard (+30 XP Earned)</span>
          </button>
        </div>
      )}

    </div>
  );
};