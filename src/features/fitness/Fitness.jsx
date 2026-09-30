import React, { useEffect, useState } from 'react';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Dumbbell,
  Flame,
  HeartPulse,
  Pause,
  Play,
  Target,
  TimerReset,
  TrendingUp,
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

const overviewCards = [
  { label: 'Current Streak', value: '18 days', icon: Flame, accent: 'text-red-200' },
  { label: 'Workouts This Week', value: '5 / 7', icon: Activity, accent: 'text-red-200' },
  { label: 'Weekly Goal', value: '5 workouts', icon: Target, accent: 'text-red-200' },
  { label: 'Fitness Progress', value: '84%', icon: TrendingUp, accent: 'text-red-200' },
];

const workoutStats = [
  { label: 'Total Workouts', value: '42' },
  { label: 'Total Training Time', value: '36h 20m' },
  { label: 'Current Streak', value: '18 days' },
  { label: 'Best Streak', value: '24 days' },
];

const categories = [
  {
    title: 'Strength',
    description: 'Progressive lifts and full-body training blocks.',
    progress: 72,
    icon: Dumbbell,
    accent: 'border-red-400/30 bg-red-500/10 text-red-200',
    bar: 'bg-red-400',
  },
  {
    title: 'Running',
    description: 'Build cardio endurance and consistent weekly mileage.',
    progress: 58,
    icon: TimerReset,
    accent: 'border-red-400/30 bg-red-500/10 text-red-200',
    bar: 'bg-red-400',
  },
  {
    title: 'Mobility',
    description: 'Improve flexibility, recovery, and joint health.',
    progress: 81,
    icon: HeartPulse,
    accent: 'border-red-400/30 bg-red-500/10 text-red-200',
    bar: 'bg-red-400',
  },
];

const weeklyData = [
  { day: 'Mon', value: 45 },
  { day: 'Tue', value: 0 },
  { day: 'Wed', value: 65 },
  { day: 'Thu', value: 80 },
  { day: 'Fri', value: 0 },
  { day: 'Sat', value: 100 },
  { day: 'Sun', value: 70 },
];

const recentWorkouts = [
  { title: 'Upper Body Strength', duration: '55 min', when: 'Today' },
  { title: '5 km Easy Run', duration: '32 min', when: 'Yesterday' },
  { title: 'Lower Body Strength', duration: '60 min', when: '2 days ago' },
];

const formatDuration = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

function Fitness() {
  const [workoutStatus, setWorkoutStatus] = useState('idle');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [completedDuration, setCompletedDuration] = useState(null);

  useEffect(() => {
    if (workoutStatus !== 'running') {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [workoutStatus]);

  const startWorkout = () => {
    setElapsedSeconds(0);
    setCompletedDuration(null);
    setWorkoutStatus('running');
  };

  const endWorkout = () => {
    setCompletedDuration(elapsedSeconds);
    setWorkoutStatus('completed');
  };

  const isWorkoutActive = workoutStatus === 'running' || workoutStatus === 'paused';

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-red-200/75">
            Winter Arc 2026
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Fitness</h1>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Build strength, improve endurance, and stay consistent throughout your Winter Arc.
          </p>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map(({ label, value, icon: Icon, accent }) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-red-400/30"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-slate-300">{label}</p>
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl border border-red-400/30 bg-red-500/10 ${accent}`}>
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <div className="text-2xl font-semibold text-white">{value}</div>
            </div>
          ))}
        </section>

        <section className="mb-6 grid gap-5 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Today's plan</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Upper Body Strength</h2>
              </div>
              <button
                type="button"
                onClick={
                  workoutStatus === 'running'
                    ? () => setWorkoutStatus('paused')
                    : workoutStatus === 'paused'
                      ? () => setWorkoutStatus('running')
                      : startWorkout
                }
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  isWorkoutActive
                    ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-50 shadow-[0_0_0_1px_rgba(16,185,129,0.22)]'
                    : 'border-red-400/30 bg-red-500/10 text-red-100 hover:border-red-300/60 hover:bg-red-500/15'
                }`}
              >
                {workoutStatus === 'running' ? (
                  <Pause className="h-4 w-4" />
                ) : workoutStatus === 'paused' ? (
                  <Play className="h-3.5 w-3.5 fill-current" />
                ) : workoutStatus === 'completed' ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Play className="h-3.5 w-3.5 fill-current" />
                )}
                {workoutStatus === 'running'
                  ? 'Pause Workout'
                  : workoutStatus === 'paused'
                    ? 'Resume Workout'
                    : 'Start Workout'}
              </button>
            </div>

            {isWorkoutActive && (
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100 shadow-[0_0_0_1px_rgba(16,185,129,0.12)] transition-all duration-300">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>{workoutStatus === 'running' ? 'Workout in progress' : 'Workout paused'}</span>
                  <span className="font-mono font-semibold tabular-nums">{formatDuration(elapsedSeconds)}</span>
                </div>
                <button
                  type="button"
                  onClick={endWorkout}
                  className="rounded-full border border-emerald-300/40 px-3 py-1 text-xs font-semibold text-emerald-50 transition-colors duration-200 hover:bg-emerald-400/15"
                >
                  End Workout
                </button>
              </div>
            )}

            {workoutStatus === 'completed' && (
              <div className="mb-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100 shadow-[0_0_0_1px_rgba(16,185,129,0.12)] transition-all duration-300">
                <p>Workout completed! Great work.</p>
                <p className="mt-1 text-xs text-emerald-200/80">
                  Total workout duration: <span className="font-mono font-semibold tabular-nums">{formatDuration(completedDuration)}</span>
                </p>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <Clock3 className="h-3.5 w-3.5 text-red-300" />
                  Duration
                </div>
                <p className="text-lg font-semibold text-white">55 minutes</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <Dumbbell className="h-3.5 w-3.5 text-red-300" />
                  Exercises
                </div>
                <p className="text-lg font-semibold text-white">6</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <Target className="h-3.5 w-3.5 text-red-300" />
                  Difficulty
                </div>
                <p className="text-lg font-semibold text-white">Intermediate</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Workout stats</h2>
              <span className="rounded-full border border-red-400/20 bg-red-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-red-200">
                Active
              </span>
            </div>

            <div className="space-y-3">
              {workoutStats.map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-2.5">
                  <span className="text-sm text-slate-300">{label}</span>
                  <span className="text-sm font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Weekly trend</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Workout consistency</h2>
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-red-200/80">
                Workout activity (%)
              </span>
            </div>

            <div className="h-[260px] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 p-3 sm:p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyData}
                  margin={{ top: 10, right: 12, left: 0, bottom: 10 }}
                >
                  <CartesianGrid stroke="rgba(148, 163, 184, 0.18)" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#cbd5e1', fontSize: 11 }}
                    interval={0}
                    minTickGap={8}
                    height={24}
                  />
                  <YAxis
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#cbd5e1', fontSize: 11 }}
                    width={28}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Workout activity']}
                    labelStyle={{ color: '#e2e8f0', fontWeight: 600 }}
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      border: '1px solid rgba(251, 113, 133, 0.3)',
                      borderRadius: '12px',
                      color: '#f8fafc',
                    }}
                    cursor={{ stroke: 'rgba(251, 113, 133, 0.4)', strokeWidth: 1 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#f87171"
                    strokeWidth={3}
                    dot={{ r: 3, fill: '#f87171', stroke: '#f8fafc', strokeWidth: 1 }}
                    activeDot={{ r: 5, fill: '#f87171', stroke: '#f8fafc', strokeWidth: 2 }}
                    animationDuration={900}
                    animationEasing="ease-out"
                    isAnimationActive
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recovery reminder</h2>
            </div>
            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm leading-6 text-red-100">
              Recovery matters. Prioritize sleep, hydration, mobility, and rest days.
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {categories.map(({ title, description, progress, icon: Icon, accent, bar }) => (
            <article
              key={title}
              className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-red-400/30"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs uppercase tracking-[0.18em] text-slate-400">{progress}%</span>
              </div>

              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Progress</span>
                  <span className="font-medium text-white">{progress}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div className={`h-full rounded-full ${bar}`} style={{ width: `${progress}%` }} />
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent workouts</h2>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Latest</span>
          </div>

          <div className="space-y-3">
            {recentWorkouts.map(({ title, duration, when }) => (
              <div
                key={title}
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-white">{title}</p>
                  <p className="mt-1 text-sm text-slate-400">{when}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Clock3 className="h-4 w-4 text-red-300" />
                  {duration}
                  <ArrowRight className="h-4 w-4 text-slate-500" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Fitness;
