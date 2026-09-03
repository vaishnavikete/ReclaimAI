import React, { useState } from 'react';
import { BookOpen, Briefcase, Rocket, GraduationCap } from 'lucide-react';
import { StoryCard } from '../components/StoryCard';

export const StoriesPage = () => {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [activeStage, setActiveStage] = useState(0);

  const scenarios = [
    {
      role: 'Student Perspective',
      title: 'The Exam Stress & Small Bet Traps',
      icon: GraduationCap,
      stages: [
        { heading: '"Just ₹100 on IPL fantasy"', storyText: 'Alex is stressed during mid-semester exams and sees friends winning small ₹500 bets online.', lesson: 'Gambling triggers often masquerade as harmless entertainment during high-stress study periods.', isWarning: false },
        { heading: 'First Loss & Urge to Recover', storyText: 'Alex loses ₹500 on a match and feels a sharp sting of regret. He deposits another ₹1,000 to win it back.', lesson: 'Chasing losses is the primary cognitive distortion that escalates casual bets into addiction.', isWarning: true },
        { heading: '₹10,000 Lost & Borrowing Money', storyText: 'Within 3 weeks, Alex spends his entire semester allowance (₹10,000) trying to break even.', lesson: 'Chasing losses compounding exponentially creates severe financial & emotional crisis.', isWarning: true },
        { heading: 'Impact on Studies & Sleep', storyText: 'Alex skips lectures, stays up until 3 AM monitoring live scores, and fails an important exam.', lesson: 'Gambling addiction degrades executive function, sleep architecture, and academic focus.', isWarning: true },
        { heading: 'ReClaim AI Intervention', storyText: 'Alex installs ReClaim AI, sets up the 10-minute urge delay box breathing, and shares his situation with a mentor.', lesson: 'Admitting the urge early and replacing the habit breaks the neurological reward loop.', isWarning: false },
        { heading: 'Recovery & Savings Milestone', storyText: '12 Days gambling-free! Alex saves ₹6,000, passes his retake exam, and buys a course on web development.', lesson: 'Redirected money and attention creates tangible real-world accomplishments.', isWarning: false },
      ]
    },
    {
      role: 'Working Professional',
      title: 'Salary Day & Crypto / Casino Loops',
      icon: Briefcase,
      stages: [
        { heading: 'Salary Credited Bonus', storyText: 'Rohan receives his monthly salary and decides to try online roulette during a boring weekend.', lesson: 'Boredom combined with immediate liquidity is a high-risk trigger for working professionals.', isWarning: false },
        { heading: 'Beginner\'s Luck Illusion', storyText: 'Rohan wins ₹3,000 on his first spin. Dopamine spikes, giving him a false sense of skill.', lesson: 'Early random wins trick the brain into overestimating control over purely probabilistic outcomes.', isWarning: false },
        { heading: 'The Big Loss & Salary Drain', storyText: 'Rohan bets higher stakes and loses ₹25,000 in one evening. Panicked, he spends his rent money.', lesson: 'High stakes gambling quickly jeopardizes essential living expenses.', isWarning: true },
        { heading: 'Workplace Stress & Lies', storyText: 'Unable to focus at his corporate job, Rohan lies to his family about unexpected medical bills.', lesson: 'Deception and isolation are classic symptoms of gambling distress.', isWarning: true },
        { heading: 'ReClaim Financial Reality Check', storyText: 'Rohan uses ReClaim AI\'s simulator and realizes 1 year of gambling equals the downpayment on his home.', lesson: 'Concrete financial visualization replaces short-term dopamine urges with long-term goals.', isWarning: false },
        { heading: 'Freedom & Debt Recovery', storyText: 'Rohan builds a 30-day streak, automates salary savings, and restores trust with his family.', lesson: 'Consistency in recovery restores emotional stability and professional performance.', isWarning: false },
      ]
    },
    {
      role: 'Young Entrepreneur',
      title: 'Risk Taking & Business Capital Trap',
      icon: Rocket,
      stages: [
        { heading: 'Conflating Business Risk with Gambling', storyText: 'Priya runs a startup and believes her high risk tolerance makes her a natural at crypto leverage trading.', lesson: 'Confusing calculated business risk with high-house-edge gambling leads to capital destruction.', isWarning: false },
        { heading: 'Margin Calls & Over-leverage', storyText: 'A market dip wipes out her ₹50,000 trading margin. She dips into company operational funds.', lesson: 'Mixing personal urges with professional funds endangers employees and business viability.', isWarning: true },
        { heading: 'Deep Emotional Burnout', storyText: 'Priya experiences panic attacks and insomnia, dreading checking her balance every morning.', lesson: 'Financial volatility from gambling induces chronic nervous system exhaustion.', isWarning: true },
        { heading: 'ReClaim AI Relapse Score Alert', storyText: 'Her ReClaim Relapse Risk score flags HIGH risk (78/100) due to late-night activity, prompting her to alert her co-founder.', lesson: 'Early warning indicators allow intervention before catastrophic financial loss.', isWarning: false },
        { heading: 'Structured Habit Replacement', storyText: 'Priya replaces trading apps with physical fitness and daily AI coach check-ins.', lesson: 'Channeling intense drive into healthy physical pursuits sustains long-term recovery.', isWarning: false },
        { heading: 'Startup Growth & 60-Day Streak', storyText: 'Priya secures new client funding and celebrates 60 days gambling-free with her team.', lesson: 'True entrepreneurial success comes from building real value, not gambling on chance.', isWarning: false },
      ]
    }
  ];

  const currentScenario = scenarios[selectedScenarioIdx];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">See the Future Before You Gamble</h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Interactive animated awareness stories illustrating how small initial bets turn into traps, and how early recovery changes your trajectory.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {scenarios.map((sc, idx) => (
          <button
            key={idx}
            onClick={() => { setSelectedScenarioIdx(idx); setActiveStage(0); }}
            className={`p-4 rounded-xl border flex items-center space-x-3 text-left transition-all ${
              selectedScenarioIdx === idx
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="p-2 rounded-lg bg-slate-950 text-emerald-400"><BookOpen className="w-5 h-5" /></div>
            <div>
              <div className="text-xs font-bold text-slate-200">{sc.role}</div>
              <div className="text-[10px] text-slate-400">{sc.title}</div>
            </div>
          </button>
        ))}
      </div>

      <StoryCard
        scenario={currentScenario}
        activeStage={activeStage}
        onSelectStage={(stIdx) => setActiveStage(stIdx)}
      />

    </div>
  );
};