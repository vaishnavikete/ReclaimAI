import React, { useState, useEffect } from 'react';
import { IndianRupee, Laptop, GraduationCap, ShieldCheck, Plane, Calculator } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { calculateFinancials } from '../services/api';

export const FinancePage = () => {
  const [dailySpend, setDailySpend] = useState(500);
  const [goalName, setGoalName] = useState('High-Performance Laptop');
  const [goalCost, setGoalCost] = useState(65000);
  const [result, setResult] = useState(null);

  useEffect(() => {
    runCalculation();
  }, [dailySpend, goalCost]);

  const runCalculation = async () => {
    const res = await calculateFinancials(dailySpend, goalName, goalCost);
    setResult(res);
  };

  const graphData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
    const gamblingLoss = Math.round(dailySpend * 30 * month);
    const savingsGrowth = Math.round(dailySpend * 30 * month * 1.05);
    return {
      month: `M${month}`,
      gamblingLoss,
      savingsGrowth
    };
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-8">
      
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <IndianRupee className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">What Could Your Money Become?</h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          See the compounding reality of daily gambling spending versus what those exact funds build when directed into your future.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Spending Simulator</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-300">Daily Gambling Spend:</span>
              <span className="text-lg font-black text-emerald-400 font-mono">₹{dailySpend}</span>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={dailySpend}
              onChange={(e) => setDailySpend(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="block text-xs font-semibold text-slate-300">Select Personal Goal Target:</label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { name: 'High-Performance Laptop', cost: 65000, icon: Laptop },
                { name: 'Higher Education / Certifications', cost: 35000, icon: GraduationCap },
                { name: 'Emergency Savings Cushion', cost: 50000, icon: ShieldCheck },
                { name: 'Travel & Dream Vacation Fund', cost: 40000, icon: Plane },
              ].map((g) => {
                const Icon = g.icon;
                const isSelected = goalCost === g.cost;
                return (
                  <button
                    key={g.name}
                    type="button"
                    onClick={() => { setGoalName(g.name); setGoalCost(g.cost); }}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{g.name}</span>
                    </div>
                    <span className="font-mono">₹{g.cost.toLocaleString()}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {result && (
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-semibold">Monthly Spend</span>
                <div className="text-2xl font-black text-rose-400 font-mono">₹{result.monthly_spend.toLocaleString()}</div>
                <div className="text-[10px] text-slate-500">₹{result.daily_spend} × 30 days</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-semibold">Yearly Compounding</span>
                <div className="text-2xl font-black text-rose-500 font-mono">₹{result.yearly_spend.toLocaleString()}</div>
                <div className="text-[10px] text-slate-500">₹{result.daily_spend} × 365 days</div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                <span className="text-xs text-emerald-400 font-semibold">Goal Achievement</span>
                <div className="text-2xl font-black text-white">{result.months_to_achieve_goal} <span className="text-xs font-normal">Months</span></div>
                <div className="text-[10px] text-emerald-300">To afford {result.goal_name}!</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white">What 1 Year of Not Gambling Buys You</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.alternative_items.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200">{item.name}</span>
                    <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      {item.quantity}x Units
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-white">12-Month Financial Trajectory Comparison</h3>
          <div className="flex items-center space-x-4 text-xs font-semibold">
            <span className="flex items-center space-x-1.5 text-rose-400"><span className="w-3 h-3 rounded bg-rose-500"></span><span>Cumulative Gambling Loss</span></span>
            <span className="flex items-center space-x-1.5 text-emerald-400"><span className="w-3 h-3 rounded bg-emerald-500"></span><span>Savings / Asset Growth</span></span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
              <Bar dataKey="gamblingLoss" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Gambling Loss" />
              <Bar dataKey="savingsGrowth" fill="#10b981" radius={[4, 4, 0, 0]} name="Saved Assets" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};