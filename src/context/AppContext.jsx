import React, { createContext, useContext, useState } from 'react';
import { dailyTasks as initialTasks } from '../features/tasks/taskData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [currentStreak] = useState(18);
  const [bestStreak] = useState(24);

  const completedTasks = tasks.filter((task) => task.completed);
  const totalXp = completedTasks.reduce((sum, task) => sum + task.xp, 0);
  const totalPossibleXp = tasks.reduce((sum, task) => sum + task.xp, 0);

  const completedTaskCount = completedTasks.length;
  const taskProgress = tasks.length > 0 ? Math.min((completedTaskCount / tasks.length) * 100, 100) : 0;
  const xpProgress = totalPossibleXp > 0 ? Math.min((totalXp / totalPossibleXp) * 100, 100) : 0;

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) return task;

        const isBecomingComplete = !task.completed;

        return { ...task, completed: isBecomingComplete };
      }),
    );
  };

  const value = {
    tasks,
    completedTasks,
    totalXp,
    totalPossibleXp,
    xpProgress,
    currentStreak,
    bestStreak,
    completedTaskCount,
    taskProgress,
    toggleTask,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
}
