import {
  Award,
  BookOpen,
  Check,
  Code2,
  Crown,
  Dumbbell,
  Flame,
  Gem,
  Languages,
  LockKeyhole,
  Medal,
  Mic2,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Wallet,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const achievementsByCategory = [
  {
    title: 'Streak Achievements',
    description:
      'Show up every day. Let consistency do the talking.',
    tone: 'amber',
    achievements: [
      {
        title: 'First Step',
        description: 'Complete Day 1',
        reward: 50,
        icon: Target,
        requirement: 1,
        type: 'streak',
      },
      {
        title: 'Week Warrior',
        description: 'Reach a 7-day streak',
        reward: 100,
        icon: ShieldCheck,
        requirement: 7,
        type: 'streak',
      },
      {
        title: 'Two Week Fighter',
        description: 'Reach a 14-day streak',
        reward: 150,
        icon: Flame,
        requirement: 14,
        type: 'streak',
      },
      {
        title: 'Monthly Beast',
        description: 'Reach a 30-day streak',
        reward: 300,
        icon: Medal,
        requirement: 30,
        type: 'streak',
      },
      {
        title: 'Elite Grinder',
        description: 'Reach a 60-day streak',
        reward: 600,
        icon: Crown,
        requirement: 60,
        type: 'streak',
      },
      {
        title: 'Winter Master',
        description: 'Complete all 90 days',
        reward: 1000,
        icon: Trophy,
        requirement: 90,
        type: 'streak',
      },
    ],
  },
  {
    title: 'XP Achievements',
    description:
      'Every task adds up. Stack your experience and level up.',
    tone: 'cyan',
    achievements: [
      {
        title: 'XP Starter',
        description: 'Earn 500 XP',
        reward: 75,
        icon: Star,
        requirement: 500,
        type: 'xp',
      },
      {
        title: 'XP Hunter',
        description: 'Earn 1,000 XP',
        reward: 150,
        icon: Zap,
        requirement: 1000,
        type: 'xp',
      },
      {
        title: 'XP Master',
        description: 'Earn 2,500 XP',
        reward: 300,
        icon: Sparkles,
        requirement: 2500,
        type: 'xp',
      },
      {
        title: 'XP Legend',
        description: 'Earn 5,000 XP',
        reward: 600,
        icon: Gem,
        requirement: 5000,
        type: 'xp',
      },
    ],
  },
  {
    title: 'Category Achievements',
    description:
      'Build real momentum across every part of your life.',
    tone: 'blue',
    achievements: [
      {
        title: 'Fitness Mode',
        description: 'Complete 20 fitness tasks',
        reward: 200,
        icon: Dumbbell,
        requirement: 20,
        category: 'Fitness',
        color: 'rose',
      },
      {
        title: 'Coding Beast',
        description: 'Complete 20 coding tasks',
        reward: 200,
        icon: Code2,
        requirement: 20,
        category: 'Coding',
        color: 'emerald',
      },
      {
        title: 'Study Focus',
        description: 'Complete 20 study tasks',
        reward: 200,
        icon: BookOpen,
        requirement: 20,
        category: 'Study',
        color: 'blue',
      },
      {
        title: 'English Speaker',
        description: 'Complete 20 English tasks',
        reward: 200,
        icon: Mic2,
        requirement: 20,
        category: 'English',
        color: 'amber',
      },
      {
        title: 'Money Mindset',
        description: 'Complete 20 money tasks',
        reward: 200,
        icon: Wallet,
        requirement: 20,
        category: 'Money',
        color: 'violet',
      },
    ],
  },
];

const toneStyles = {
  amber: {
    icon:
      'border-amber-400/20 bg-amber-400/[0.08] text-amber-200',
    glow:
      'shadow-[0_0_26px_rgba(251,191,36,0.07)]',
  },
  cyan: {
    icon:
      'border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-200',
    glow:
      'shadow-[0_0_26px_rgba(34,211,238,0.07)]',
  },
  blue: {
    icon:
      'border-blue-400/20 bg-blue-400/[0.08] text-blue-200',
    glow:
      'shadow-[0_0_26px_rgba(96,165,250,0.07)]',
  },
  emerald: {
    icon:
      'border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-200',
    glow:
      'shadow-[0_0_26px_rgba(52,211,153,0.07)]',
  },
};

const categoryIconStyles = {
  rose:
    'border-rose-400/20 bg-rose-400/10 text-rose-200',
  emerald:
    'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
  blue:
    'border-blue-400/20 bg-blue-400/10 text-blue-200',
  amber:
    'border-amber-400/20 bg-amber-400/10 text-amber-200',
  violet:
    'border-violet-400/20 bg-violet-400/10 text-violet-200',
};

function getAchievementState(achievement, stats) {
  let current = 0;

  if (achievement.type === 'streak') {
    current = stats.currentStreak;
  }

  if (achievement.type === 'xp') {
    current = stats.totalXp;
  }

  if (achievement.category) {
    current =
      stats.categoryTaskCounts[achievement.category] || 0;
  }

  const completed = current >= achievement.requirement;

  const progress = Math.min(
    Math.round(
      (current / achievement.requirement) * 100,
    ),
    100,
  );

  let progressLabel;

  if (achievement.type === 'streak') {
    progressLabel = `${Math.min(
      current,
      achievement.requirement,
    )} / ${achievement.requirement} days`;
  } else if (achievement.type === 'xp') {
    progressLabel = `${Math.min(
      current,
      achievement.requirement,
    ).toLocaleString()} / ${achievement.requirement.toLocaleString()} XP`;
  } else {
    progressLabel = `${Math.min(
      current,
      achievement.requirement,
    )} / ${achievement.requirement} tasks`;
  }

  return {
    ...achievement,
    status: completed
      ? 'unlocked'
      : current > 0
        ? 'in-progress'
        : 'locked',
    progress,
    progressLabel,
  };
}

function AchievementCard({ achievement, tone }) {
  const {
    title,
    description,
    reward,
    icon: Icon,
    status,
    progress,
    progressLabel,
    color,
  } = achievement;

  const unlocked = status === 'unlocked';
  const inProgress = status === 'in-progress';

  const styles = toneStyles[tone];

  const iconStyle = color
    ? categoryIconStyles[color]
    : styles.icon;

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border p-4 transition duration-200 hover:-translate-y-0.5 ${
        unlocked
          ? `border-cyan-400/20 bg-slate-900/90 ${styles.glow} hover:border-cyan-300/35`
          : inProgress
            ? 'border-slate-700 bg-slate-900/80 hover:border-slate-600'
            : 'border-slate-800/80 bg-slate-950/35 hover:border-slate-700'
      }`}
    >
      {unlocked && (
        <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
      )}

      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
            unlocked || inProgress
              ? iconStyle
              : 'border-slate-800 bg-slate-900 text-slate-600'
          }`}
        >
          {unlocked || inProgress ? (
            <Icon className="h-5 w-5" />
          ) : (
            <LockKeyhole className="h-4 w-4" />
          )}
        </span>

        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold ${
            unlocked
              ? 'border-emerald-400/15 bg-emerald-400/[0.07] text-emerald-200'
              : inProgress
                ? 'border-cyan-400/15 bg-cyan-400/[0.06] text-cyan-200'
                : 'border-slate-800 bg-slate-900/70 text-slate-500'
          }`}
        >
          {unlocked ? (
            <Check className="h-3 w-3" />
          ) : (
            !inProgress && (
              <LockKeyhole className="h-3 w-3" />
            )
          )}

          {unlocked
            ? 'Unlocked'
            : inProgress
              ? 'In progress'
              : 'Locked'}
        </span>
      </div>

      <h3
        className={`mt-4 text-sm font-semibold ${
          unlocked
            ? 'text-white'
            : inProgress
              ? 'text-slate-100'
              : 'text-slate-300'
        }`}
      >
        {title}
      </h3>

      <p className="mt-1 min-h-8 text-xs leading-5 text-slate-500">
        {description}
      </p>

      <div className="mt-3">
        <div className="mb-1.5 flex items-center justify-between gap-2 text-[10px]">
          <span className="text-slate-500">
            {progressLabel}
          </span>

          <span
            className={
              unlocked
                ? 'text-emerald-300'
                : inProgress
                  ? 'text-cyan-200'
                  : 'text-slate-500'
            }
          >
            {unlocked ? '100%' : `${progress}%`}
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full rounded-full transition-[width] duration-1000 ease-out ${
              unlocked
                ? 'bg-emerald-400'
                : inProgress
                  ? 'animate-pulse bg-cyan-300'
                  : 'bg-slate-600'
            }`}
            style={{
              width: `${unlocked ? 100 : progress}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-800/70 pt-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600">
          Reward
        </span>

        <span
          className={`text-xs font-semibold ${
            unlocked
              ? 'text-amber-200'
              : 'text-slate-400'
          }`}
        >
          +{reward} XP
        </span>
      </div>
    </article>
  );
}

function Achievements() {
  const {
    tasks,
    currentStreak,
    bestStreak,
    totalXp,
  } = useApp();

  const completedTasks = tasks.filter(
    (task) => task.completed,
  );

  const categoryTaskCounts = completedTasks.reduce(
    (result, task) => {
      result[task.category] =
        (result[task.category] || 0) + 1;

      return result;
    },
    {},
  );

  const stats = {
    currentStreak,
    bestStreak,
    totalXp,
    categoryTaskCounts,
  };

  const dynamicCategories =
    achievementsByCategory.map((category) => ({
      ...category,
      achievements: category.achievements.map(
        (achievement) =>
          getAchievementState(
            achievement,
            stats,
          ),
      ),
    }));

  const allAchievements =
    dynamicCategories.flatMap(
      (category) => category.achievements,
    );

  const unlockedAchievements =
    allAchievements.filter(
      (achievement) =>
        achievement.status === 'unlocked',
    ).length;

  const totalAchievements =
    allAchievements.length;

  const challengeDay = Math.min(
    Math.max(currentStreak, 1),
    90,
  );

  const nextStreakMilestones = [30, 60, 90];

  const nextMilestone =
    nextStreakMilestones.find(
      (milestone) =>
        currentStreak < milestone,
    ) || 90;

  const milestoneProgress = Math.min(
    Math.round(
      (currentStreak / nextMilestone) * 100,
    ),
    100,
  );

  const daysToMilestone = Math.max(
    nextMilestone - currentStreak,
    0,
  );

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75">
              Winter Arc 2026
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Achievements
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Build your legacy one milestone at a time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-300">
              <Trophy className="h-3.5 w-3.5 text-cyan-200" />
              {challengeDay} / 90 Days Completed
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-2 text-[11px] font-medium text-emerald-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
              </span>

              Progress active
            </div>
          </div>
        </header>

        <section
          aria-label="Achievement summary"
          className="mb-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              label: 'Achievements Unlocked',
              value: unlockedAchievements,
              detail: 'Keep earning your legacy',
              icon: Award,
              accent: 'text-cyan-200',
              iconBg:
                'border-cyan-400/20 bg-cyan-400/[0.08]',
            },
            {
              label: 'Total Achievements',
              value: totalAchievements,
              detail: 'Across 3 categories',
              icon: Trophy,
              accent: 'text-blue-200',
              iconBg:
                'border-blue-400/20 bg-blue-400/[0.08]',
            },
            {
              label: 'Current Streak',
              value: currentStreak,
              suffix: 'days',
              detail: `Your best is ${bestStreak} days`,
              icon: Flame,
              accent: 'text-orange-200',
              iconBg:
                'border-orange-400/20 bg-orange-400/[0.08]',
            },
            {
              label: 'Total XP',
              value: totalXp.toLocaleString(),
              detail:
                'A little closer every day',
              icon: Zap,
              accent: 'text-amber-200',
              iconBg:
                'border-amber-400/20 bg-amber-400/[0.08]',
            },
          ].map(
            ({
              label,
              value,
              suffix,
              detail,
              icon: Icon,
              accent,
              iconBg,
            }) => (
              <article
                key={label}
                className="group rounded-2xl border border-slate-800/90 bg-slate-900/75 p-4 shadow-[0_16px_38px_rgba(2,6,23,0.24)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900"
              >
                <div
                  className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl border ${iconBg} ${accent}`}
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
                    <span className="text-sm text-slate-400">
                      {suffix}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  {detail}
                </p>
              </article>
            ),
          )}
        </section>

        <section className="mb-7 overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-900/80 shadow-[0_20px_55px_rgba(8,47,73,0.16)]">
          <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.09] text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.12)]">
                <Flame className="h-6 w-6" />
              </span>

              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/70">
                    Next milestone
                  </span>

                  <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-2 py-0.5 text-[10px] font-medium text-cyan-100">
                    +300 XP
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  {nextMilestone} Day Streak
                </h2>

                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-400">
                  Keep the rhythm going and make this milestone yours.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-64">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {currentStreak} / {nextMilestone} days
                </span>

                <span className="font-semibold text-cyan-100">
                  {milestoneProgress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full animate-pulse rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.45)]"
                  style={{
                    width: `${milestoneProgress}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-right text-[10px] text-slate-500">
                {daysToMilestone === 0
                  ? 'Milestone reached'
                  : `${daysToMilestone} days to your next reward`}
              </p>
            </div>
          </div>
        </section>

        <div className="space-y-7">
          {dynamicCategories.map((category) => (
            <section key={category.title}>
              <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h2 className="text-base font-semibold text-white sm:text-lg">
                    {category.title}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {category.description}
                  </p>
                </div>

                <span className="text-xs text-slate-500">
                  {
                    category.achievements.filter(
                      (achievement) =>
                        achievement.status ===
                        'unlocked',
                    ).length
                  }{' '}
                  unlocked
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {category.achievements.map(
                  (achievement) => (
                    <AchievementCard
                      key={achievement.title}
                      achievement={achievement}
                      tone={category.tone}
                    />
                  ),
                )}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-7 rounded-2xl border border-slate-800/90 bg-slate-900/75 p-4 shadow-[0_18px_45px_rgba(2,6,23,0.22)] backdrop-blur-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-white sm:text-lg">
                Recent Unlocks
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Live achievement progress
              </p>
            </div>

            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-400/15 bg-amber-400/[0.06] text-amber-200">
              <Sparkles className="h-4 w-4" />
            </span>
          </div>

          <div className="grid gap-2 md:grid-cols-3">
            {allAchievements
              .filter(
                (achievement) =>
                  achievement.status ===
                  'unlocked',
              )
              .slice(-3)
              .map((achievement) => {
                const Icon = achievement.icon;

                return (
                  <article
                    key={achievement.title}
                    className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-950/35 p-3"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                        achievement.color
                          ? categoryIconStyles[
                              achievement.color
                            ]
                          : toneStyles.cyan.icon
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-medium text-slate-100">
                        {achievement.title}
                      </h3>

                      <p className="mt-0.5 text-[11px] text-slate-500">
                        Achievement unlocked
                      </p>
                    </div>

                    <span className="shrink-0 text-xs font-semibold text-amber-200">
                      +{achievement.reward} XP
                    </span>
                  </article>
                );
              })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Achievements;