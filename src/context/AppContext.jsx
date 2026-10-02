import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { dailyTasks as initialTasks } from '../features/tasks/taskData';
import {
  getTodayKey,
  saveDailyProgress,
} from '../data/dailyHistory';
import { supabase } from '../lib/supabase';

const AppContext = createContext(null);

const SETTINGS_KEY = 'winterArcSettings';
const NOTIFICATION_KEY =
  'winterArcNotificationHistory';

const defaultSettings = {
  theme: 'Dark',
  accentGlow: 'Winter Blue',
  compactMode: false,

  dailyMissionReminder: true,
  streakReminder: true,
  achievementNotifications: true,
  leaderboardUpdates: false,

  streakProtection: true,

  profileVisibility: 'Friends',
  showGlobalLeaderboard: true,
  showCurrentStreak: true,
};

function getRankFromStreak(streak) {
  if (streak >= 90) return 'Winter Master';
  if (streak >= 75) return 'Master';
  if (streak >= 60) return 'Elite';
  if (streak >= 45) return 'Diamond';
  if (streak >= 30) return 'Platinum';
  if (streak >= 14) return 'Gold';
  if (streak >= 7) return 'Silver';
  return 'Bronze';
}

function getNextRank(streak) {
  if (streak < 7) return 'Silver';
  if (streak < 14) return 'Gold';
  if (streak < 30) return 'Platinum';
  if (streak < 45) return 'Diamond';
  if (streak < 60) return 'Elite';
  if (streak < 75) return 'Master';
  if (streak < 90) return 'Winter Master';
  return 'Complete';
}

function getSavedSettings() {
  const savedSettings =
    localStorage.getItem(SETTINGS_KEY);

  if (!savedSettings) {
    return defaultSettings;
  }

  try {
    return {
      ...defaultSettings,
      ...JSON.parse(savedSettings),
    };
  } catch {
    return defaultSettings;
  }
}

function getNotificationHistory() {
  const savedHistory = localStorage.getItem(
    NOTIFICATION_KEY,
  );

  if (!savedHistory) {
    return {};
  }

  try {
    return JSON.parse(savedHistory);
  } catch {
    return {};
  }
}

function saveNotificationHistory(history) {
  localStorage.setItem(
    NOTIFICATION_KEY,
    JSON.stringify(history),
  );
}

function canUseNotifications() {
  return (
    typeof window !== 'undefined' &&
    'Notification' in window
  );
}

async function requestNotificationPermission() {
  if (!canUseNotifications()) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    return false;
  }

  try {
    const permission =
      await Notification.requestPermission();

    return permission === 'granted';
  } catch {
    return false;
  }
}

function sendNotification(
  title,
  body,
  notificationId,
) {
  if (!canUseNotifications()) {
    return false;
  }

  if (Notification.permission !== 'granted') {
    return false;
  }

  const history = getNotificationHistory();

  if (history[notificationId]) {
    return false;
  }

  try {
    new Notification(title, {
      body,
      icon: '/vite.svg',
      tag: notificationId,
    });

    history[notificationId] = new Date().toISOString();

    saveNotificationHistory(history);

    return true;
  } catch (error) {
    console.error(
      'Could not show notification:',
      error,
    );

    return false;
  }
}

function getCurrentHour() {
  return new Date().getHours();
}

function getCurrentMinute() {
  return new Date().getMinutes();
}

export function AppProvider({ children }) {
  const todayKey = getTodayKey();

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(
      `winterArcTasks-${todayKey}`,
    );

    return savedTasks
      ? JSON.parse(savedTasks)
      : initialTasks;
  });

  const [currentStreak, setCurrentStreak] =
    useState(0);

  const [bestStreak, setBestStreak] =
    useState(0);

  const [lifetimeXp, setLifetimeXp] =
    useState(0);

  const [settings, setSettings] =
    useState(getSavedSettings);

  const [userId, setUserId] = useState(null);

  /*
   * Get authenticated user.
   */
  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        setUserId(session?.user?.id || null);
      }
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          setUserId(session?.user?.id || null);
        }
      },
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const completedTasks = tasks.filter(
    (task) => task.completed,
  );

  /*
   * XP earned today.
   */
  const todayXp = completedTasks.reduce(
    (sum, task) => sum + task.xp,
    0,
  );

  const totalPossibleXp = tasks.reduce(
    (sum, task) => sum + task.xp,
    0,
  );

  const completedTaskCount =
    completedTasks.length;

  const isTodayComplete =
    tasks.length > 0 &&
    completedTaskCount === tasks.length;

  /*
   * Load current streak, best streak,
   * and lifetime XP from Supabase.
   */
  useEffect(() => {
    const loadStats = async () => {
      if (!userId) {
        return;
      }

      const [
        streakResult,
        xpResult,
      ] = await Promise.all([
        supabase.rpc('get_my_streak'),
        supabase.rpc('get_my_total_xp'),
      ]);

      if (streakResult.error) {
        console.error(
          'Could not load streak:',
          streakResult.error,
        );
      } else if (
        streakResult.data &&
        streakResult.data.length > 0
      ) {
        setCurrentStreak(
          Number(
            streakResult.data[0].current_streak || 0,
          ),
        );

        setBestStreak(
          Number(
            streakResult.data[0].best_streak || 0,
          ),
        );
      }

      if (xpResult.error) {
        console.error(
          'Could not load lifetime XP:',
          xpResult.error,
        );
      } else {
        setLifetimeXp(
          Number(xpResult.data || 0),
        );
      }
    };

    loadStats();
  }, [
    userId,
    isTodayComplete,
    completedTaskCount,
  ]);

  /*
   * Save today's progress locally
   * and to Supabase.
   */
  useEffect(() => {
    localStorage.setItem(
      `winterArcTasks-${todayKey}`,
      JSON.stringify(tasks),
    );

    const categories = [
      'Fitness',
      'Coding',
      'Study',
      'English',
      'Money',
    ];

    const dailyProgress =
      categories.reduce(
        (result, category) => {
          const categoryTasks =
            tasks.filter(
              (task) =>
                task.category === category,
            );

          const completedCategoryTasks =
            categoryTasks.filter(
              (task) => task.completed,
            );

          result[category] =
            categoryTasks.length > 0
              ? Math.round(
                  (completedCategoryTasks.length /
                    categoryTasks.length) *
                    100,
                )
              : 0;

          return result;
        },
        {},
      );

    const dailyHistoryEntry = {
      ...dailyProgress,
      completedTaskCount,
      totalTaskCount: tasks.length,
      xpEarned: todayXp,
      totalPossibleXp,
      completedTaskIds:
        completedTasks.map(
          (task) => task.id,
        ),
    };

    saveDailyProgress(
      todayKey,
      dailyHistoryEntry,
    );

    const saveToSupabase = async () => {
      if (!userId) {
        return;
      }

      const { error } = await supabase
        .from('daily_progress')
        .upsert(
          {
            user_id: userId,
            date: todayKey,
            completed_task_count:
              completedTaskCount,
            total_possible_xp:
              totalPossibleXp,
            xp_earned: todayXp,
            day_complete: isTodayComplete,
            tasks,
            updated_at:
              new Date().toISOString(),
          },
          {
            onConflict: 'user_id,date',
          },
        );

      if (error) {
        console.error(
          'Could not save daily progress:',
          error,
        );
        return;
      }

      /*
       * Refresh lifetime XP after today's
       * progress has been saved.
       */
      const { data: updatedXp, error: xpError } =
        await supabase.rpc(
          'get_my_total_xp',
        );

      if (xpError) {
        console.error(
          'Could not refresh lifetime XP:',
          xpError,
        );
        return;
      }

      setLifetimeXp(
        Number(updatedXp || 0),
      );
    };

    saveToSupabase();
  }, [
    tasks,
    todayKey,
    userId,
    completedTaskCount,
    todayXp,
    totalPossibleXp,
    isTodayComplete,
  ]);

  /*
   * Update Supabase profile with
   * database-backed streak, lifetime XP,
   * and leaderboard visibility.
   */
  useEffect(() => {
    const updateProfile = async () => {
      if (!userId) {
        return;
      }

      const profileRank =
        getRankFromStreak(currentStreak);

      const { error } = await supabase
        .from('profiles')
        .update({
          current_streak: currentStreak,
          best_streak: bestStreak,
          xp: lifetimeXp,
          rank: profileRank,
          show_global_leaderboard:
            settings.showGlobalLeaderboard,
        })
        .eq('id', userId);

      if (error) {
        console.error(
          'Could not update profile:',
          error,
        );
      }
    };

    updateProfile();
  }, [
    userId,
    currentStreak,
    bestStreak,
    lifetimeXp,
    settings.showGlobalLeaderboard,
  ]);

  /*
   * Save settings locally.
   */
  useEffect(() => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(settings),
    );

    document.documentElement.dataset.theme =
      settings.theme
        .toLowerCase()
        .replace(/\s+/g, '-');

    document.documentElement.dataset.accent =
      settings.accentGlow
        .toLowerCase()
        .replace(/\s+/g, '-');

    document.documentElement.dataset.compact =
      settings.compactMode
        ? 'true'
        : 'false';
  }, [settings]);

  /*
   * Ask for notification permission when
   * the user has at least one notification
   * feature enabled.
   */
  useEffect(() => {
    const notificationsEnabled =
      settings.dailyMissionReminder ||
      settings.streakReminder ||
      settings.achievementNotifications ||
      settings.leaderboardUpdates;

    if (!notificationsEnabled) {
      return;
    }

    if (!canUseNotifications()) {
      return;
    }

    if (Notification.permission !== 'default') {
      return;
    }

    const timer = window.setTimeout(() => {
      requestNotificationPermission();
    }, 2500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    settings.dailyMissionReminder,
    settings.streakReminder,
    settings.achievementNotifications,
    settings.leaderboardUpdates,
  ]);

  /*
   * Daily mission and streak reminders.
   *
   * 8:00 PM  -> daily mission reminder
   * 10:00 PM -> streak reminder
   *
   * The site must be open for these checks.
   */
  useEffect(() => {
    if (!userId) {
      return;
    }

    const checkReminders = () => {
      if (isTodayComplete) {
        return;
      }

      const hour = getCurrentHour();
      const minute = getCurrentMinute();

      if (
        settings.dailyMissionReminder &&
        hour >= 20 &&
        hour < 22
      ) {
        sendNotification(
          'Winter Arc — Daily Mission',
          `You have ${tasks.length - completedTaskCount} mission${
            tasks.length - completedTaskCount === 1
              ? ''
              : 's'
          } remaining today.`,
          `daily-mission-${todayKey}`,
        );
      }

      if (
        settings.streakReminder &&
        hour >= 22
      ) {
        sendNotification(
          'Winter Arc — Protect Your Streak',
          'Complete today’s mission before the day ends.',
          `streak-reminder-${todayKey}`,
        );
      }

      /*
       * Avoid unused-variable warnings while
       * keeping minute precision available
       * for future notification scheduling.
       */
      void minute;
    };

    checkReminders();

    const interval = window.setInterval(
      checkReminders,
      60 * 1000,
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [
    userId,
    todayKey,
    tasks.length,
    completedTaskCount,
    isTodayComplete,
    settings.dailyMissionReminder,
    settings.streakReminder,
  ]);

  /*
   * Achievement notification when today's
   * complete mission is achieved.
   */
  useEffect(() => {
    if (
      !userId ||
      !isTodayComplete ||
      !settings.achievementNotifications
    ) {
      return;
    }

    const notificationId =
      `achievement-day-${todayKey}`;

    sendNotification(
      'Winter Arc — Mission Complete! 🏆',
      `You completed all ${tasks.length} tasks today and earned ${todayXp} XP.`,
      notificationId,
    );
  }, [
    userId,
    todayKey,
    isTodayComplete,
    tasks.length,
    todayXp,
    settings.achievementNotifications,
  ]);

  /*
   * Notify on important streak milestones.
   */
  useEffect(() => {
    if (
      !userId ||
      !settings.achievementNotifications ||
      currentStreak <= 0
    ) {
      return;
    }

    const milestones = [
      7,
      14,
      30,
      45,
      60,
      75,
      90,
    ];

    if (!milestones.includes(currentStreak)) {
      return;
    }

    sendNotification(
      `Winter Arc — ${getRankFromStreak(
        currentStreak,
      )} Rank`,
      `You reached a ${currentStreak}-day streak! Keep going.`,
      `streak-milestone-${currentStreak}`,
    );
  }, [
    userId,
    currentStreak,
    settings.achievementNotifications,
  ]);

  /*
   * Watch the user's profile for leaderboard
   * XP/rank changes.
   */
  useEffect(() => {
    if (
      !userId ||
      !settings.leaderboardUpdates
    ) {
      return;
    }

    let mounted = true;

    const loadProfileSnapshot = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(
          'xp, rank, current_streak',
        )
        .eq('id', userId)
        .maybeSingle();

      if (error || !data || !mounted) {
        return;
      }

      const storageKey =
        `winterArcLeaderboardSnapshot-${userId}`;

      const previousRaw =
        localStorage.getItem(storageKey);

      const previous = previousRaw
        ? JSON.parse(previousRaw)
        : null;

      const current = {
        xp: Number(data.xp || 0),
        rank: data.rank || 'Bronze',
        currentStreak: Number(
          data.current_streak || 0,
        ),
      };

      localStorage.setItem(
        storageKey,
        JSON.stringify(current),
      );

      if (!previous) {
        return;
      }

      const rankChanged =
        previous.rank !== current.rank;

      const xpChanged =
        previous.xp !== current.xp;

      if (!rankChanged && !xpChanged) {
        return;
      }

      let body =
        'Your leaderboard profile has been updated.';

      if (rankChanged) {
        body = `You reached ${current.rank} rank.`;
      } else if (xpChanged) {
        body = `Your leaderboard XP is now ${current.xp}.`;
      }

      sendNotification(
        'Winter Arc — Leaderboard Update 🏅',
        body,
        `leaderboard-${current.xp}-${current.rank}`,
      );
    };

    loadProfileSnapshot();

    const channel = supabase
      .channel(
        `winter-arc-notifications-${userId}`,
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${userId}`,
        },
        () => {
          loadProfileSnapshot();
        },
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [
    userId,
    settings.leaderboardUpdates,
  ]);

  const updateSetting = (
    key,
    value,
  ) => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [key]: value,
    }));
  };

  const taskProgress =
    tasks.length > 0
      ? Math.min(
          (completedTaskCount /
            tasks.length) *
            100,
          100,
        )
      : 0;

  const todayXpProgress =
    totalPossibleXp > 0
      ? Math.min(
          (todayXp /
            totalPossibleXp) *
            100,
          100,
        )
      : 0;

  const rank =
    getRankFromStreak(
      currentStreak,
    );

  const nextRank =
    getNextRank(currentStreak);

  const level = Math.max(
    1,
    Math.floor(lifetimeXp / 100) + 1,
  );

  const xpIntoLevel =
    lifetimeXp % 100;

  const levelProgress =
    xpIntoLevel;

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        return {
          ...task,
          completed: !task.completed,
        };
      }),
    );
  };

  const value = {
    tasks,
    completedTasks,
    isTodayComplete,

    /*
     * Lifetime XP.
     */
    totalXp: lifetimeXp,

    /*
     * Today's XP.
     */
    todayXp,

    totalPossibleXp,
    xpProgress: todayXpProgress,

    lifetimeXp,

    currentStreak,
    bestStreak,

    completedTaskCount,
    taskProgress,

    rank,
    nextRank,

    toggleTask,

    level,
    xpIntoLevel,
    levelProgress,

    todayKey,

    settings,
    updateSetting,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context =
    useContext(AppContext);

  if (!context) {
    throw new Error(
      'useApp must be used within an AppProvider',
    );
  }

  return context;
}