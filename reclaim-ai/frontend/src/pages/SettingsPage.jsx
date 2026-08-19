import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SettingsPage = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Rahul Sharma');
  const [email, setEmail] = useState(user?.email || 'demo@reclaim.ai');
  const [dailyReminders, setDailyReminders] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
          <Settings className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Account & Preference Settings</h1>
        <p className="text-sm text-slate-400">Manage profile information, notification frequencies, and AI coach options.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        {saved && (
          <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
            ✓ Settings updated successfully.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-slate-200">Daily Mindfulness Reminders</div>
              <div className="text-xs text-slate-400">Receive morning habit prompts and financial savings updates.</div>
            </div>
            <button
              type="button"
              onClick={() => setDailyReminders(!dailyReminders)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold ${dailyReminders ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              {dailyReminders ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Preference Changes</span>
          </button>
        </form>
      </div>

    </div>
  );
};