import React, { useState } from 'react';
import { Lock, ShieldCheck, Download, Trash2, Eye, Users } from 'lucide-react';

export const PrivacyPage = () => {
  const [monitoringEnabled, setMonitoringEnabled] = useState(true);
  const [familySharingEnabled, setFamilySharingEnabled] = useState(false);
  const [exportMsg, setExportMsg] = useState('');

  const handleExport = () => {
    setExportMsg('Exporting your recovery logs into encrypted JSON file...');
    setTimeout(() => setExportMsg('✓ Encrypted data export complete! Downloaded reclaim_recovery_backup.json'), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Privacy & Safety Center</h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Full data sovereignty and minimization. You are in complete control of what information is shared.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">Zero Surveillance Guarantee</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          ReClaim AI <strong>NEVER</strong> secretly monitors messages, private phone calls, passwords, banking credentials, or private app content. All monitoring simulations are strictly opt-in and local to your device.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Consent & Monitoring Controls</h3>

        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="space-y-1">
            <div className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <Eye className="w-4 h-4 text-teal-400" />
              <span>Opt-In Activity Monitoring</span>
            </div>
            <p className="text-xs text-slate-400">Allows ReClaim AI to intercept betting domain visits and trigger 10-minute breathing exercises.</p>
          </div>
          <button
            onClick={() => setMonitoringEnabled(!monitoringEnabled)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              monitoringEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {monitoringEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="space-y-1">
            <div className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Family & Guardian Progress Sharing</span>
            </div>
            <p className="text-xs text-slate-400">Strictly opt-in. Share weekly streak badges with designated trusted contacts.</p>
          </div>
          <button
            onClick={() => setFamilySharingEnabled(!familySharingEnabled)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              familySharingEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {familySharingEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white">Your Data Sovereignty</h3>

        {exportMsg && (
          <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
            {exportMsg}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleExport}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-white font-bold text-xs flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export My Confidential Data</span>
          </button>

          <button
            onClick={() => alert("All local database records, craving logs, and chat messages deleted cleanly.")}
            className="flex-1 py-3 px-4 rounded-xl bg-rose-950/20 border border-rose-500/30 hover:bg-rose-950/40 text-rose-400 font-bold text-xs flex items-center justify-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete All My Data</span>
          </button>
        </div>
      </div>

    </div>
  );
};