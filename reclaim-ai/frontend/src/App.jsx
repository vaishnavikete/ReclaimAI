import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { DashboardPage } from './pages/DashboardPage';
import { AICoachPage } from './pages/AICoachPage';
import { CravingPage } from './pages/CravingPage';
import { TasksPage } from './pages/TasksPage';
import { FinancePage } from './pages/FinancePage';
import { RiskPage } from './pages/RiskPage';
import { MonitoringPage } from './pages/MonitoringPage';
import { StoriesPage } from './pages/StoriesPage';
import { MoodPage } from './pages/MoodPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SupportPage } from './pages/SupportPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/assessment" element={<AssessmentPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/ai-coach" element={<AICoachPage />} />
              <Route path="/craving" element={<CravingPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/finance" element={<FinancePage />} />
              <Route path="/risk" element={<RiskPage />} />
              <Route path="/monitoring" element={<MonitoringPage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/mood" element={<MoodPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}