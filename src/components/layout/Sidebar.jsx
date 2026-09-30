import React from "react";
import {
  BookOpen,
  CalendarDays,
  CheckCheck,
  Code2,
  Dumbbell,
  Languages,
  LayoutDashboard,
  Medal,
  Settings,
  Snowflake,
  Target,
  TrendingUp,
  Trophy,
  UserRound,
  Wallet,
} from "lucide-react";

const defaultItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#dashboard" },
  { label: "Goals", icon: Target, href: "#goals" },
  { label: "Daily Tasks", icon: CheckCheck, href: "#daily-tasks" },
  { label: "Fitness", icon: Dumbbell, href: "#fitness" },
  { label: "Coding", icon: Code2, href: "#coding" },
  { label: "Study", icon: BookOpen, href: "#study" },
  { label: "English", icon: Languages, href: "#english" },
  { label: "Money", icon: Wallet, href: "#money" },
  { label: "Contest", icon: Trophy, href: "#contest" },
  { label: "Progress", icon: TrendingUp, href: "#progress" },
  { label: "Achievements", icon: Medal, href: "#achievements" },
  { label: "Profile", icon: UserRound, href: "#profile" },
  { label: "Settings", icon: Settings, href: "#settings" },
  { label: "Calendar", icon: CalendarDays, href: "#calendar" },
];

function Sidebar({ items = defaultItems, activeItem = "Dashboard", onNavigate }) {
  const handleNavigate = (event, label) => {
    if (onNavigate) {
      event.preventDefault();
      onNavigate(label);
    }
  };

  return (
    <aside className="w-72 min-h-screen border-r border-slate-800/80 bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.18),_rgba(15,23,42,0)_32%),linear-gradient(180deg,#020817_0%,#0f172a_44%,#111827_100%)] text-slate-100 shadow-[0_0_30px_rgba(14,116,144,0.18)]">
      <div className="flex h-full flex-col p-5">
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-slate-900/60 p-3 shadow-[0_10px_30px_rgba(14,116,144,0.15)] backdrop-blur-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/30">
            <Snowflake className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-cyan-200/80">
              Winter Arc
            </p>
            <h1 className="text-lg font-semibold tracking-tight text-white">
              Winter Arc 2026
            </h1>
          </div>
        </div>

        <nav aria-label="Sidebar navigation" className="flex-1">
          <ul className="space-y-1.5">
            {items.map(({ label, icon: Icon, href }) => {
              const isActive = activeItem === label;

              return (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(event) => handleNavigate(event, label)}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-out",
                      isActive
                        ? "border border-cyan-300/30 bg-gradient-to-r from-cyan-500/15 via-sky-500/10 to-transparent text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_22px_rgba(14,116,144,0.16)]"
                        : "text-slate-300 hover:bg-slate-800/70 hover:text-white",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors duration-200",
                        isActive
                          ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-100"
                          : "border-slate-700/80 bg-slate-900/80 text-slate-400 group-hover:border-slate-600 group-hover:text-slate-200",
                      ].join(" ")}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
