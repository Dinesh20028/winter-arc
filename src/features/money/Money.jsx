import React, { useMemo, useState } from 'react';
import {
  ArrowDownCircle,
  CalendarCheck,
  CheckCircle2,
  Circle,
  CircleDollarSign,
  CreditCard,
  PiggyBank,
  Play,
  Receipt,
  ShieldCheck,
  Target,
  TrendingUp,
  Wallet,
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

const dailyPlan = [
  { title: "Track today's spending", icon: Receipt },
  { title: 'Review weekly budget', icon: CalendarCheck },
  { title: 'Add money to savings', icon: ArrowDownCircle },
  { title: 'Review savings goal', icon: Target },
];

const weeklySpending = [
  { day: 'Mon', amount: 800 },
  { day: 'Tue', amount: 1100 },
  { day: 'Wed', amount: 600 },
  { day: 'Thu', amount: 1300 },
  { day: 'Fri', amount: 900 },
  { day: 'Sat', amount: 1500 },
  { day: 'Sun', amount: 700 },
];

const savingsGoals = [
  { name: 'Emergency Fund', progress: 45, icon: ShieldCheck },
  { name: 'Education', progress: 60, icon: CalendarCheck },
  { name: 'Fitness', progress: 35, icon: TrendingUp },
  { name: 'Personal Goal', progress: 50, icon: Target },
];

function Money() {
  const [sessionStarted, setSessionStarted] = useState(false);

  const {
    tasks,
    completedTasks,
    totalXp,
    currentStreak,
    bestStreak,
  } = useApp();

  const moneyTasks = useMemo(
    () => tasks.filter((task) => task.category === 'Money'),
    [tasks],
  );

  const completedMoneyTasks = useMemo(
    () => moneyTasks.filter((task) => task.completed),
    [moneyTasks],
  );

  const moneyProgress =
    moneyTasks.length > 0
      ? Math.round(
          (completedMoneyTasks.length / moneyTasks.length) * 100,
        )
      : 0;

  const moneyXp = completedMoneyTasks.reduce(
    (sum, task) => sum + task.xp,
    0,
  );

  const moneyTaskCount = completedMoneyTasks.length;

  const totalMoneyTaskCount = moneyTasks.length;

  const completedMoneyTitles = completedMoneyTasks.map(
    (task) => task.title,
  );

  const overviewCards = [
    {
      label: 'Money Streak',
      value: `${currentStreak} days`,
      icon: TrendingUp,
      detail:
        bestStreak > 0
          ? `Best streak: ${bestStreak} days`
          : 'Complete all daily tasks to build your streak',
    },
    {
      label: 'Money Tasks Today',
      value: `${moneyTaskCount}/${totalMoneyTaskCount}`,
      icon: CheckCircle2,
      detail:
        totalMoneyTaskCount > 0
          ? `${moneyProgress}% money progress`
          : 'No money tasks available',
    },
    {
      label: 'Money XP Today',
      value: `${moneyXp} XP`,
      icon: PiggyBank,
      detail: `${totalXp} total XP today`,
    },
    {
      label: 'Money Progress',
      value: `${moneyProgress}%`,
      icon: CircleDollarSign,
      detail:
        moneyProgress === 100
          ? 'All money tasks completed'
          : 'Complete your money tasks',
    },
  ];

  const moneyStats = [
    {
      label: 'Money Tasks Completed',
      value: `${moneyTaskCount}`,
      icon: CheckCircle2,
    },
    {
      label: 'Money Tasks Available',
      value: `${totalMoneyTaskCount}`,
      icon: Wallet,
    },
    {
      label: 'Money XP Earned',
      value: `${moneyXp} XP`,
      icon: PiggyBank,
    },
    {
      label: 'Category Progress',
      value: `${moneyProgress}%`,
      icon: TrendingUp,
    },
  ];

  const recentActivity =
    completedMoneyTasks.length > 0
      ? completedMoneyTasks
          .slice()
          .reverse()
          .map((task) => ({
            title: task.title,
            when: 'Today',
          }))
      : [];

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-purple-200/75">
            Winter Arc 2026
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Money
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Build better money habits, control spending, and grow your
            savings.
          </p>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map(
            ({ label, value, icon: Icon, detail }) => (
              <article
                key={label}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-400/30"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-300">
                      {label}
                    </p>
                  </div>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-500/10 text-purple-200">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>

                <p className="text-2xl font-semibold text-white">
                  {value}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {detail}
                </p>
              </article>
            ),
          )}
        </section>

        <section className="mb-6 grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Today's money plan
                </p>

                <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                  Build mindful money habits
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSessionStarted((started) => !started)
                }
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  sessionStarted
                    ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500/15'
                    : 'border-purple-400/30 bg-purple-500/10 text-purple-100 shadow-[0_0_20px_rgba(168,85,247,0.08)] hover:border-purple-300/60 hover:bg-purple-500/15'
                }`}
              >
                {sessionStarted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 fill-current" />
                )}

                {sessionStarted
                  ? 'Session Started'
                  : 'Start Money Session'}
              </button>
            </div>

            {sessionStarted && (
              <div className="mb-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100 transition-all duration-200">
                Money session started. Take a moment to review your
                goals.
              </div>
            )}

            <div className="mb-5 rounded-2xl border border-purple-400/20 bg-purple-500/10 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-purple-200/70">
                    Today's money mission
                  </p>

                  <p className="mt-1 text-sm font-medium text-white">
                    {moneyTaskCount} of {totalMoneyTaskCount} money
                    tasks completed
                  </p>
                </div>

                <span className="text-lg font-bold text-purple-200">
                  {moneyProgress}%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-400 via-fuchsia-400 to-violet-500 transition-all duration-500"
                  style={{ width: `${moneyProgress}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              {dailyPlan.map(({ title, icon: Icon }) => {
                const isCompleted =
                  completedMoneyTitles.includes(title);

                return (
                  <div
                    key={title}
                    className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 transition-colors duration-200 hover:border-slate-700"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                        isCompleted
                          ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300'
                          : 'border-purple-400/25 bg-purple-500/10 text-purple-200'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </span>

                    <span className="min-w-0 flex-1 text-sm font-medium text-slate-200">
                      {title}
                    </span>

                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                    ) : (
                      <Circle className="h-4 w-4 shrink-0 text-slate-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Your numbers
                </p>

                <h2 className="mt-1 text-lg font-semibold text-white">
                  Money statistics
                </h2>
              </div>

              <Wallet className="h-5 w-5 text-purple-300" />
            </div>

            <div className="space-y-3">
              {moneyStats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-3"
                >
                  <span className="flex min-w-0 items-center gap-2 text-sm text-slate-300">
                    <Icon className="h-4 w-4 shrink-0 text-purple-300" />
                    <span>{label}</span>
                  </span>

                  <span className="shrink-0 text-sm font-semibold text-white">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mb-6 grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
          <article className="min-w-0 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Weekly spending activity
                </p>

                <h2 className="mt-2 text-xl font-semibold text-white">
                  Daily spending
                </h2>
              </div>

              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-purple-200/80">
                Spending (₹)
              </span>
            </div>

            <div className="h-[260px] w-full rounded-2xl border border-slate-800 bg-slate-950/70 p-3 sm:h-[280px] sm:p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklySpending}
                  margin={{
                    top: 12,
                    right: 12,
                    left: -2,
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
                    domain={[0, 1800]}
                    ticks={[0, 500, 1000, 1500]}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: '#94a3b8',
                      fontSize: 11,
                    }}
                    tickFormatter={(value) => `₹${value}`}
                    width={52}
                  />

                  <Tooltip
                    formatter={(value) => [
                      `₹${value}`,
                      'Spending',
                    ]}
                    labelStyle={{
                      color: '#e2e8f0',
                      fontWeight: 600,
                    }}
                    contentStyle={{
                      backgroundColor:
                        'rgba(15, 23, 42, 0.96)',
                      border:
                        '1px solid rgba(168, 85, 247, 0.3)',
                      borderRadius: '12px',
                      color: '#f8fafc',
                    }}
                    cursor={{
                      stroke:
                        'rgba(168, 85, 247, 0.35)',
                      strokeWidth: 1,
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#a855f7"
                    strokeWidth={3}
                    dot={{
                      r: 3,
                      fill: '#a855f7',
                      stroke: '#0f172a',
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 5,
                      fill: '#c084fc',
                      stroke: '#f3e8ff',
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

          <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-500/10 text-purple-200">
                <PiggyBank className="h-5 w-5" />
              </span>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Think long term
                </p>

                <h2 className="mt-1 text-lg font-semibold text-white">
                  Money reminder
                </h2>
              </div>
            </div>

            <p className="rounded-2xl border border-purple-400/20 bg-purple-500/10 p-4 text-sm leading-6 text-purple-100">
              Small savings every day can become a big difference over
              90 days.
            </p>
          </article>
        </section>

        <section className="mb-6">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Steady progress
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                Savings progress
              </h2>
            </div>

            <span className="text-xs text-slate-400">
              4 goals
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {savingsGoals.map(
              ({ name, progress, icon: Icon }) => (
                <article
                  key={name}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-400/30"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-500/10 text-purple-200">
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="text-sm font-semibold text-purple-200">
                      {progress}%
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white">
                    {name}
                  </h3>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-purple-400 transition-[width] duration-500"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Goal progress
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
                Your money log
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                Recent money activity
              </h2>
            </div>

            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <Receipt className="h-4 w-4 text-purple-300" />
              Latest
            </span>
          </div>

          {recentActivity.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-6 text-center">
              <CircleDollarSign className="mx-auto h-8 w-8 text-purple-300" />

              <p className="mt-3 text-sm font-medium text-slate-200">
                No money tasks completed yet.
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Complete a Money task from Daily Tasks to see your
                activity here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map(({ title, when }) => (
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
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Money;