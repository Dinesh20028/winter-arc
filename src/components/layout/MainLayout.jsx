import React, { useState } from "react";
import { Menu, Snowflake } from "lucide-react";

import Sidebar from "./Sidebar";
import Dashboard from "../dashboard/Dashboard";
import Progress from "../../features/progress/Progress";
import Achievements from "../../features/achievements/Achievements";
import Profile from "../../features/profile/Profile";
import Settings from "../../features/settings/Settings";
import Calendar from "../../features/calendar/Calendar";
import DailyTasks from "../../features/tasks/DailyTasks";
import Goals from "../../features/goals/Goals";
import Fitness from "../../features/fitness/Fitness";
import Coding from "../../features/coding/Coding";
import Study from "../../features/study/Study";
import English from "../../features/english/English";
import Money from "../../features/money/Money";
import Contest from "../../features/contest/Contest";

function MainLayout() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;
      case "Progress":
        return <Progress />;
      case "Achievements":
        return <Achievements />;
      case "Profile":
        return <Profile />;
      case "Settings":
        return <Settings onNavigate={handleNavigate} />;
      case "Calendar":
        return <Calendar />;
      case "Daily Tasks":
        return <DailyTasks />;
      case "Goals":
        return <Goals />;
      case "Fitness":
        return <Fitness />;
      case "Coding":
        return <Coding />;
      case "Study":
        return <Study />;
      case "English":
        return <English />;
      case "Money":
        return <Money />;
      case "Contest":
        return <Contest />;
      default:
        return (
          <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">
                Coming soon
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-white">
                {activePage}
              </h2>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-transparent text-slate-100">
      {/* Desktop navigation */}
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-40 md:block md:w-72">
        <Sidebar
          activeItem={activePage}
          onNavigate={handleNavigate}
          isOpen={false}
          onClose={() => {}}
        />
      </div>

      {/* Mobile navigation */}
      <Sidebar
        activeItem={activePage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main application area */}
      <div className="w-full max-w-full overflow-x-hidden md:pl-72">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-14 w-full items-center border-b border-slate-800/60 bg-slate-950/90 px-3 backdrop-blur-md md:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/80 text-slate-200 shadow-lg"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="ml-3 flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 text-slate-950">
              <Snowflake className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Winter Arc 2026
              </p>

              <p className="truncate text-[10px] uppercase tracking-[0.18em] text-cyan-200/60">
                {activePage}
              </p>
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="w-full min-w-0 max-w-full overflow-x-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;