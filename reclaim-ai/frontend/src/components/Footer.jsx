import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Heart, Lock, HelpCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-6 h-6 text-emerald-400" />
              <span className="text-lg font-bold text-white">ReClaim AI</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              Empowering young people to break the gambling addiction cycle through AI habit intervention, behavioral science, financial awareness, and zero judgment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard" className="hover:text-emerald-400">Dashboard</Link></li>
              <li><Link to="/ai-coach" className="hover:text-emerald-400">AI Coach</Link></li>
              <li><Link to="/craving" className="hover:text-emerald-400">Craving Intervention</Link></li>
              <li><Link to="/finance" className="hover:text-emerald-400">Financial Simulator</Link></li>
              <li><Link to="/risk" className="hover:text-emerald-400">Relapse Risk Score</Link></li>
            </ul>
          </div>

          {/* Safety & Legal */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">Safety & Trust</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/support" className="hover:text-emerald-400">Emergency Support Center</Link></li>
              <li><Link to="/privacy" className="hover:text-emerald-400">Privacy & Data Control</Link></li>
              <li><Link to="/stories" className="hover:text-emerald-400">Prevention Stories</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="max-w-3xl">
            <strong className="text-slate-400">Supportive Screening Disclaimer:</strong> ReClaim AI is a behavioral recovery companion intended for self-improvement and awareness. It does not provide medical diagnosis or replace clinical mental-health treatment. If you are experiencing a crisis, please call Tele-MANAS (14416 / 1800-891-4416) or contact local emergency healthcare providers immediately.
          </p>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Hackathon 2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
};