import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  Clock3,
  Code2,
  Database,
  GraduationCap,
  Network,
  Play,
  Target,
  TrendingUp,
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

const subjectConfig = [
  { name: 'Data Structures', icon: Brain },
  { name: 'Computer Networks', icon: Network },
  { name: 'Database Management', icon: Database },
  { name: 'Web Development', icon: Code2 },
];

const subjectCategories = [
  'Study',
];

function Study() {
  const [sessionStarted, setSessionStarted] = useState(false);

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

  const studyTasks = tasks.filter(
    (task) => task.category === 'Study',
  );

  const completedStudyTasks = studyTasks.filter(
    (task) => task.completed,
  );

  const studyProgress =
    studyTasks.length > 0
      ? Math.round(
          (completedStudyTasks.length /
            studyTasks.length) *
            100,
        )
      : 0;

  const studyXp = completedStudyTasks.reduce(
    (sum, task) => sum + task.xp,
    0,
  );

  const history = useMemo(
    () => getDailyHistory(),
    [],
  );

  const weeklyActivity = useMemo(() => {
    const result = [];
    const today = new Date();

    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - offset);

      const year = date.getFullYear();
      const month = String(
        date.getMonth() + 1,
      ).padStart(2, '0');
      const day = String(
        date.getDate(),
      ).padStart(2, '0');

      const dateKey = `${year}-${month}-${day}`;

      const saved = history[dateKey];

      const value =
        saved?.Study ??
        (offset === 0 ? studyProgress : 0);

      result.push({
        day: date.toLocaleDateString(
          'en-US',
          { weekday: 'short' },
        ),
        hours: Number(
          (value / 100) * 3,
        ).toFixed(1),
      });
    }

    return result;
  }, [history, studyProgress]);

  const weeklyStudyHours = weeklyActivity.reduce(
    (sum, item) =>
      sum + Number(item.hours),
    0,
  );

  const studyStats = [
    {
      label: 'Study Tasks Today',
      value: `${completedStudyTasks.length}/${studyTasks.length}`,
    },
    {
      label: 'Study XP Today',
      value: `${studyXp} XP`,
    },
    {
      label: 'Current Streak',
      value: `${currentStreak} days`,
    },
    {
      label: 'Best Streak',
      value: `${bestStreak} days`,
    },
  ];

  const subjectProgress = subjectConfig.map(
    (subject) => ({
      ...subject,
      progress: studyProgress,
    }),
  );

  const recentActivity = completedTasks
    .filter(
      (task) => task.category === 'Study',
    )
    .slice()
    .reverse()
    .slice(0, 4)
    .map((task) => ({
      title: task.title,
      status: 'Completed',
      when: 'Today',
    }));

  const topics = studyTasks.length
    ? studyTasks.map((task) => task.title)
    : [
        'OSI Model',
        'TCP/IP',
        'Routing',
      ];

  const overviewCards = [
    {
      label: 'Study Streak',
      value: `${currentStreak} days`,
      icon: TrendingUp,
    },
    {
      label: 'Study Time This Week',
      value: `${weeklyStudyHours.toFixed(1)}h`,
      icon: Clock3,
    },
    {
      label: 'Study Goal',
      value: `${studyTasks.length} tasks`,
      icon: Target,
    },
    {
      label: 'Study Progress',
      value: `${studyProgress}%`,
      icon: BookOpenCheck,
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-200/75">
            Winter Arc 2026
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Study
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Build consistent study habits and make
                steady progress toward your academic goals.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-2 text-xs text-blue-100">
              <Zap className="h-4 w-4 text-blue-300" />
              <span>{totalXp} total XP earned today</span>
            </div>
          </div>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map(
            ({ label, value, icon: Icon }) => (
              <article
                key={label}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/30"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-sm text-slate-300">
                    {label}
                  </p>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-blue-200">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>

                <p className="text-2xl font-semibold text-white">
                  {value}
                </p>
              </article>
            ),
          )}
        </section>

        <section className="mb-6 grid gap-5 xl:grid-cols-[1.45fr_0.85fr]">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Today's study plan
                </p>

                <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                  Complete today's study tasks
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
                    : 'border-blue-400/30 bg-blue-500/10 text-blue-100 hover:border-blue-300/60 hover:bg-blue-500/15'
                }`}
              >
                {sessionStarted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 fill-current" />
                )}

                {sessionStarted
                  ? 'Session Started'
                  : 'Start Study Session'}
              </button>
            </div>

            {sessionStarted && (
              <div className="mb-5 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                Study session started. Stay focused!
              </div>
            )}

            <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-sm text-slate-300">
                  Today's study progress
                </span>

                <span className="font-semibold text-blue-200">
                  {studyProgress}%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-400 transition-all duration-500"
                  style={{
                    width: `${studyProgress}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>
                  {completedStudyTasks.length} of{' '}
                  {studyTasks.length} study tasks
                </span>

                <span className="text-blue-200">
                  {studyXp} XP
                </span>
              </div>
            </div>

            <div className="mb-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Planned tasks
                </p>

                <p className="mt-2 flex items-center gap-2 font-semibold text-white">
                  <Target className="h-4 w-4 text-blue-300" />
                  {studyTasks.length}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Completed
                </p>

                <p className="mt-2 font-semibold text-white">
                  {completedStudyTasks.length}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Status
                </p>

                <p className="mt-2 font-semibold text-white">
                  {isTodayComplete
                    ? 'Day Complete'
                    : studyProgress === 100
                      ? 'Study Complete'
                      : 'In Progress'}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                Today's study topics
              </p>

              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-100"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Your numbers
                </p>

                <h2 className="mt-1 text-lg font-semibold text-white">
                  Study statistics
                </h2>
              </div>

              <GraduationCap className="h-5 w-5 text-blue-300" />
            </div>

            <div className="space-y-3">
              {studyStats.map(
                ({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-3"
                  >
                    <span className="text-sm text-slate-300">
                      {label}
                    </span>

                    <span className="shrink-0 text-sm font-semibold text-white">
                      {value}
                    </span>
                  </div>
                ),
              )}
            </div>
          </article>
        </section>

        <section className="mb-6 grid gap-5 xl:grid-cols-[1.4fr_0.85fr]">
          <article className="min-w-0 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Weekly activity
                </p>

                <h2 className="mt-2 text-xl font-semibold text-white">
                  Study progress
                </h2>
              </div>

              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-blue-200/80">
                Study activity
              </span>
            </div>

            <div className="h-[260px] w-full rounded-2xl border border-slate-800 bg-slate-950/70 p-3 sm:h-[280px] sm:p-4">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={weeklyActivity}
                  margin={{
                    top: 12,
                    right: 12,
                    left: -12,
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
                    domain={[0, 3.5]}
                    ticks={[0, 1, 2, 3]}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: '#94a3b8',
                      fontSize: 11,
                    }}
                    width={34}
                  />

                  <Tooltip
                    formatter={(value) => [
                      `${value} hours`,
                      'Study time',
                    ]}
                    labelStyle={{
                      color: '#e2e8f0',
                      fontWeight: 600,
                    }}
                    contentStyle={{
                      backgroundColor:
                        'rgba(15, 23, 42, 0.96)',
                      border:
                        '1px solid rgba(96, 165, 250, 0.3)',
                      borderRadius: '12px',
                      color: '#f8fafc',
                    }}
                    cursor={{
                      stroke:
                        'rgba(96, 165, 250, 0.35)',
                      strokeWidth: 1,
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="#60a5fa"
                    strokeWidth={3}
                    dot={{
                      r: 3,
                      fill: '#60a5fa',
                      stroke: '#0f172a',
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 5,
                      fill: '#93c5fd',
                      stroke: '#dbeafe',
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
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/10 text-blue-200">
                <BookOpen className="h-5 w-5" />
              </span>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Keep your pace
                </p>

                <h2 className="mt-1 text-lg font-semibold text-white">
                  Study reminder
                </h2>
              </div>
            </div>

            <p className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4 text-sm leading-6 text-blue-100">
              {studyProgress === 100
                ? 'Excellent. You completed all study tasks for today.'
                : 'Consistency beats intensity. Complete today’s study target before the day ends.'}
            </p>

            <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Challenge progress
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {Math.round(taskProgress)}%
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Overall daily mission progress
              </p>
            </div>
          </article>
        </section>

        <section className="mb-6">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Keep building
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                Subject progress
              </h2>
            </div>

            <span className="text-xs text-slate-400">
              {subjectCategories.length === 1
                ? 'Study tasks'
                : `${subjectConfig.length} subjects`}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {subjectProgress.map(
              ({
                name,
                progress,
                icon: Icon,
              }) => (
                <article
                  key={name}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/30"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-blue-200">
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="text-sm font-semibold text-blue-200">
                      {progress}%
                    </span>
                  </div>

                  <h3 className="min-h-12 text-base font-semibold text-white">
                    {name}
                  </h3>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-blue-400 transition-[width] duration-500"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Based on today's Study tasks
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
                Recent study activity
              </h2>
            </div>

            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <BookOpenCheck className="h-4 w-4 text-blue-300" />
              Today
            </span>
          </div>

          {recentActivity.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-5 text-center">
              <p className="text-sm text-slate-300">
                No Study tasks completed yet.
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Complete a Study task from Daily Tasks to see
                it here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map(
                ({
                  title,
                  status,
                  when,
                }) => (
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
                        {status}
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

export default Study;