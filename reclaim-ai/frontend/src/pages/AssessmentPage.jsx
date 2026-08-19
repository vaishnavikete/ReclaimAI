import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, ArrowRight, Sparkles } from 'lucide-react';
import { RiskBadge } from '../components/RiskBadge';
import { useAuth } from '../context/AuthContext';

export const AssessmentPage = () => {
  const [frequency, setFrequency] = useState('2-3 times a week');
  const [avgSpend, setAvgSpend] = useState(500);
  const [primaryTrigger, setPrimaryTrigger] = useState('Stress & Financial Loss');
  const [gamblesWhenStressed, setGamblesWhenStressed] = useState(true);
  const [chasesLosses, setChasesLosses] = useState(true);
  const [workImpact, setWorkImpact] = useState(true);
  const [relationshipImpact, setRelationshipImpact] = useState(false);
  const [urgeStrength, setUrgeStrength] = useState(6);

  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleCalculate = (e) => {
    e.preventDefault();
    let score = 10;
    if (frequency === 'Daily') score += 25;
    if (frequency === '2-3 times a week') score += 15;
    if (avgSpend > 1000) score += 20;
    if (gamblesWhenStressed) score += 15;
    if (chasesLosses) score += 15;
    if (workImpact) score += 10;
    if (relationshipImpact) score += 10;
    score = Math.min(score + urgeStrength * 2, 100);

    let level = 'LOW';
    if (score > 70) level = 'HIGH';
    else if (score > 30) level = 'MEDIUM';

    const resObj = {
      score,
      level,
      plan: `Personalized 30-Day Recovery Plan: Focus on trigger awareness (${primaryTrigger}), 10-minute urge delay techniques, daily box breathing tasks, and alternative financial goal tracking.`
    };
    setResult(resObj);
    setSubmitted(true);

    setUser((prev) => ({
      ...prev,
      risk_level: level,
      risk_score: score
    }));
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <ClipboardList className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Addiction Risk Assessment</h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Answer a few confidential questions to receive a personalized recovery plan tailored to your behavioral triggers.
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleCalculate} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200">1. How frequently do you typically gamble?</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Daily', '2-3 times a week', 'Once a week', 'Rarely / Monthly'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setFrequency(opt)}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                    frequency === opt
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200">2. How much money do you typically spend per session?</label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={avgSpend}
                onChange={(e) => setAvgSpend(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <span className="text-lg font-bold text-emerald-400 font-mono w-24">₹{avgSpend}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200">3. What usually triggers your urge to gamble?</label>
            <select
              value={primaryTrigger}
              onChange={(e) => setPrimaryTrigger(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500"
            >
              <option value="Stress & Emotional Pressure">Stress & Emotional Pressure</option>
              <option value="Boredom & Free Time">Boredom & Free Time</option>
              <option value="Financial Stress & Loss Recovery">Financial Stress & Loss Recovery</option>
              <option value="Social Pressure & Peer Group">Social Pressure & Peer Group</option>
              <option value="Loneliness">Loneliness</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-300">Do you gamble when stressed or anxious?</span>
              <div className="flex space-x-2">
                <button type="button" onClick={() => setGamblesWhenStressed(true)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${gamblesWhenStressed ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400'}`}>Yes</button>
                <button type="button" onClick={() => setGamblesWhenStressed(false)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${!gamblesWhenStressed ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'}`}>No</button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-300">Do you gamble to recover previous losses?</span>
              <div className="flex space-x-2">
                <button type="button" onClick={() => setChasesLosses(true)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${chasesLosses ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400'}`}>Yes</button>
                <button type="button" onClick={() => setChasesLosses(false)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${!chasesLosses ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'}`}>No</button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-300">Has gambling affected work or studies?</span>
              <div className="flex space-x-2">
                <button type="button" onClick={() => setWorkImpact(true)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${workImpact ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400'}`}>Yes</button>
                <button type="button" onClick={() => setWorkImpact(false)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${!workImpact ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'}`}>No</button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-300">Has gambling affected relationships?</span>
              <div className="flex space-x-2">
                <button type="button" onClick={() => setRelationshipImpact(true)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${relationshipImpact ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400'}`}>Yes</button>
                <button type="button" onClick={() => setRelationshipImpact(false)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${!relationshipImpact ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'}`}>No</button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-300">Rate your current urge strength:</span>
              <span className="text-emerald-400 font-bold">{urgeStrength} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={urgeStrength}
              onChange={(e) => setUrgeStrength(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate My Recovery Plan</span>
          </button>
        </form>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 text-center shadow-2xl">
          <div className="space-y-3">
            <RiskBadge level={result.level} score={result.score} />
            <h2 className="text-2xl font-extrabold text-white">Assessment Complete</h2>
            <p className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl max-w-md mx-auto">
              <strong>Supportive Screening Indicator:</strong> This result is designed for self-guided behavioral awareness and habit coaching, not a clinical medical diagnosis.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-3">
            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Your Personalized Recovery Strategy</h4>
            <p className="text-sm text-slate-300 leading-relaxed">{result.plan}</p>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-2 mx-auto"
          >
            <span>Go to My Recovery Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};