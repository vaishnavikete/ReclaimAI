import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

export const BreathingExercise = ({ onComplete }) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Inhale');
  const [secondsRemaining, setSecondsRemaining] = useState(600);
  const [phaseSeconds, setPhaseSeconds] = useState(4);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
        setPhaseSeconds((prev) => {
          if (prev <= 1) {
            setPhase((curr) => {
              if (curr === 'Inhale') return 'Hold';
              if (curr === 'Hold') return 'Exhale';
              if (curr === 'Exhale') return 'Rest';
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsActive(false);
      if (onComplete) onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSecondsRemaining(600);
    setPhase('Inhale');
    setPhaseSeconds(4);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-6 max-w-md mx-auto shadow-2xl">
      <div>
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Scientific 10-Minute Delay</span>
        <h3 className="text-xl font-bold text-white mt-1">Box Breathing Urge Intercept</h3>
        <p className="text-xs text-slate-400 mt-1">Urges peak in 10 minutes. Deep rhythmic breathing shifts your nervous system to calm control.</p>
      </div>

      <div className="relative flex items-center justify-center py-6">
        <div className={`w-44 h-44 rounded-full border-4 border-emerald-500/30 flex flex-col items-center justify-center transition-all duration-1000 ${
          isActive && phase === 'Inhale' ? 'scale-125 bg-emerald-500/20 border-emerald-400' : ''
        } ${isActive && phase === 'Hold' ? 'scale-125 bg-teal-500/20 border-teal-400' : ''} ${
          isActive && phase === 'Exhale' ? 'scale-100 bg-cyan-500/10 border-cyan-400' : ''
        }`}>
          <span className="text-2xl font-black text-emerald-400 uppercase tracking-wider">{phase}</span>
          <span className="text-3xl font-extrabold text-white mt-1">{phaseSeconds}s</span>
        </div>
      </div>

      <div className="text-sm font-semibold text-slate-300">
        Intervention Timer: <span className="text-emerald-400 font-mono text-base">{formatTime(secondsRemaining)}</span>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={toggleTimer}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg"
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isActive ? 'Pause' : 'Start Breathing'}</span>
        </button>
        <button onClick={resetTimer} className="p-2.5 rounded-xl bg-slate-800 text-slate-300">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};