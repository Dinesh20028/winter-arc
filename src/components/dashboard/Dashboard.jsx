import React from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  Dumbbell,
  Flame,
  Gauge,
  Languages,
  Sparkles,
  Target,
  Trophy,
  Wallet,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StreakCard from './StreakCard';
import ProgressChart from './ProgressChart';

const categoryConfig = [
  {
    label: 'Fitness',
    icon: Dumbbell,
    color: 'bg-red-400',
    glow: 'shadow-red-500/20',
  },
  {
    label: 'Coding',
    icon: Code2,
    color: 'bg-green-400',
    glow: 'shadow-green-500/20',
  },
  {
    label: 'Study',
    icon: BookOpen,
    color: 'bg-blue-400',
    glow: 'shadow-blue-500/20',
  },
  {
    label: 'English',
    icon: Languages,
    color: 'bg-yellow-400',
    glow: 'shadow-yellow-500/20',
  },
  {
    label: 'Money',
    icon: Wallet,
    color: 'bg-purple-400',
    glow: 'shadow-purple-500/20',
  },
];

function Dashboard({ user = { name: 'Dinesh' } }) {
  const {
    tasks,
    completedTasks,
    totalXp,
    completedTaskCount,
    taskProgress,
    currentStreak,
    bestStreak,
    rank,
    nextRank,
    level,
    levelProgress,
  } = useApp();

  const focusProgress = categoryConfig.map((category) => {
    const categoryTasks = tasks.filter(
      (task) => task.category === category.label,
    );

    const completedCategoryTasks = categoryTasks.filter(
      (task) => task.completed,
    );

    const value =
      categoryTasks.length > 0
        ? Math.round(
            (completedCategoryTasks.length /
              categoryTasks.length) *
              100,
          )
        : 0;

    return {
      ...category,
      value,
    };
  });

  const completedTodayText =
    completedTaskCount === 0
      ? 'No tasks completed yet'
      : completedTaskCount === tasks.length
        ? 'All daily tasks completed'
        : `${completedTaskCount} daily ${
            completedTaskCount === 1 ? 'task' : 'tasks'
          } completed`;

  const recentActivity = completedTasks
    .slice()
    .reverse()
    .slice(0, 4)
    .map((task) => ({
      title: task.title,
      time: 'Today',
      tag: task.category,
    }));

  const summaryStats = [
    {
      label: 'Current streak',
      value: `${currentStreak} days`,
      detail:
        bestStreak > 0
          ? `Best: ${bestStreak} days`
          : 'Start your streak today',
      icon: Flame,
      accent:
        'from-orange-400/20 via-amber-400/10 to-transparent',
      iconClass:
        'bg-orange-500/15 text-orange-200',
    },
    {
      label: 'Current rank',
      value: rank,
      detail:
        nextRank === 'Complete'
          ? '90-day challenge complete'
          : `Next: ${nextRank}`,
      icon: Trophy,
      accent:
        'from-cyan-400/20 via-sky-400/10 to-transparent',
      iconClass:
        'bg-cyan-500/15 text-cyan-100',
    },
    {
      label: 'XP',
      value: totalXp.toLocaleString(),
      detail: `Level ${level}`,
      icon: Zap,
      accent:
        'from-violet-400/20 via-fuchsia-400/10 to-transparent',
      iconClass:
        'bg-violet-500/15 text-violet-100',
    },
    {
      label: 'Focus',
      value: `${Math.round(taskProgress)}%`,
      detail: completedTodayText,
      icon: Gauge,
      accent:
        'from-emerald-400/20 via-teal-400/10 to-transparent',
      iconClass:
        'bg-emerald-500/15 text-emerald-100',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/75">
              Daily overview
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Winter Arc 2026
            </h1>
          </div>

          <div className="flex items-center gap-3 self-start rounded-full border border-cyan-400/20 bg-slate-900/70 px-3 py-2 text-sm text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.15)] backdrop-blur-sm sm:self-auto">
            <Sparkles className="h-4 w-4 text-cyan-300" />

            <span>
              {currentStreak > 0
                ? `${user.name}'s momentum is rising`
                : `${user.name}'s Winter Arc starts today`}
            </span>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
          <section className="space-y-6">
            {/* Summary cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {summaryStats.map(
                ({
                  label,
                  value,
                  detail,
                  icon: Icon,
                  accent,
                  iconClass,
                }) => (
                  <article
                    key={label}
                    className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br ${accent} p-4 shadow-[0_18px_40px_rgba(15,23,42,0.4)]`}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm text-slate-300">
                        {label}
                      </span>

                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconClass}`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="text-2xl font-semibold text-white">
                      {value}
                    </div>

                    <div className="mt-1 text-xs text-slate-300">
                      {detail}
                    </div>
                  </article>
                ),
              )}
            </div>

            {/* Mission + streak */}
            <div className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
              <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.5)] backdrop-blur-sm">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Today&apos;s mission
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      Finish the daily mission
                    </h2>
                  </div>

                  <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 p-2 text-cyan-200">
                    <Target className="h-5 w-5" />
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-700/80 bg-slate-950/80 p-4">
                  <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                    <span>Mission progress</span>

                    <span className="font-medium text-cyan-200">
                      {Math.round(taskProgress)}%
                    </span>
                  </div>

                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-all duration-500"
                      style={{
                        width: `${taskProgress}%`,
                      }}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                    <span>
                      {completedTaskCount} of {tasks.length}{' '}
                      tasks
                    </span>

                    <span className="text-xs text-cyan-200">
                      {totalXp} XP earned
                    </span>
                  </div>
                </div>
              </article>

              <StreakCard
                currentStreak={currentStreak}
                bestStreak={bestStreak}
                rank={rank}
                nextRank={nextRank}
                xpEarnedToday={totalXp}
                level={level}
                levelProgress={levelProgress}
              />
            </div>

            {/* Focus progress */}
            <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.45)] backdrop-blur-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Discipline map
                  </p>

                  <h2 className="mt-2 text-xl font-semibold text-white">
                    Focus progress
                  </h2>
                </div>

                <span className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                  5 pillars
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {focusProgress.map(
                  ({
                    label,
                    value,
                    icon: Icon,
                    color,
                    glow,
                  }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-slate-100 shadow-lg ${glow}`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>

                          <span className="font-medium text-slate-100">
                            {label}
                          </span>
                        </div>

                        <span className="text-sm font-semibold text-slate-200">
                          {value}%
                        </span>
                      </div>

                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full ${color} transition-all duration-500`}
                          style={{
                            width: `${value}%`,
                          }}
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </article>
          </section>

          {/* Right side */}
          <aside className="space-y-6">
            {/* Performance */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.45)] backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Performance
                </h2>

                <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-xs font-medium text-cyan-200">
                  Live
                </span>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
                <ProgressChart />
              </div>
            </div>

            {/* Recent activity */}
            <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.45)] backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Recent activity
                </h2>

                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Today
                </span>
              </div>

              {recentActivity.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-5 text-center">
                  <p className="text-sm text-slate-300">
                    No completed tasks yet.
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Complete a task to see your activity here.
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {recentActivity.map(
                    ({ title, time, tag }) => (
                      <li
                        key={`${title}-${tag}`}
                        className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-slate-100">
                            {title}
                          </p>

                          <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-slate-300">
                            {tag}
                          </span>
                        </div>

                        <p className="mt-2 text-xs text-slate-400">
                          {time}
                        </p>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </article>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;