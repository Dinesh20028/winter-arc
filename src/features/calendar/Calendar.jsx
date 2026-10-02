import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  Code2,
  Dumbbell,
  Flame,
  Languages,
  Target,
  TrendingUp,
  Wallet,
  Zap,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTodayKey } from '../../data/dailyHistory';
import { supabase } from '../../lib/supabase';

const weekdays = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
];

const categories = [
  'Fitness',
  'Coding',
  'Study',
  'English',
  'Money',
];

const challengeStart = new Date(2026, 9, 1);
const challengeEnd = new Date(2026, 11, 31);

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getMonthStart(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    1,
  );
}

function getMonthName(date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

function getChallengeDay(date) {
  const current = new Date(date);
  current.setHours(0, 0, 0, 0);

  const start = new Date(challengeStart);
  start.setHours(0, 0, 0, 0);

  const end = new Date(challengeEnd);
  end.setHours(0, 0, 0, 0);

  if (current < start) {
    return 0;
  }

  if (current > end) {
    return 90;
  }

  return Math.floor(
    (current - start) / (1000 * 60 * 60 * 24),
  ) + 1;
}

function getCalendarDays(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Convert Sunday=0 to Monday=0.
  const leadingDays =
    (firstDay.getDay() + 6) % 7;

  const daysInMonth = lastDay.getDate();

  const previousMonthLastDay = new Date(
    year,
    month,
    0,
  ).getDate();

  const days = [];

  for (let i = leadingDays - 1; i >= 0; i -= 1) {
    days.push({
      date: previousMonthLastDay - i,
      month: 'previous',
      year:
        month === 0
          ? year - 1
          : year,
      monthNumber:
        month === 0
          ? 12
          : month,
    });
  }

  for (let date = 1; date <= daysInMonth; date += 1) {
    days.push({
      date,
      month: 'current',
      year,
      monthNumber: month + 1,
    });
  }

  const remainingDays =
    42 - days.length;

  for (
    let date = 1;
    date <= remainingDays;
    date += 1
  ) {
    days.push({
      date,
      month: 'next',
      year:
        month === 11
          ? year + 1
          : year,
      monthNumber:
        month === 11
          ? 1
          : month + 2,
    });
  }

  return days;
}

function isWithinChallenge(dateKey) {
  return (
    dateKey >= formatDateKey(challengeStart) &&
    dateKey <= formatDateKey(challengeEnd)
  );
}

function getCompletionPercentage(progress) {
  if (!progress) {
    return 0;
  }

  if (
    typeof progress.completed_task_count ===
      'number' &&
    typeof progress.total_possible_xp ===
      'number' &&
    progress.total_possible_xp > 0
  ) {
    if (progress.day_complete) {
      return 100;
    }
  }

  if (progress.tasks) {
    const tasks = Array.isArray(progress.tasks)
      ? progress.tasks
      : [];

    if (tasks.length > 0) {
      const completed = tasks.filter(
        (task) => task.completed,
      ).length;

      return Math.round(
        (completed / tasks.length) * 100,
      );
    }
  }

  if (progress.day_complete) {
    return 100;
  }

  return 0;
}

function GlassCard({
  children,
  className = '',
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-800/90 bg-slate-900/75 shadow-[0_18px_45px_rgba(2,6,23,0.24)] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

function DayCell({
  date,
  month,
  year,
  monthNumber,
  dailyProgress,
  todayKey,
}) {
  const dateKey = `${year}-${String(
    monthNumber,
  ).padStart(2, '0')}-${String(date).padStart(
    2,
    '0',
  )}`;

  const progress = dailyProgress[dateKey];
  const isCurrentMonth = month === 'current';
  const isChallengeDate =
    isWithinChallenge(dateKey);

  const completion =
    getCompletionPercentage(progress);

  const isToday = dateKey === todayKey;

  let status = 'outside';

  if (isCurrentMonth) {
    if (isToday) {
      status = 'today';
    } else if (progress?.day_complete) {
      status = 'completed';
    } else if (
      isChallengeDate &&
      dateKey < todayKey
    ) {
      status = 'missed';
    } else if (
      isChallengeDate &&
      dateKey > todayKey
    ) {
      status = 'upcoming';
    } else {
      status = 'outside';
    }
  }

  const isChallenge =
    isCurrentMonth && isChallengeDate;

  return (
    <div
      className={[
        'relative min-h-20 border-r border-t border-slate-800/70 p-2 transition sm:min-h-24 sm:p-3',
        isCurrentMonth
          ? 'bg-slate-950/25 hover:bg-slate-800/35'
          : 'bg-slate-950/55 text-slate-700',
        isToday
          ? 'z-10 bg-cyan-400/[0.08] shadow-[inset_0_0_24px_rgba(34,211,238,0.1)]'
          : '',
        status === 'completed'
          ? 'bg-emerald-400/[0.05]'
          : '',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-1">
        <span
          className={[
            'text-xs font-semibold sm:text-sm',
            isToday
              ? 'text-cyan-100'
              : status === 'completed'
                ? 'text-emerald-200'
                : isCurrentMonth
                  ? 'text-slate-300'
                  : 'text-slate-700',
          ].join(' ')}
        >
          {date}
        </span>

        {isToday && (
          <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
        )}
      </div>

      {isToday && (
        <span className="mt-4 block text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-200 sm:mt-6">
          Today
        </span>
      )}

      {status === 'completed' && (
        <>
          <span className="mt-4 block text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-300 sm:mt-6">
            Complete
          </span>

          <span className="absolute bottom-2 right-2 text-[9px] font-semibold text-emerald-300 sm:bottom-3 sm:right-3">
            {completion}%
          </span>
        </>
      )}

      {status === 'missed' && (
        <span className="mt-4 block h-1 w-5 rounded-full bg-rose-400/60 sm:mt-6" />
      )}

      {status === 'upcoming' && (
        <span className="absolute bottom-2 left-2 h-1 w-1 rounded-full bg-slate-700 sm:bottom-3 sm:left-3" />
      )}

      {isChallenge &&
        status !== 'outside' &&
        progress?.xp_earned > 0 && (
          <span className="absolute bottom-2 right-2 text-[9px] font-medium text-cyan-300/80 sm:bottom-3 sm:right-3">
            +{progress.xp_earned} XP
          </span>
        )}
    </div>
  );
}

function LegendItem({
  label,
  type,
}) {
  const marker = {
    completed: 'bg-emerald-300',
    today:
      'border border-cyan-200 bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.7)]',
    missed:
      'h-1 w-5 rounded-full bg-rose-400/70',
    upcoming: 'bg-slate-700',
  }[type];

  return (
    <span className="flex items-center gap-2 text-[11px] text-slate-400">
      <span
        className={`h-2 w-2 rounded-full ${marker}`}
      />
      {label}
    </span>
  );
}

function Calendar() {
  const {
    currentStreak,
    bestStreak,
    tasks,
  } = useApp();

  const todayKey = getTodayKey();

  const [selectedMonth, setSelectedMonth] =
    useState(() => {
      const today = new Date();

      if (
        today >= challengeStart &&
        today <= challengeEnd
      ) {
        return getMonthStart(today);
      }

      return new Date(2026, 9, 1);
    });

  const [dailyProgress, setDailyProgress] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState('');

  const monthStart = getMonthStart(
    selectedMonth,
  );

  const monthEnd = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth() + 1,
    0,
  );

  useEffect(() => {
    let mounted = true;

    const loadCalendarProgress =
      async () => {
        setLoading(true);
        setErrorMessage('');

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          if (mounted) {
            setLoading(false);
            setErrorMessage(
              'Unable to identify your account.',
            );
          }

          return;
        }

        const { data, error } =
          await supabase
            .from('daily_progress')
            .select(
              `
                date,
                completed_task_count,
                total_possible_xp,
                xp_earned,
                day_complete,
                tasks,
                updated_at
              `,
            )
            .eq('user_id', user.id)
            .gte(
              'date',
              formatDateKey(challengeStart),
            )
            .lte(
              'date',
              formatDateKey(challengeEnd),
            )
            .order('date', {
              ascending: true,
            });

        if (!mounted) {
          return;
        }

        if (error) {
          console.error(
            'Could not load calendar progress:',
            error,
          );

          setErrorMessage(
            'Could not load your calendar data.',
          );
          setDailyProgress({});
          setLoading(false);

          return;
        }

        const progressMap =
          (data || []).reduce(
            (result, row) => {
              result[row.date] = row;
              return result;
            },
            {},
          );

        setDailyProgress(progressMap);
        setLoading(false);
      };

    loadCalendarProgress();

    const channel = supabase
      .channel('winter-arc-calendar')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'daily_progress',
        },
        (payload) => {
          const changedRow =
            payload.new || payload.old;

          if (
            changedRow?.user_id
          ) {
            loadCalendarProgress();
          }
        },
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const challengeToday = useMemo(
    () => getChallengeDay(new Date()),
    [],
  );

  const completedDays = useMemo(() => {
    return Object.values(dailyProgress).filter(
      (progress) =>
        progress?.day_complete === true,
    ).length;
  }, [dailyProgress]);

  const challengeElapsedDays =
    Math.min(
      Math.max(challengeToday, 0),
      90,
    );

  const completionRate =
    challengeElapsedDays > 0
      ? Math.min(
          100,
          Math.round(
            (completedDays /
              challengeElapsedDays) *
              100,
          ),
        )
      : 0;

  const todayProgress =
    dailyProgress[todayKey] || null;

  const todayCompletion =
    getCompletionPercentage(todayProgress);

  const monthDays =
    getCalendarDays(selectedMonth);

  const monthLabel =
    getMonthName(selectedMonth);

  const canGoPrevious =
    selectedMonth.getTime() >
    getMonthStart(challengeStart).getTime();

  const canGoNext =
    selectedMonth.getTime() <
    getMonthStart(challengeEnd).getTime();

  const focusAreas = categories.map(
    (category) => {
      let value = 0;

      if (
        todayProgress?.tasks &&
        Array.isArray(todayProgress.tasks)
      ) {
        const categoryTasks =
          todayProgress.tasks.filter(
            (task) =>
              task.category === category,
          );

        const completedCategoryTasks =
          categoryTasks.filter(
            (task) => task.completed,
          );

        value =
          categoryTasks.length > 0
            ? Math.round(
                (completedCategoryTasks.length /
                  categoryTasks.length) *
                  100,
              )
            : 0;
      } else if (
        todayProgress?.day_complete
      ) {
        value = 100;
      }

      const config = {
        Fitness: {
          icon: Dumbbell,
          bar: 'bg-rose-400',
          iconStyle:
            'text-rose-200 border-rose-400/20 bg-rose-400/10',
        },
        Coding: {
          icon: Code2,
          bar: 'bg-emerald-400',
          iconStyle:
            'text-emerald-200 border-emerald-400/20 bg-emerald-400/10',
        },
        Study: {
          icon: BookOpen,
          bar: 'bg-blue-400',
          iconStyle:
            'text-blue-200 border-blue-400/20 bg-blue-400/10',
        },
        English: {
          icon: Languages,
          bar: 'bg-amber-400',
          iconStyle:
            'text-amber-200 border-amber-400/20 bg-amber-400/10',
        },
        Money: {
          icon: Wallet,
          bar: 'bg-violet-400',
          iconStyle:
            'text-violet-200 border-violet-400/20 bg-violet-400/10',
        },
      }[category];

      return {
        label: category,
        value,
        ...config,
      };
    },
  );

  const summaryStats = [
    {
      label: 'Challenge Day',
      value: `${challengeToday || 0} / 90`,
      icon: Target,
      accent:
        'text-cyan-200 border-cyan-400/20 bg-cyan-400/[0.08]',
    },
    {
      label: 'Completed Days',
      value: completedDays,
      icon: Check,
      accent:
        'text-emerald-200 border-emerald-400/20 bg-emerald-400/[0.08]',
    },
    {
      label: 'Current Streak',
      value: `${currentStreak} days`,
      icon: Flame,
      accent:
        'text-orange-200 border-orange-400/20 bg-orange-400/[0.08]',
    },
    {
      label: 'Best Streak',
      value: `${bestStreak} days`,
      icon: TrendingUp,
      accent:
        'text-amber-200 border-amber-400/20 bg-amber-400/[0.08]',
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: CalendarDays,
      accent:
        'text-blue-200 border-blue-400/20 bg-blue-400/[0.08]',
    },
  ];

  const monthlyXp = Object.entries(
    dailyProgress,
  ).reduce((total, [dateKey, progress]) => {
    if (
      dateKey >= formatDateKey(monthStart) &&
      dateKey <= formatDateKey(monthEnd)
    ) {
      return (
        total +
        Number(progress?.xp_earned || 0)
      );
    }

    return total;
  }, 0);

  const goToPreviousMonth = () => {
    if (!canGoPrevious) {
      return;
    }

    setSelectedMonth(
      new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() - 1,
        1,
      ),
    );
  };

  const goToNextMonth = () => {
    if (!canGoNext) {
      return;
    }

    setSelectedMonth(
      new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + 1,
        1,
      ),
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75">
              Winter Arc 2026
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Calendar
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Track your Winter Arc journey day by day.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-2 text-xs font-medium text-cyan-100 sm:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            </span>

            Day {challengeToday || 0} of 90
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
          <section>
            <GlassCard className="overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 p-4 sm:p-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/65">
                    Monthly view
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-white">
                    {monthLabel}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous month"
                    onClick={
                      goToPreviousMonth
                    }
                    disabled={!canGoPrevious}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-950/60 text-slate-400 transition hover:border-cyan-400/35 hover:text-cyan-100 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    aria-label="Next month"
                    onClick={goToNextMonth}
                    disabled={!canGoNext}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-950/60 text-slate-400 transition hover:border-cyan-400/35 hover:text-cyan-100 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 border-b border-slate-800/80 bg-slate-950/35">
                {weekdays.map((day) => (
                  <div
                    key={day}
                    className="px-1 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:text-xs"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 border-l border-slate-800/70">
                {monthDays.map(
                  (day, index) => (
                    <DayCell
                      key={`${day.year}-${day.monthNumber}-${day.date}-${index}`}
                      {...day}
                      dailyProgress={
                        dailyProgress
                      }
                      todayKey={todayKey}
                    />
                  ),
                )}
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-3 border-t border-slate-800/80 px-4 py-4 sm:px-5">
                <LegendItem
                  label="Completed"
                  type="completed"
                />

                <LegendItem
                  label="Today"
                  type="today"
                />

                <LegendItem
                  label="Missed"
                  type="missed"
                />

                <LegendItem
                  label="Upcoming"
                  type="upcoming"
                />
              </div>
            </GlassCard>
          </section>

          <aside className="space-y-6">
            <GlassCard className="p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-200">
                  <Target className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/65">
                    Challenge pulse
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-white">
                    Your challenge at a glance
                  </h2>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {summaryStats.map(
                  ({
                    label,
                    value,
                    icon: Icon,
                    accent,
                  }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-800/80 bg-slate-950/35 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-lg border ${accent}`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>

                        <span className="text-xs text-slate-400">
                          {label}
                        </span>
                      </div>

                      <span className="text-sm font-semibold text-white">
                        {value}
                      </span>
                    </div>
                  ),
                )}
              </div>

              <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-950/40 p-3">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Today&apos;s progress
                  </span>

                  <span className="font-semibold text-cyan-200">
                    {todayCompletion}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-all duration-500"
                    style={{
                      width: `${todayCompletion}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/40 p-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-cyan-300" />
                  <span className="text-xs text-slate-400">
                    {monthLabel} XP
                  </span>
                </div>

                <span className="text-sm font-semibold text-white">
                  {monthlyXp} XP
                </span>
              </div>

              {loading && (
                <p className="mt-4 text-center text-xs text-slate-500">
                  Loading calendar data...
                </p>
              )}

              {errorMessage && (
                <p className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/5 p-3 text-xs text-rose-200">
                  {errorMessage}
                </p>
              )}
            </GlassCard>

            <GlassCard className="p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/[0.08] text-blue-200">
                  <TrendingUp className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-200/65">
                    Focus pillars
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-white">
                    Today&apos;s Focus
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                {focusAreas.map(
                  ({
                    label,
                    value,
                    icon: Icon,
                    bar,
                    iconStyle,
                  }) => (
                    <div key={label}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-lg border ${iconStyle}`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </span>

                          <span className="text-xs font-semibold text-slate-200">
                            {label}
                          </span>
                        </div>

                        <span className="text-xs font-semibold text-slate-300">
                          {value}%
                        </span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full ${bar} transition-all duration-500`}
                          style={{
                            width: `${value}%`,
                          }}
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </GlassCard>
          </aside>
        </div>

        <section className="mt-6 rounded-2xl border border-cyan-400/15 bg-slate-900/60 p-5 text-center shadow-[0_18px_45px_rgba(8,47,73,0.12)]">
          <p className="text-sm font-semibold text-white">
            {monthLabel} is part of your Winter Arc journey.
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Show up today, then let the next day take care of itself.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Calendar;