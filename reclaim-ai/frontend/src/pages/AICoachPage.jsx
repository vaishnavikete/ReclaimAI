import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Send, Zap, RefreshCw } from 'lucide-react';
import { sendChatMessage } from '../services/api';

export const AICoachPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      content: "Hello! I'm your ReClaim AI Recovery Companion. I'm here 24/7 to support you without judgment. How are you feeling today?",
      quick_action: null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (customMsg = null, quickAction = null) => {
    const textToSend = customMsg || input;
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    if (!customMsg) setInput('');
    setSending(true);

    const res = await sendChatMessage(textToSend, quickAction);

    const aiMsg = {
      sender: 'ai',
      content: res.response,
      quick_action: res.action_suggestion,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, aiMsg]);
    setSending(false);
  };

  const quickPrompts = [
    { label: '⚡ I have a craving', text: 'I am experiencing an intense craving to gamble right now.', action: 'craving' },
    { label: '😰 I\'m stressed', text: 'I feel stressed and overwhelmed today.', action: 'stressed' },
    { label: '📉 I lost money', text: 'I lost ₹2,000 today and I want to win it back.', action: 'lost_money' },
    { label: '🎰 I want to gamble', text: 'I really want to place a bet right now.', action: 'want_to_gamble' },
    { label: '🧘 Help me calm down', text: 'Please guide me through a calming exercise.', action: 'calm_down' },
    { label: '📋 Give me a task', text: 'Can you give me a healthy recovery task for today?', action: 'task' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 flex flex-col h-[calc(100vh-8rem)]">
      
      <div className="flex items-center justify-between p-4 rounded-t-2xl bg-slate-900 border border-slate-800 border-b-0">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>ReClaim AI Coach</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </h2>
            <p className="text-xs text-slate-400">Empathic Recovery Companion • 24/7 Active</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/craving')}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/30"
        >
          <Zap className="w-4 h-4" />
          <span>Launch 10-Min Urge Delay</span>
        </button>
      </div>

      <div className="flex-1 bg-slate-950 border border-slate-800 p-4 overflow-y-auto space-y-4">
        {messages.map((m, idx) => {
          const isAI = m.sender === 'ai';
          return (
            <div key={idx} className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-md p-4 rounded-2xl text-sm space-y-2 ${
                isAI
                  ? 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  : 'bg-emerald-600 text-white rounded-tr-none shadow-md'
              }`}>
                <p className="leading-relaxed">{m.content}</p>
                <div className="flex items-center justify-between text-[10px] opacity-60">
                  <span>{isAI ? 'ReClaim Coach' : 'You'}</span>
                  <span>{m.timestamp}</span>
                </div>

                {isAI && m.quick_action === '10_min_intervention' && (
                  <button
                    onClick={() => navigate('/craving')}
                    className="mt-2 w-full py-2 px-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs hover:bg-emerald-500/30 flex items-center justify-center space-x-1"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Start 10-Minute Breathing & Distraction</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {sending && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 text-slate-400 p-3 rounded-2xl text-xs flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
              <span>AI Coach is thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-3 bg-slate-900 border border-slate-800 border-t-0 flex space-x-2 overflow-x-auto scrollbar-none">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp.text, qp.action)}
            className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 whitespace-nowrap transition-colors"
          >
            {qp.label}
          </button>
        ))}
      </div>

      <div className="p-3 bg-slate-900 border border-slate-800 border-t-0 rounded-b-2xl flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message or craving trigger here..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold transition-transform active:scale-95"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};