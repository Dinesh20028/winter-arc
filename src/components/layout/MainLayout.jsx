import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from '../dashboard/Dashboard';
import Progress from '../../features/progress/Progress';
import Achievements from '../../features/achievements/Achievements';
import Profile from '../../features/profile/Profile';
import Settings from '../../features/settings/Settings';
import DailyTasks from '../../features/tasks/DailyTasks';
import Goals from '../../features/goals/Goals';
import Fitness from '../../features/fitness/Fitness';
import Coding from '../../features/coding/Coding';
import Study from '../../features/study/Study';
import English from '../../features/english/English';
import Money from '../../features/money/Money';
import Contest from '../../features/contest/Contest';

function MainLayout({ children }) {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderContent = () => {
    if (activePage === 'Dashboard') {
      return <Dashboard />;
    }

    if (activePage === 'Progress') {
      return <Progress />;
    }

    if (activePage === 'Achievements') {
      return <Achievements />;
    }

    if (activePage === 'Profile') {
      return <Profile />;
    }

    if (activePage === 'Settings') {
      return <Settings />;
    }

    if (activePage === 'Daily Tasks') {
      return <DailyTasks />;
    }

    if (activePage === 'Goals') {
      return <Goals />;
    }

    if (activePage === 'Fitness') {
      return <Fitness />;
    }

    if (activePage === 'Coding') {
      return <Coding />;
    }

    if (activePage === 'Study') {
      return <Study />;
    }

    if (activePage === 'English') {
      return <English />;
    }

    if (activePage === 'Money') {
      return <Money />;
    }

    if (activePage === 'Contest') {
      return <Contest />;
    }

    return (
      <div className="flex min-h-screen flex-1 items-center justify-center bg-slate-950 px-6 text-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Coming soon</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">{activePage}</h2>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar activeItem={activePage} onNavigate={setActivePage} />
      <main className="flex-1 overflow-hidden bg-slate-950">{renderContent()}</main>
    </div>
  );
}

export default MainLayout;
