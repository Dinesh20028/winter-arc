export function getTodayKey() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getYesterdayKey() {
  const yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, '0');
  const day = String(yesterday.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function saveDailyProgress(dateKey, progress) {
  localStorage.setItem(
    `winterArcProgress-${dateKey}`,
    JSON.stringify(progress),
  );
}

export function getDailyProgress(dateKey) {
  const savedProgress = localStorage.getItem(
    `winterArcProgress-${dateKey}`,
  );

  return savedProgress ? JSON.parse(savedProgress) : null;
}

export function getDailyHistory() {
  const history = {};

  Object.keys(localStorage).forEach((key) => {
    if (!key.startsWith('winterArcProgress-')) {
      return;
    }

    const dateKey = key.replace('winterArcProgress-', '');

    try {
      history[dateKey] = JSON.parse(
        localStorage.getItem(key),
      );
    } catch {
      history[dateKey] = null;
    }
  });

  return history;
}

export function getLifetimeStats() {
  const history = getDailyHistory();

  const days = Object.values(history).filter(Boolean);

  return days.reduce(
    (totals, day) => {
      totals.completedTasks += Number(
        day.completedTaskCount || 0,
      );

      totals.totalXp += Number(day.xpEarned || 0);

      totals.totalPossibleXp += Number(
        day.totalPossibleXp || 0,
      );

      return totals;
    },
    {
      completedTasks: 0,
      totalXp: 0,
      totalPossibleXp: 0,
    },
  );
}