import React, { useState } from 'react';
import {
  BookOpen,
  BookOpenCheck,
  CheckCircle2,
  Circle,
  Clock3,
  FileText,
  Flame,
  Headphones,
  Languages,
  Mic,
  PenLine,
  Play,
  Target,
  TrendingUp,
  Volume2,
  Zap,
} from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { getDailyHistory } from '../../data/dailyHistory';

const skillConfig = [
  { name: 'Speaking', icon: Volume2 },
  { name: 'Vocabulary', icon: Languages },
  { name: 'Grammar', icon: PenLine },
  { name: 'Reading', icon: BookOpen },
];

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1,
  ).padStart(2, '0');
  const day = String(
    date.getDate(),
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function English() {
  const [sessionStarted, setSessionStarted] =
    useState(false);

  const {
    tasks,
    completedTasks,
    currentStreak,
    bestStreak,
    totalXp,
    completedTaskCount,
    taskProgress,
    isTodayComplete,
  } = useApp();

  const englishTasks = tasks.filter(
    (task) => task.category === 'English',
  );

  const completedEnglishTasks =
    englishTasks.filter(
      (task) => task.completed,
    );

  const englishProgress =
    englishTasks.length > 0
      ? Math.round(
          (completedEnglishTasks.length /
            englishTasks.length) *
            100,
        )
      : 0;

  const englishXp =
    completedEnglishTasks.reduce(
      (sum, task) => sum + task.xp,
      0,
    );

  const history = getDailyHistory();

  const weeklySpeaking = [];

  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date();

    date.setDate(
      date.getDate() - offset,
    );

    const dateKey = getDateKey(date);
    const savedDay = history[dateKey];

    const progress =
      savedDay?.English ??
      (offset === 0
        ? englishProgress
        : 0);

    weeklySpeaking.push({
      day: date.toLocaleDateString(
        'en-US',
        {
          weekday: 'short',
        },
      ),
      minutes: Math.round(
        (progress / 100) * 40,
      ),
    });
  }

  const weeklySpeakingMinutes =
    weeklySpeaking.reduce(
      (sum, item) =>
        sum + item.minutes,
      0,
    );

  const englishStats = [
    {
      label: 'English Tasks Today',
      value: `${completedEnglishTasks.length}/${englishTasks.length}`,
      icon: CheckCircle2,
    },
    {
      label: 'English XP Today',
      value: `${englishXp} XP`,
      icon: Zap,
    },
    {
      label: 'Practice This Week',
      value: `${weeklySpeakingMinutes} min`,
      icon: Mic,
    },
    {
      label: 'Best English Streak',
      value: `${bestStreak} days`,
      icon: Flame,
    },
  ];

  const skills = skillConfig.map(
    (skill) => ({
      ...skill,
      progress: englishProgress,
    }),
  );

  const dailyPlan =
    englishTasks.length > 0
      ? englishTasks.map((task) => ({
          title: task.title,
          completed: task.completed,
          xp: task.xp,
        }))
      : [
          {
            title:
              '20 minutes speaking practice',
            completed: false,
            xp: 65,
          },
          {
            title:
              'Learn 10 new vocabulary words',
            completed: false,
            xp: 50,
          },
          {
            title:
              'Read one English article',
            completed: false,
            xp: 40,
          },
          {
            title:
              'Practice grammar',
            completed: false,
            xp: 45,
          },
        ];

  const recentActivity =
    completedTasks
      .filter(
        (task) =>
          task.category === 'English',
      )
      .slice()
      .reverse()
      .slice(0, 4)
      .map((task) => ({
        title: task.title,
        when: 'Today',
      }));

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75">
            Winter Arc 2026
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                English
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Improve communication, vocabulary,
                grammar, and speaking confidence.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-100">
              <Zap className="h-4 w-4 text-cyan-300" />
              <span>
                {totalXp} total XP earned today
              </span>
            </div>
          </div>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.35)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-300">
                English Streak
              </p>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-200">
                <Flame className="h-4 w-4" />
              </span>
            </div>

            <p className="text-2xl font-semibold text-white">
              {currentStreak} days
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.35)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-300">
                Speaking Practice
              </p>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-200">
                <Mic className="h-4 w-4" />
              </span>
            </div>

            <p className="text-2xl font-semibold text-white">
              {weeklySpeakingMinutes} min
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.35)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-300">
                English Goal
              </p>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-200">
                <Target className="h-4 w-4" />
              </span>
            </div>

            <p className="text-2xl font-semibold text-white">
              {englishTasks.length} tasks
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.35)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-300">
                English Progress
              </p>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-200">
                <TrendingUp className="h-4 w-4" />
              </span>
            </div>

            <p className="text-2xl font-semibold text-white">
              {englishProgress}%
            </p>
          </article>
        </section>

        <section className="mb-6 grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Today's English plan
                </p>

                <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                  Build communication skills
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSessionStarted(
                    (started) => !started,
                  )
                }
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  sessionStarted
                    ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500/15'
                    : 'border-cyan-400/30 bg-cyan-500/10 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.08)] hover:border-cyan-300/60 hover:bg-cyan-500/15'
                }`}
              >
                {sessionStarted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 fill-current" />
                )}

                {sessionStarted
                  ? 'Session Started'
                  : 'Start Speaking Session'}
              </button>
            </div>

            {sessionStarted && (
              <div className="mb-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                Speaking session started. Keep going!
              </div>
            )}

            <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-slate-300">
                  Today's English progress
                </span>

                <span className="font-semibold text-cyan-200">
                  {englishProgress}%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                  style={{
                    width: `${englishProgress}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>
                  {completedEnglishTasks.length} of{' '}
                  {englishTasks.length} English tasks
                </span>

                <span className="text-cyan-200">
                  {englishXp} XP
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {dailyPlan.map(
                ({
                  title,
                  completed,
                  xp,
                }) => (
                  <div
                    key={title}
                    className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                        completed
                          ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300'
                          : 'border-cyan-400/25 bg-cyan-500/10 text-cyan-200'
                      }`}
                    >
                      {completed ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                    </span>

                    <span className="min-w-0 flex-1 text-sm font-medium text-slate-200">
                      {title}
                    </span>

                    <span className="shrink-0 text-xs text-cyan-200">
                      +{xp} XP
                    </span>
                  </div>
                ),
              )}
            </div>

            {isTodayComplete && (
              <div className="mt-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                Excellent! Your complete daily mission is
                finished.
              </div>
            )}
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Your numbers
                </p>

                <h2 className="mt-1 text-lg font-semibold text-white">
                  English statistics
                </h2>
              </div>

              <Headphones className="h-5 w-5 text-cyan-300" />
            </div>

            <div className="space-y-3">
              {englishStats.map(
                ({
                  label,
                  value,
                  icon: Icon,
                }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-3"
                  >
                    <span className="flex min-w-0 items-center gap-2 text-sm text-slate-300">
                      <Icon className="h-4 w-4 shrink-0 text-cyan-300" />
                      <span>{label}</span>
                    </span>

                    <span className="shrink-0 text-sm font-semibold text-white">
                      {value}
                    </span>
                  </div>
                ),
              )}
            </div>

            <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Overall daily mission
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {Math.round(taskProgress)}%
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {completedTaskCount} total tasks completed today
              </p>
            </div>
          </article>
        </section>

        <section className="mb-6 grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
          <article className="min-w-0 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)]">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Weekly speaking activity
                </p>

                <h2 className="mt-2 text-xl font-semibold text-white">
                  Practice minutes
                </h2>
              </div>

              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-200/80">
                Speaking activity
              </span>
            </div>

            <div className="h-[260px] w-full rounded-2xl border border-slate-800 bg-slate-950/70 p-3 sm:h-[280px] sm:p-4">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={weeklySpeaking}
                  margin={{
                    top: 12,
                    right: 12,
                    left: -8,
                    bottom: 8,
                  }}
                >
                  <CartesianGrid
                    stroke="rgba(148, 163, 184, 0.16)"
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: '#cbd5e1',
                      fontSize: 11,
                    }}
                    interval={0}
                    height={28}
                  />

                  <YAxis
                    domain={[0, 40]}
                    ticks={[0, 10, 20, 30, 40]}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: '#94a3b8',
                      fontSize: 11,
                    }}
                    width={32}
                  />

                  <Tooltip
                    formatter={(value) => [
                      `${value} minutes`,
                      'Speaking practice',
                    ]}
                    labelStyle={{
                      color: '#e2e8f0',
                      fontWeight: 600,
                    }}
                    contentStyle={{
                      backgroundColor:
                        'rgba(15, 23, 42, 0.96)',
                      border:
                        '1px solid rgba(34, 211, 238, 0.3)',
                      borderRadius: '12px',
                      color: '#f8fafc',
                    }}
                    cursor={{
                      stroke:
                        'rgba(34, 211, 238, 0.35)',
                      strokeWidth: 1,
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="minutes"
                    stroke="#22d3ee"
                    strokeWidth={3}
                    dot={{
                      r: 3,
                      fill: '#22d3ee',
                      stroke: '#0f172a',
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 5,
                      fill: '#67e8f9',
                      stroke: '#cffafe',
                      strokeWidth: 2,
                    }}
                    animationDuration={900}
                    animationEasing="ease-out"
                    isAnimationActive
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)]">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-200">
                <BookOpen className="h-5 w-5" />
              </span>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  A little reminder
                </p>

                <h2 className="mt-1 text-lg font-semibold text-white">
                  Keep practicing
                </h2>
              </div>
            </div>

            <p className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-sm leading-6 text-cyan-100">
              {englishProgress === 100
                ? 'Excellent. You completed all English tasks for today.'
                : 'Consistency matters more than perfection. Practice English every day.'}
            </p>

            <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Best streak
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {bestStreak} days
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Keep building your Winter Arc streak.
              </p>
            </div>
          </article>
        </section>

        <section className="mb-6">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Keep improving
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                Skill progress
              </h2>
            </div>

            <span className="text-xs text-slate-400">
              4 skills
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {skills.map(
              ({
                name,
                progress,
                icon: Icon,
              }) => (
                <article
                  key={name}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/30"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="text-sm font-semibold text-cyan-200">
                      {progress}%
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white">
                    {name}
                  </h3>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-400 transition-[width] duration-500"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Based on today's English tasks
                  </p>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Your learning log
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                Recent English activity
              </h2>
            </div>

            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <FileText className="h-4 w-4 text-cyan-300" />
              Today
            </span>
          </div>

          {recentActivity.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-5 text-center">
              <p className="text-sm text-slate-300">
                No English tasks completed yet.
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Complete an English task from Daily Tasks
                to see it here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map(
                ({ title, when }) => (
                  <div
                    key={title}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 transition-colors duration-200 hover:border-slate-700"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-400/25 bg-emerald-500/10 text-emerald-300">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>

                      <p className="truncate text-sm font-medium text-white">
                        {title}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pl-11 sm:pl-0">
                      <span className="text-xs text-emerald-300">
                        Completed
                      </span>

                      <span className="text-xs text-slate-400">
                        {when}
                      </span>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default English;