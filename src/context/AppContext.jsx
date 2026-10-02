import React, { createContext, useContext, useEffect, useState } from 'react';
import { dailyTasks as initialTasks } from '../features/tasks/taskData';
import {
  getTodayKey,
  saveDailyProgress,
} from '../data/dailyHistory';

const AppContext = createContext(null);

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

function getCurrentStreak() {
  let streak = 0;
  let checkDate = new Date();

  while (true) {
    const year = checkDate.getFullYear();
    const month = String(checkDate.getMonth() + 1).padStart(2, '0');
    const day = String(checkDate.getDate()).padStart(2, '0');

    const dateKey = `${year}-${month}-${day}`;

    const completed = localStorage.getItem(
      `winterArcCompleted-${dateKey}`,
    );

    if (completed !== 'true') {
      break;
    }

    streak += 1;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  return streak;
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

  const [currentStreak, setCurrentStreak] = useState(() =>
    getCurrentStreak(),
  );

  const [bestStreak, setBestStreak] = useState(() => {
    const savedBest = localStorage.getItem(
      'winterArcBestStreak',
    );

    return savedBest ? Number(savedBest) : 0;
  });

  const completedTasks = tasks.filter(
    (task) => task.completed,
  );

  const totalXp = completedTasks.reduce(
    (sum, task) => sum + task.xp,
    0,
  );

  const totalPossibleXp = tasks.reduce(
    (sum, task) => sum + task.xp,
    0,
  );

  const completedTaskCount = completedTasks.length;

  const isTodayComplete =
    tasks.length > 0 &&
    completedTaskCount === tasks.length;

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
    ];

    const dailyProgress = categories.reduce(
      (result, category) => {
        const categoryTasks = tasks.filter(
          (task) => task.category === category,
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
      xpEarned: totalXp,
      totalPossibleXp,
      completedTaskIds: completedTasks.map(
        (task) => task.id,
      ),
    };

    saveDailyProgress(
      todayKey,
      dailyHistoryEntry,
    );
  }, [
    tasks,
    todayKey,
    completedTaskCount,
    totalXp,
    totalPossibleXp,
  ]);

  useEffect(() => {
    const completionKey =
      `winterArcCompleted-${todayKey}`;

    if (isTodayComplete) {
      localStorage.setItem(
        completionKey,
        'true',
      );
    } else {
      localStorage.removeItem(
        completionKey,
      );
    }

    const updatedStreak = getCurrentStreak();

    setCurrentStreak(updatedStreak);

    setBestStreak((previousBest) => {
      const nextBest = Math.max(
        previousBest,
        updatedStreak,
      );

      localStorage.setItem(
        'winterArcBestStreak',
        String(nextBest),
      );

      return nextBest;
    });
  }, [isTodayComplete, todayKey]);

  const taskProgress =
    tasks.length > 0
      ? Math.min(
          (completedTaskCount / tasks.length) *
            100,
          100,
        )
      : 0;

  const xpProgress =
    totalPossibleXp > 0
      ? Math.min(
          (totalXp / totalPossibleXp) *
            100,
          100,
        )
      : 0;

  const rank =
    getRankFromStreak(currentStreak);

  const nextRank =
    getNextRank(currentStreak);

  const level = Math.max(
    1,
    Math.floor(totalXp / 100) + 1,
  );

  const xpIntoLevel = totalXp % 100;

  const levelProgress = xpIntoLevel;

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
    totalXp,
    totalPossibleXp,
    xpProgress,
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
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      'useApp must be used within an AppProvider',
    );
  }

  return context;
}