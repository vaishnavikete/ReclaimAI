import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchJudgeDemo = async () => {
  try {
    const res = await api.get('/auth/judge-demo');
    return res.data;
  } catch (err) {
    return {
      access_token: 'demo_token_123',
      user: {
        id: 1,
        name: 'Rahul Sharma',
        email: 'demo@reclaim.ai',
        recovery_streak: 12,
        total_saved: 6000.0,
        xp: 480,
        risk_level: 'LOW',
        risk_score: 34
      }
    };
  }
};

export const fetchDashboardSummary = async () => {
  try {
    const res = await api.get('/dashboard/');
    return res.data;
  } catch (err) {
    return {
      user_name: 'Rahul Sharma',
      recovery_streak: 12,
      total_saved: 6000.0,
      risk_level: 'LOW',
      risk_score: 34,
      xp: 480,
      today_mood: 'Good',
      completed_tasks_count: 3,
      total_tasks_count: 5,
      recent_cravings: [
        { id: 1, trigger: 'Late Night Boredom', intensity_before: 8, intensity_after: 3, created_at: '2 days ago' },
        { id: 2, trigger: 'Stress after work', intensity_before: 7, intensity_after: 2, created_at: '4 days ago' }
      ],
      today_task: 'Complete a 10-minute box breathing session'
    };
  }
};

export const sendChatMessage = async (message, quickAction = null) => {
  try {
    const res = await api.post('/chat/send', { message, quick_action: quickAction });
    return res.data;
  } catch (err) {
    let reply = "I'm here with you. Urges pass like waves. Let's take 10 minutes to breathe and reflect.";
    if (quickAction === "craving") reply = "I hear you. Urges peak within 10-15 minutes and then subside. Click the 'I Have a Craving' button above to start your 10-minute delay exercise.";
    if (quickAction === "stressed") reply = "Stress is a major trigger for quick relief seeking. Take 3 deep breaths with me right now.";
    if (quickAction === "lost_money") reply = "Trying to recover losses leads to deeper cycles. Pause now to protect what you have.";
    return { response: reply, action_suggestion: '10_min_intervention', timestamp: new Date().toISOString() };
  }
};

export const logCraving = async (intensityBefore, intensityAfter, trigger, notes) => {
  try {
    const res = await api.post('/craving/log', {
      intensity_before: intensityBefore,
      intensity_after: intensityAfter,
      trigger,
      notes
    });
    return res.data;
  } catch (err) {
    return { id: Date.now(), intensity_before: intensityBefore, intensity_after: intensityAfter, trigger };
  }
};

export const fetchDailyTasks = async () => {
  try {
    const res = await api.get('/tasks/');
    return res.data;
  } catch (err) {
    return [
      { id: 1, title: '15-Minute Outdoor Walk', description: 'Clear your mind & boost natural dopamine.', category: 'Health', xp_reward: 20, completed: true, date_assigned: 'Today' },
      { id: 2, title: '10-Minute Box Breathing', description: 'Calm the nervous system and lower urge intensity.', category: 'Mindfulness', xp_reward: 20, completed: true, date_assigned: 'Today' },
      { id: 3, title: 'Review Financial Progress', description: 'Check how much money you saved today.', category: 'Finance', xp_reward: 30, completed: true, date_assigned: 'Today' },
      { id: 4, title: 'Gratitude Journaling', description: 'Write down 3 things you appreciate.', category: 'Mindset', xp_reward: 20, completed: false, date_assigned: 'Today' },
      { id: 5, title: 'Call a Trusted Friend', description: 'Share your positive recovery win.', category: 'Social', xp_reward: 50, completed: false, date_assigned: 'Today' },
    ];
  }
};

export const toggleTaskCompletion = async (taskId, completed) => {
  try {
    const res = await api.post('/tasks/toggle', { task_id: taskId, completed });
    return res.data;
  } catch (err) {
    return { completed };
  }
};

export const fetchBadges = async () => {
  try {
    const res = await api.get('/tasks/badges');
    return res.data;
  } catch (err) {
    return [
      { title: 'First Step', description: 'Joined ReClaim AI Recovery', unlocked: true, icon: 'Footprints' },
      { title: '7-Day Fighter', description: '7 Days Gambling-Free', unlocked: true, icon: 'ShieldCheck' },
      { title: '30-Day Champion', description: '30 Days Gambling-Free', unlocked: false, icon: 'Trophy' },
      { title: 'Money Saver', description: 'Saved over ₹5,000', unlocked: true, icon: 'IndianRupee' },
      { title: 'Craving Crusher', description: 'Completed 3 urge interventions', unlocked: true, icon: 'Zap' },
    ];
  }
};

export const calculateFinancials = async (dailySpend, goalName, goalCost) => {
  try {
    const res = await api.post('/finance/calculate', {
      daily_spend: dailySpend,
      goal_name: goalName,
      goal_cost: goalCost
    });
    return res.data;
  } catch (err) {
    const monthly = dailySpend * 30;
    const yearly = dailySpend * 365;
    return {
      daily_spend: dailySpend,
      monthly_spend: monthly,
      yearly_spend: yearly,
      five_year_spend: yearly * 5,
      goal_name: goalName || 'Tech Laptop & Skill Courses',
      months_to_achieve_goal: (goalCost / monthly).toFixed(1),
      alternative_items: [
        { name: 'Skill Development Course', cost: 3500, quantity: Math.floor(yearly / 3500) },
        { name: 'High-Performance Laptop', cost: 65000, quantity: Math.floor(yearly / 65000) },
        { name: 'Emergency Financial Cushion Fund', cost: 50000, quantity: Math.floor(yearly / 50000) },
      ]
    };
  }
};

export const fetchRelapseRisk = async () => {
  try {
    const res = await api.get('/risk/');
    return res.data;
  } catch (err) {
    return {
      score: 34,
      level: 'LOW',
      disclaimer: 'Screening indicator for behavioral support, not a clinical medical prediction.',
      risk_factors: [
        { title: 'Frequent Late-Night Cravings', impact: '+12 pts', type: 'warning' },
        { title: 'Simulated Betting App Open Attempt', impact: '+8 pts', type: 'warning' },
      ],
      protective_factors: [
        { title: '12-Day Active Recovery Streak', impact: '-25 pts', type: 'positive' },
        { title: '82% Daily Task Completion', impact: '-15 pts', type: 'positive' },
        { title: 'Active Support Contact Registered', impact: '-10 pts', type: 'positive' },
      ],
      recommendations: [
        'Enable 10-Minute Delay Rule whenever late-night boredom strikes.',
        'Set an automatic daily spending reminder to visualize your ₹6,000 saved.',
        'Keep your trusted contact informed when urge intensity reaches >7.'
      ]
    };
  }
};

export const fetchMonitoringSummary = async () => {
  try {
    const res = await api.get('/monitoring/summary');
    return res.data;
  } catch (err) {
    return {
      disclaimer: 'Monitoring is opt-in. ReClaim AI does not secretly access private device activity.',
      opt_in_status: true,
      today_detections: 3,
      weekly_breakdown: [
        { day: 'Mon', attempts: 2 },
        { day: 'Tue', attempts: 5 },
        { day: 'Wed', attempts: 1 },
        { day: 'Thu', attempts: 4 },
        { day: 'Fri', attempts: 2 },
        { day: 'Sat', attempts: 0 },
        { day: 'Sun', attempts: 1 },
      ],
      recent_logs: [
        { type: 'App Launch Intercepted', target: 'Fantasy Sports Platform', time: '2 hours ago', status: 'Prevented' },
        { type: 'Web Visit Warning', target: 'Online Casino Domain', time: 'Yesterday, 23:15', status: 'Intervened' },
      ]
    };
  }
};

export const fetchSupportHelplines = async () => {
  try {
    const res = await api.get('/support/helplines');
    return res.data;
  } catch (err) {
    return {
      disclaimer: 'ReClaim AI is not a replacement for a qualified mental-health professional. If you are in immediate danger or feel unable to stay safe, seek emergency assistance or contact a qualified professional.',
      resources: [
        { title: 'Tele-MANAS Mental Health Helpline (India)', number: '14416 / 1800-891-4416', available: '24/7 Free Call', category: 'Mental Health' },
        { title: 'KIRAN Mental Health Rehabilitation', number: '1800-599-0019', available: '24/7 Govt. Helpline', category: 'Crisis Care' },
        { title: 'Gamblers Anonymous Support Network', website: 'https://www.gamblersanonymous.org', available: 'Peer Support Groups', category: 'Self-Help' },
        { title: 'NIMHANS Addiction Psychiatry Helpline', number: '080-26995000', available: 'Mon-Sat 9AM-5PM', category: 'Clinical Services' }
      ]
    };
  }
};

export default api;