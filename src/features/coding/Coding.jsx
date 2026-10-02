import React, { useState } from 'react';
import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  Clock3,
  Code2,
  Flame,
  Layers3,
  Lightbulb,
  Play,
  Target,
  TrendingUp,
  Trophy,
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

const weeklyActivity = [
  { day: 'Mon', value: 40 },
  { day: 'Tue', value: 60 },
  { day: 'Wed', value: 20 },
  { day: 'Thu', value: 75 },
  { day: 'Fri', value: 50 },
  { day: 'Sat', value: 90 },
  { day: 'Sun', value: 70 },
];

const skillCategories = [
  {
    title: 'DSA',
    description:
      'Strengthen core data structures and algorithm patterns.',
    icon: Brain,
  },
  {
    title: 'Full Stack Development',
    description:
      'Build useful products across the frontend and backend.',
    icon: Layers3,
  },
  {
    title: 'Problem Solving',
    description:
      'Turn unfamiliar challenges into clear, testable steps.',
    icon: Lightbulb,
  },
];

const recentActivity = [
  {
    title: 'Two Sum',
    type: 'Solved',
    difficulty: 'Easy',
    when: 'Today',
  },
  {
    title: 'Valid Parentheses',
    type: 'Solved',
    difficulty: 'Easy',
    when: 'Yesterday',
  },
  {
    title: 'Binary Search',
    type: 'Solved',
    difficulty: 'Medium',
    when: '2 days ago',
  },
  {
    title: 'React dashboard component',
    type: 'Built',
    difficulty: 'Development',
    when: '3 days ago',
  },
];

function Coding() {
  const {
    tasks,
    currentStreak,
    bestStreak,
    totalXp,
    completedTasks,
  } = useApp();

  const [sessionStarted, setSessionStarted] =
    useState(false);

  const codingTasks = tasks.filter(
    (task) => task.category === 'Coding',
  );

  const completedCodingTasks =
    codingTasks.filter(
      (task) => task.completed,
    );

  const codingProgress =
    codingTasks.length > 0
      ? Math.round(
          (completedCodingTasks.length /
            codingTasks.length) *
            100,
        )
      : 0;

  const codingXp = completedCodingTasks.reduce(
    (sum, task) => sum + task.xp,
    0,
  );

  const codingTaskCount = codingTasks.length;

  const completedCodingTaskCount =
    completedCodingTasks.length;

  const codingOverview = [
    {
      label: 'Coding Streak',
      value: `${currentStreak} days`,
      icon: Flame,
    },
    {
      label: 'Coding Tasks',
      value: `${completedCodingTaskCount} / ${codingTaskCount}`,
      icon: Code2,
    },
    {
      label: 'Daily Goal',
      value: `${codingProgress}%`,
      icon: Target,
    },
    {
      label: 'Coding XP',
      value: codingXp,
      icon: Zap,
    },
  ];

  const codingStats = [
    {
      label: 'Coding Tasks Today',
      value: codingTaskCount,
      icon: Code2,
    },
    {
      label: 'Completed Today',
      value: completedCodingTaskCount,
      icon: Trophy,
    },
    {
      label: 'Coding XP Today',
      value: codingXp,
      icon: Zap,
    },
    {
      label: 'Current Streak',
      value: `${currentStreak} days`,
      icon: Flame,
    },
    {
      label: 'Best Streak',
      value: `${bestStreak} days`,
      icon: TrendingUp,
    },
  ];

  const dynamicSkillCategories =
    skillCategories.map((skill, index) => ({
      ...skill,
      progress:
        index === 0
          ? codingProgress
          : index === 1
            ? Math.round(codingProgress * 0.75)
            : Math.round(
                codingProgress * 0.9,
              ),
    }));

  const completedCodingTitles =
    completedTasks
      .filter(
        (task) => task.category === 'Coding',
      )
      .slice()
      .reverse()
      .slice(0, 3)
      .map((task) => task.title);

  const displayActivity =
    completedCodingTitles.length > 0
      ? completedCodingTitles.map(
          (title, index) => ({
            title,
            type: 'Completed',
            difficulty: 'Coding',
            when:
              index === 0
                ? 'Today'
                : `${index} day${
                    index === 1 ? '' : 's'
                  } ago`,
          }),
        )
      : recentActivity;

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-6">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-200/75">
            Winter Arc 2026
          </p>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Coding
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Build placement-ready skills through DSA,
            development, and consistent practice.
          </p>
        </header>

        {/* Overview */}
        <section
          className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Coding overview"
        >
          {codingOverview.map(
            ({
              label,
              value,
              icon: Icon,
            }) => (
              <article
                key={label}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.35)] transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400/30"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-sm text-slate-300">
                    {label}
                  </p>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-200">
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

        {/* Mission and statistics */}
        <section className="mb-6 grid min-w-0 gap-5 xl:grid-cols-[1.5fr_0.9fr]">
          <article className="min-w-0 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Today&apos;s coding mission
                </p>

                <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                  DSA Practice Session
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSessionStarted(
                    (started) => !started,
                  )
                }
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ${
                  sessionStarted
                    ? 'border-emerald-300/60 bg-emerald-500/15 text-emerald-50'
                    : 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100 hover:border-emerald-300/60 hover:bg-emerald-500/15'
                }`}
              >
                {sessionStarted ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Play className="h-3.5 w-3.5 fill-current" />
                )}

                {sessionStarted
                  ? 'Session Started'
                  : 'Start Session'}
              </button>
            </div>

            <div className="mb-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.07] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-300">
                  Coding progress today
                </span>

                <span className="font-semibold text-emerald-200">
                  {codingProgress}%
                </span>
              </div>

              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                  style={{
                    width: `${codingProgress}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                {completedCodingTaskCount} of{' '}
                {codingTaskCount} coding tasks
                completed
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: 'Tasks',
                  value: `${codingTaskCount} coding tasks`,
                  icon: Code2,
                },
                {
                  label: 'Duration',
                  value: '60 minutes',
                  icon: Clock3,
                },
                {
                  label: 'Difficulty',
                  value: 'Medium',
                  icon: Activity,
                },
                {
                  label: 'Platform',
                  value: 'LeetCode',
                  icon: Target,
                },
              ].map(
                ({
                  label,
                  value,
                  icon: Icon,
                }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4"
                  >
                    <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
                      <Icon className="h-3.5 w-3.5 text-emerald-300" />
                      {label}
                    </div>

                    <p className="text-sm font-semibold text-white">
                      {value}
                    </p>
                  </div>
                ),
              )}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23-42,0.38)] backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">
                Coding statistics
              </h2>

              <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-emerald-200">
                Live
              </span>
            </div>

            <div className="space-y-2.5">
              {codingStats.map(
                ({
                  label,
                  value,
                  icon: Icon,
                }) => (
                  <div
                    key={label}
                    className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2.5"
                  >
                    <span className="flex min-w-0 items-center gap-2 text-sm text-slate-300">
                      {Icon && (
                        <Icon className="h-4 w-4 shrink-0 text-emerald-300" />
                      )}

                      <span className="truncate">
                        {label}
                      </span>
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

        {/* Weekly trend and daily plan */}
        <section className="mb-6 grid min-w-0 gap-5 xl:grid-cols-[1.4fr_0.9fr]">
          <article className="min-w-0 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Weekly trend
                </p>

                <h2 className="mt-2 text-xl font-semibold text-white">
                  Coding activity
                </h2>
              </div>

              <span className="text-xs font-medium text-emerald-200">
                Coding activity (%)
              </span>
            </div>

            <div className="h-[260px] w-full min-w-0 rounded-2xl border border-slate-800 bg-slate-950/80 p-3 sm:p-4">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={weeklyActivity}
                  margin={{
                    top: 10,
                    right: 12,
                    left: 0,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid
                    stroke="rgba(148, 163, 184, 0.18)"
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
                    height={26}
                  />

                  <YAxis
                    domain={[0, 100]}
                    ticks={[
                      0,
                      25,
                      50,
                      75,
                      100,
                    ]}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: '#cbd5e1',
                      fontSize: 11,
                    }}
                    width={30}
                  />

                  <Tooltip
                    formatter={(value) => [
                      `${value}%`,
                      'Coding activity',
                    ]}
                    labelStyle={{
                      color: '#e2e8f0',
                      fontWeight: 600,
                    }}
                    contentStyle={{
                      backgroundColor:
                        'rgba(15, 23, 42, 0.96)',
                      border:
                        '1px solid rgba(52, 211, 153, 0.3)',
                      borderRadius: '12px',
                      color: '#f8fafc',
                    }}
                    cursor={{
                      stroke:
                        'rgba(52, 211, 153, 0.35)',
                      strokeWidth: 1,
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#34d399"
                    strokeWidth={3}
                    dot={{
                      r: 3,
                      fill: '#34d399',
                      stroke: '#ecfdf5',
                      strokeWidth: 1,
                    }}
                    activeDot={{
                      r: 5,
                      fill: '#34d399',
                      stroke: '#ecfdf5',
                      strokeWidth: 2,
                    }}
                    animationDuration={900}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Daily plan
                </p>

                <h2 className="mt-2 text-lg font-semibold text-white">
                  Today&apos;s focus
                </h2>
              </div>

              <BookOpen className="h-5 w-5 text-emerald-300" />
            </div>

            <ul className="space-y-3">
              {codingTasks.length === 0 ? (
                <li className="rounded-xl border border-dashed border-slate-700 bg-slate-950/80 p-4 text-sm text-slate-400">
                  No coding tasks available today.
                </li>
              ) : (
                codingTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/80 p-3"
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                        task.completed
                          ? 'border-emerald-400 bg-emerald-500 text-white'
                          : 'border-emerald-400/50 bg-emerald-500/10 text-emerald-300'
                      }`}
                    >
                      {task.completed ? (
                        <Check className="h-3 w-3" />
                      ) : null}
                    </span>

                    <div className="min-w-0">
                      <span
                        className={`text-sm leading-5 ${
                          task.completed
                            ? 'text-slate-500 line-through'
                            : 'text-slate-200'
                        }`}
                      >
                        {task.title}
                      </span>

                      <p className="mt-1 text-xs text-emerald-300">
                        +{task.xp} XP
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </article>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Skill development
              </p>

              <h2 className="mt-2 text-xl font-semibold text-white">
                Coding categories
              </h2>
            </div>

            <span className="text-xs text-slate-400">
              Live progress
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {dynamicSkillCategories.map(
              ({
                title,
                description,
                progress,
                icon: Icon,
              }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.35)] transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400/30"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-200">
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="text-sm font-semibold text-emerald-200">
                      {progress}%
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    {title}
                  </h3>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-300">
                    {description}
                  </p>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>

                    <div
                      className="h-2 overflow-hidden rounded-full bg-slate-800"
                      role="progressbar"
                      aria-label={`${title} progress`}
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="h-full rounded-full bg-emerald-400 transition-[width] duration-500"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        {/* Recent work */}
        <section className="mb-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Recent work
              </p>

              <h2 className="mt-2 text-lg font-semibold text-white">
                Recent coding activity
              </h2>
            </div>

            <span className="text-xs uppercase tracking-[0.16em] text-slate-400">
              Latest
            </span>
          </div>

          <div className="space-y-2.5">
            {displayActivity.map(
              ({
                title,
                type,
                difficulty,
                when,
              }) => (
                <article
                  key={`${title}-${when}`}
                  className="flex min-w-0 flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-500/10 text-emerald-300">
                      {type === 'Built' ? (
                        <Layers3 className="h-4 w-4" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {type === 'Completed'
                          ? 'Completed '
                          : `${type} `}
                        {title}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {when}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pl-11 sm:justify-end sm:pl-0">
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-200">
                      {difficulty}
                    </span>

                    <ArrowRight className="h-4 w-4 text-slate-500" />
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        <aside className="rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.07] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-500/10 text-emerald-200">
              <Lightbulb className="h-4 w-4" />
            </span>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/80">
                Coding reminder
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-200">
                Consistency beats intensity. Solve
                problems regularly and keep building
                real projects.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Coding;