import React from 'react';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Dumbbell,
  Languages,
  Plus,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const goalConfig = [
  {
    id: 1,
    category: 'Fitness',
    icon: Dumbbell,
    title: 'Build a fit and athletic physique',
    description:
      'Stay consistent with workouts, mobility, and recovery habits.',
    deadline: 'Dec 31, 2026',
    accent:
      'border-red-400/30 bg-red-500/10 text-red-200',
    bar: 'bg-red-400',
  },
  {
    id: 2,
    category: 'Coding',
    icon: Target,
    title:
      'Become placement-ready in DSA and Full Stack Development',
    description:
      'Strengthen problem-solving and build practical project experience.',
    deadline: 'Dec 31, 2026',
    accent:
      'border-green-400/30 bg-green-500/10 text-green-200',
    bar: 'bg-green-400',
  },
  {
    id: 3,
    category: 'Study',
    icon: BookOpen,
    title: 'Maintain strong academic preparation',
    description:
      'Keep up with revision, notes, and exam readiness every week.',
    deadline: 'Dec 31, 2026',
    accent:
      'border-blue-400/30 bg-blue-500/10 text-blue-200',
    bar: 'bg-blue-400',
  },
  {
    id: 4,
    category: 'English',
    icon: Languages,
    title:
      'Improve spoken English and interview communication',
    description:
      'Practice speaking, vocabulary, and confidence-building communication.',
    deadline: 'Dec 31, 2026',
    accent:
      'border-yellow-400/30 bg-yellow-500/10 text-yellow-200',
    bar: 'bg-yellow-400',
  },
  {
    id: 5,
    category: 'Money',
    icon: BriefcaseBusiness,
    title: 'Build better saving and earning habits',
    description:
      'Track spending, improve budgeting, and create healthier financial routines.',
    deadline: 'Dec 31, 2026',
    accent:
      'border-violet-400/30 bg-violet-500/10 text-violet-200',
    bar: 'bg-violet-400',
  },
];

function getGoalStatus(progress) {
  if (progress >= 100) {
    return 'Completed';
  }

  if (progress > 0) {
    return 'In Progress';
  }

  return 'Not Started';
}

function Goals() {
  const { tasks } = useApp();

  const goals = goalConfig.map((goal) => {
    const categoryTasks = tasks.filter(
      (task) => task.category === goal.category,
    );

    const completedCategoryTasks =
      categoryTasks.filter((task) => task.completed);

    const progress =
      categoryTasks.length > 0
        ? Math.round(
            (completedCategoryTasks.length /
              categoryTasks.length) *
              100,
          )
        : 0;

    return {
      ...goal,
      progress,
      status: getGoalStatus(progress),
    };
  });

  const totalGoals = goals.length;

  const completedGoals = goals.filter(
    (goal) => goal.status === 'Completed',
  ).length;

  const inProgressGoals = goals.filter(
    (goal) => goal.status === 'In Progress',
  ).length;

  const overallProgress =
    goals.length > 0
      ? Math.round(
          goals.reduce(
            (sum, goal) => sum + goal.progress,
            0,
          ) / goals.length,
        )
      : 0;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75">
            Winter Arc 2026
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Goals
          </h1>

          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Define what you want to achieve during your 90-day Winter Arc.
          </p>
        </header>

        {/* Summary */}
        <section className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_20px_45px_rgba(15,23,42,0.35)] backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Total Goals
            </p>

            <p className="mt-3 text-3xl font-semibold text-white">
              {totalGoals}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_20px_45px_rgba(15,23,42,0.35)] backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Completed
            </p>

            <p className="mt-3 text-3xl font-semibold text-emerald-300">
              {completedGoals}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_20px_45px_rgba(15,23,42,0.35)] backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              In Progress
            </p>

            <p className="mt-3 text-3xl font-semibold text-cyan-300">
              {inProgressGoals}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_20px_45px_rgba(15,23,42,0.35)] backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Overall Progress
            </p>

            <p className="mt-3 text-3xl font-semibold text-violet-300">
              {overallProgress}%
            </p>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.7fr_0.85fr]">
          {/* Goals */}
          <div className="grid gap-5 md:grid-cols-2">
            {goals.map(
              ({
                id,
                category,
                icon: Icon,
                title,
                description,
                progress,
                deadline,
                status,
                accent,
                bar,
              }) => (
                <article
                  key={id}
                  className="group rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.38)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-[0_20px_50px_rgba(15,23,42,0.5)]"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${accent}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <span
                      className={`rounded-full border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${
                        status === 'Completed'
                          ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
                          : status === 'In Progress'
                            ? 'border-cyan-400/20 bg-cyan-500/10 text-cyan-200'
                            : 'border-slate-700 bg-slate-800 text-slate-300'
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    {category}
                  </p>

                  <h2 className="mt-2 text-lg font-semibold text-white">
                    {title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {description}
                  </p>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                      <span>Progress</span>

                      <span className="font-medium text-white">
                        {progress}%
                      </span>
                    </div>

                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full ${bar} transition-all duration-500`}
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-300">
                    <span>Target</span>

                    <span className="font-medium text-slate-100">
                      {deadline}
                    </span>
                  </div>
                </article>
              ),
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.35)] backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-200">
                  <TrendingUp className="h-5 w-5" />
                </span>

                <h3 className="text-lg font-semibold text-white">
                  Winter Arc Target
                </h3>
              </div>

              <p className="text-sm leading-6 text-slate-300">
                Complete your daily missions consistently for 90 days and
                build measurable progress across all five areas.
              </p>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition-all duration-200 hover:border-cyan-300/60 hover:bg-cyan-500/15"
            >
              <Plus className="h-4 w-4" />
              Create New Goal
            </button>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.35)] backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">
                  Momentum
                </span>

                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              </div>

              <p className="mt-3 text-2xl font-semibold text-white">
                {overallProgress}%
              </p>

              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-500"
                  style={{
                    width: `${overallProgress}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>Winter Arc Goal</span>

                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default Goals;