import React, { useState } from 'react';
import { Smile, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const MoodPage = () => {
  const [selectedMood, setSelectedMood] = useState('Good');
  const [urgeLevel, setUrgeLevel] = useState(3);
  const [logged, setLogged] = useState(false);

  const moods = [
    { label: 'Great', emoji: '😀' },
    { label: 'Good', emoji: '🙂' },
    { label: 'Okay', emoji: '😐' },
    { label: 'Low', emoji: '😔' },
    { label: 'Angry', emoji: '😡' },
    { label: 'Anxious', emoji: '😰' },
  ];

  const chartData = [
    { day: 'Mon', moodScore: 8, urgeLevel: 2 },
    { day: 'Tue', moodScore: 4, urgeLevel: 6 },
    { day: 'Wed', moodScore: 6, urgeLevel: 3 },
    { day: 'Thu', moodScore: 3, urgeLevel: 8 },
    { day: 'Fri', moodScore: 7, urgeLevel: 2 },
    { day: 'Sat', moodScore: 8, urgeLevel: 1 },
    { day: 'Sun', moodScore: 9, urgeLevel: 1 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogged(true);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <Smile className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Daily Mood & Urge Tracker</h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Track your emotional well-being to identify emotional states that drive gambling cravings.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl max-w-2xl mx-auto">
        <h3 className="text-lg font-bold text-white text-center">How are you feeling right now?</h3>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {moods.map((m) => (
            <button
              key={m.label}
              type="button"
              onClick={() => setSelectedMood(m.label)}
              className={`p-3.5 rounded-xl border text-center transition-all ${
                selectedMood === m.label
                  ? 'bg-slate-950 border-emerald-500 shadow-md scale-105'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-2xl mb-1">{m.emoji}</div>
              <div className="text-xs font-bold text-slate-200">{m.label}</div>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-300">Associated Urge Level (1-10):</span>
            <span className="text-emerald-400 font-bold">{urgeLevel} / 10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={urgeLevel}
            onChange={(e) => setUrgeLevel(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-2"
        >
          {logged ? <CheckCircle className="w-4 h-4 text-white" /> : <Smile className="w-4 h-4" />}
          <span>{logged ? '✓ Mood Check-in Saved (+20 XP)' : 'Save Mood Entry'}</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-white">Mood vs Craving Intensity Correlation</h3>
          <div className="flex items-center space-x-4 text-xs font-semibold">
            <span className="flex items-center space-x-1.5 text-emerald-400"><span className="w-3 h-3 rounded bg-emerald-500"></span><span>Mood Score</span></span>
            <span className="flex items-center space-x-1.5 text-rose-400"><span className="w-3 h-3 rounded bg-rose-500"></span><span>Urge Level</span></span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
              <Line type="monotone" dataKey="moodScore" stroke="#10b981" strokeWidth={3} name="Mood Score" />
              <Line type="monotone" dataKey="urgeLevel" stroke="#f43f5e" strokeWidth={3} name="Urge Level" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};