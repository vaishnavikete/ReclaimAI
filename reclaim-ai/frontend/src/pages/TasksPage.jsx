import React, { useState, useEffect } from 'react';
import { CheckSquare, Trophy, Flame } from 'lucide-react';
import { fetchDailyTasks, toggleTaskCompletion, fetchBadges } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const TasksPage = () => {
  const { user, setUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const taskList = await fetchDailyTasks();
    const badgeList = await fetchBadges();
    setTasks(taskList);
    setBadges(badgeList);
    setLoading(false);
  };

  const handleToggle = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: newStatus } : t)));
    
    const res = await toggleTaskCompletion(id, newStatus);
    if (res && res.total_xp !== undefined) {
      setUser((prev) => ({ ...prev, xp: res.total_xp }));
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-8">
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-slate-900 border border-slate-800 gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-7 h-7 text-indigo-400" />
            <h1 className="text-2xl font-extrabold text-white">Daily Recovery Tasks</h1>
          </div>
          <p className="text-xs text-slate-400">Complete healthy daily habits to earn Recovery XP and unlock achievement badges.</p>
        </div>

        <div className="flex items-center space-x-4 bg-slate-950 px-5 py-3 rounded-xl border border-slate-800">
          <div className="text-center">
            <span className="block text-[10px] text-slate-500 font-bold uppercase">Recovery XP</span>
            <span className="text-xl font-black text-emerald-400">{user?.xp || 480} XP</span>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div className="text-center">
            <span className="block text-[10px] text-slate-500 font-bold uppercase">Streak</span>
            <span className="text-xl font-black text-amber-400 flex items-center space-x-1">
              <Flame className="w-4 h-4 fill-amber-400 inline" />
              <span>{user?.recovery_streak || 12}d</span>
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-slate-300">Today's Goal Completion</span>
          <span className="text-emerald-400 font-bold">{progressPercent}% ({completedCount}/{tasks.length} Completed)</span>
        </div>
        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Today's Habits & Action Plan</h3>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleToggle(task.id, task.completed)}
              className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                task.completed
                  ? 'bg-slate-950/80 border-slate-800 opacity-75'
                  : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                  task.completed ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-700 bg-slate-950'
                }`}>
                  {task.completed && '✓'}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                    {task.title}
                  </h4>
                  <p className="text-xs text-slate-400">{task.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded-md bg-slate-950 text-[10px] font-bold text-slate-400 border border-slate-800">
                  {task.category}
                </span>
                <span className="text-xs font-black text-emerald-400 font-mono">
                  +{task.xp_reward} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-white">Recovery Badges & Milestones</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border text-center space-y-2 transition-all ${
                b.unlocked
                  ? 'bg-slate-950 border-amber-500/30 text-slate-200'
                  : 'bg-slate-950/40 border-slate-800 text-slate-600 opacity-40'
              }`}
            >
              <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center border ${
                b.unlocked ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-slate-900 border-slate-800 text-slate-600'
              }`}>
                <Trophy className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold">{b.title}</div>
              <div className="text-[10px] text-slate-400 leading-tight">{b.description}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};