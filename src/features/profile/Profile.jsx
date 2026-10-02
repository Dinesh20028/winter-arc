import {
  Award,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Check,
  Code2,
  Dumbbell,
  Flame,
  Gem,
  Languages,
  Medal,
  Pencil,
  Share2,
  Shield,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  Wallet,
  Zap,
} from 'lucide-react';
import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { getDailyHistory } from '../../data/dailyHistory';

const categoryStyles = {
  Fitness: {
    icon: Dumbbell,
    track: 'bg-rose-400',
    iconStyle: 'text-rose-200 border-rose-400/20 bg-rose-400/10',
  },
  Coding: {
    icon: Code2,
    track: 'bg-emerald-400',
    iconStyle: 'text-emerald-200 border-emerald-400/20 bg-emerald-400/10',
  },
  Study: {
    icon: BookOpen,
    track: 'bg-blue-400',
    iconStyle: 'text-blue-200 border-blue-400/20 bg-blue-400/10',
  },
  English: {
    icon: Languages,
    track: 'bg-amber-400',
    iconStyle: 'text-amber-200 border-amber-400/20 bg-amber-400/10',
  },
  Money: {
    icon: Wallet,
    track: 'bg-violet-400',
    iconStyle: 'text-violet-200 border-violet-400/20 bg-violet-400/10',
  },
};

function GlassCard({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-slate-800/90 bg-slate-900/75 shadow-[0_18px_45px_rgba(2,6,23,0.24)] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

function getChallengeDay() {
  const challengeStart = new Date(2026, 9, 1);
  const today = new Date();

  return Math.min(
    Math.max(
      Math.floor(
        (today - challengeStart) / (1000 * 60 * 60 * 24),
      ) + 1,
      1,
    ),
    90,
  );
}

function Profile() {
  const {
    tasks,
    currentStreak,
    bestStreak,
    totalXp,
    level,
    rank,
    nextRank,
    completedTaskCount,
  } = useApp();

  const challengeDay = getChallengeDay();
  const dailyHistory = getDailyHistory();

  const completedDays = Object.values(dailyHistory).filter(
    (day) =>
      day &&
      ['Fitness', 'Coding', 'Study', 'English'].every(
        (category) => day[category] === 100,
      ),
  ).length;

  const overallProgress = Math.min(
    Math.round((completedDays / 90) * 100),
    100,
  );

  const categoryProgress = useMemo(() => {
    const categories = [
      'Fitness',
      'Coding',
      'Study',
      'English',
      'Money',
    ];

    return categories.map((name) => {
      const categoryTasks = tasks.filter(
        (task) => task.category === name,
      );

      const completed = categoryTasks.filter(
        (task) => task.completed,
      ).length;

      const progress =
        categoryTasks.length > 0
          ? Math.round(
              (completed / categoryTasks.length) * 100,
            )
          : 0;

      return {
        name,
        progress,
        ...categoryStyles[name],
      };
    });
  }, [tasks]);

  const achievements = [
    {
      title: 'First Step',
      reward: '+50 XP',
      icon: Target,
      unlocked: currentStreak >= 1,
    },
    {
      title: 'Week Warrior',
      reward: '+100 XP',
      icon: Shield,
      unlocked: currentStreak >= 7,
    },
    {
      title: 'Two Week Fighter',
      reward: '+150 XP',
      icon: Medal,
      unlocked: currentStreak >= 14,
    },
    {
      title: 'XP Hunter',
      reward: '+150 XP',
      icon: Gem,
      unlocked: totalXp >= 150,
    },
  ];

  const unlockedAchievements = achievements.filter(
    (achievement) => achievement.unlocked,
  );

  const rankProgress =
    nextRank === 'Complete'
      ? 100
      : rank === 'Bronze'
        ? Math.min((currentStreak / 7) * 100, 100)
        : rank === 'Silver'
          ? Math.min(
              ((currentStreak - 7) / 7) * 100,
              100,
            )
          : rank === 'Gold'
            ? Math.min(
                ((currentStreak - 14) / 16) * 100,
                100,
              )
            : rank === 'Platinum'
              ? Math.min(
                  ((currentStreak - 30) / 15) * 100,
                  100,
                )
              : rank === 'Diamond'
                ? Math.min(
                    ((currentStreak - 45) / 15) * 100,
                    100,
                  )
                : rank === 'Elite'
                  ? Math.min(
                      ((currentStreak - 60) / 15) * 100,
                      100,
                    )
                  : rank === 'Master'
                    ? Math.min(
                        ((currentStreak - 75) / 15) * 100,
                        100,
                      )
                    : 100;

  const xpToNextRank =
    nextRank === 'Complete'
      ? 0
      : Math.max(
          0,
          ({
            Silver: 7,
            Gold: 14,
            Platinum: 30,
            Diamond: 45,
            Elite: 60,
            Master: 75,
            'Winter Master': 90,
          }[nextRank] ?? 90) - currentStreak,
        );

  const statistics = [
    {
      label: 'Current Streak',
      value: String(currentStreak),
      suffix: 'days',
      icon: Flame,
      tone: 'text-orange-200 border-orange-400/20 bg-orange-400/[0.08]',
    },
    {
      label: 'Best Streak',
      value: String(bestStreak),
      suffix: 'days',
      icon: Trophy,
      tone: 'text-amber-200 border-amber-400/20 bg-amber-400/[0.08]',
    },
    {
      label: 'Total XP',
      value: totalXp.toLocaleString(),
      icon: Zap,
      tone: 'text-cyan-200 border-cyan-400/20 bg-cyan-400/[0.08]',
    },
    {
      label: 'Days Completed',
      value: String(completedDays),
      suffix: '/ 90',
      icon: CalendarDays,
      tone: 'text-blue-200 border-blue-400/20 bg-blue-400/[0.08]',
    },
    {
      label: 'Tasks Completed',
      value: String(completedTaskCount),
      icon: Check,
      tone: 'text-emerald-200 border-emerald-400/20 bg-emerald-400/[0.08]',
    },
    {
      label: 'Achievements',
      value: String(unlockedAchievements.length),
      icon: Award,
      tone: 'text-violet-200 border-violet-400/20 bg-violet-400/[0.08]',
    },
  ];

  const recentAchievements = unlockedAchievements.slice(-4);

  const challengeDetails = [
    { label: 'Start Date', value: 'October 1, 2026' },
    { label: 'End Date', value: 'December 31, 2026' },
    { label: 'Challenge Length', value: '90 Days' },
    {
      label: 'Current Day',
      value: `${challengeDay}`,
    },
    {
      label: 'Overall Progress',
      value: `${overallProgress}%`,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75">
              Winter Arc 2026
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              My Profile
            </h1>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Your Winter Arc journey at a glance.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:bg-slate-800"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit Profile
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/25 bg-cyan-400/[0.08] px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-400/[0.14]"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share Profile
            </button>
          </div>
        </header>

        <section className="mb-7 overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-900/80 shadow-[0_20px_55px_rgba(8,47,73,0.18)]">
          <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-cyan-300/35 bg-slate-800/90 text-cyan-100 shadow-[0_0_38px_rgba(34,211,238,0.2)]">
                <span className="absolute inset-2 rounded-full border border-cyan-200/10" />
                <UserRound
                  className="relative h-11 w-11"
                  strokeWidth={1.5}
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Dinesh Reddy
                  </h2>

                  <span className="rounded-full border border-amber-400/25 bg-amber-400/[0.08] px-2 py-1 text-[10px] font-semibold text-amber-200">
                    {rank}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-400">
                  @dinesh
                </p>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
                    Winter Arc 2026
                  </span>

                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-blue-200" />
                    Day {challengeDay} of 90
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Rank progress
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    {rank}{' '}
                    <span className="font-normal text-slate-500">
                      to
                    </span>{' '}
                    {nextRank}
                  </p>
                </div>

                <span className="text-sm font-semibold text-cyan-200">
                  {Math.round(rankProgress)}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.45)] transition-all duration-500"
                  style={{ width: `${rankProgress}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Level {level}{' '}
                  <span className="text-slate-600">·</span>{' '}
                  {totalXp.toLocaleString()} XP
                </span>

                <span className="text-cyan-200">
                  {xpToNextRank} days to next rank
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="Profile statistics"
          className="mb-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-6"
        >
          {statistics.map(
            ({ label, value, suffix, icon: Icon, tone }) => (
              <GlassCard
                key={label}
                className="p-4 transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900"
              >
                <div
                  className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl border ${tone}`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <p className="text-xs font-medium text-slate-400">
                  {label}
                </p>

                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-2xl font-semibold tracking-tight text-white">
                    {value}
                  </span>

                  {suffix && (
                    <span className="text-sm text-slate-500">
                      {suffix}
                    </span>
                  )}
                </div>
              </GlassCard>
            ),
          )}
        </section>

        <div className="grid gap-7 xl:grid-cols-[1.2fr_0.8fr]">
          <section>
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Category Progress
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Your momentum across the five pillars.
                </p>
              </div>

              <Target className="h-5 w-5 text-cyan-200/70" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {categoryProgress.map(
                ({
                  name,
                  progress,
                  icon: Icon,
                  track,
                  iconStyle,
                }) => (
                  <GlassCard
                    key={name}
                    className="p-4 transition duration-200 hover:border-slate-700"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-xl border ${iconStyle}`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>

                        <span className="text-sm font-semibold text-slate-100">
                          {name}
                        </span>
                      </div>

                      <span className="text-sm font-semibold text-white">
                        {progress}%
                      </span>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full ${track}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </GlassCard>
                ),
              )}
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Recent Achievements
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Milestones you have unlocked.
                </p>
              </div>

              <BadgeCheck className="h-5 w-5 text-cyan-200/70" />
            </div>

            <GlassCard className="divide-y divide-slate-800/80">
              {recentAchievements.length > 0 ? (
                recentAchievements.map(
                  ({ title, reward, icon: Icon }) => (
                    <div
                      key={title}
                      className="flex items-center justify-between gap-3 p-4 transition hover:bg-slate-800/30"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-200">
                          <Icon className="h-4 w-4" />
                        </span>

                        <span className="truncate text-sm font-semibold text-slate-100">
                          {title}
                        </span>
                      </div>

                      <span className="shrink-0 text-xs font-semibold text-amber-200">
                        {reward}
                      </span>
                    </div>
                  ),
                )
              ) : (
                <div className="p-5 text-sm text-slate-500">
                  Complete tasks to unlock your first achievement.
                </div>
              )}
            </GlassCard>
          </section>
        </div>

        <section className="mt-7">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Winter Arc Information
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                The challenge timeline behind your progress.
              </p>
            </div>

            <Shield className="h-5 w-5 text-cyan-200/70" />
          </div>

          <GlassCard className="grid gap-0 divide-y divide-slate-800/80 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
            {challengeDetails.map(({ label, value }) => (
              <div key={label} className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {label}
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  {value}
                </p>
              </div>
            ))}
          </GlassCard>
        </section>
      </div>
    </main>
  );
}

export default Profile;