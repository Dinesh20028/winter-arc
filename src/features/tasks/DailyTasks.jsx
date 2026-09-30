import React, { useState } from 'react';
import { Check, CheckCheck, Flame, Sparkles, Target, Zap } from 'lucide-react';
import { dailyTasks as initialTasks } from './taskData';

const categoryStyles = {
  Fitness: 'border-red-400/30 bg-red-500/10 text-red-200',
  Coding: 'border-green-400/30 bg-green-500/10 text-green-200',
  Study: 'border-blue-400/30 bg-blue-500/10 text-blue-200',
  English: 'border-yellow-400/30 bg-yellow-500/10 text-yellow-200',
  Money: 'border-violet-400/30 bg-violet-500/10 text-violet-200',
};

function DailyTasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalXp = tasks
    .filter((task) => task.completed)
    .reduce((sum, task) => sum + task.xp, 0);
  const progress = (completedCount / tasks.length) * 100;

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <section className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-800/80 bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.12),_rgba(15,23,42,0)_28%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(15,23,42,0.85))] p-4 shadow-[0_20px_60px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:p-6 lg:p-8">
        <header className="mb-6 flex flex-col gap-4 border-b border-slate-800 pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
              <Sparkles className="h-3.5 w-3.5" />
              Daily missions
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Daily Tasks
            </h2>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-100">
            Complete today's missions and build your streak.
          </div>
        </header>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
              <CheckCheck className="h-3.5 w-3.5 text-emerald-300" />
              Progress
            </div>
            <div className="text-2xl font-semibold text-white">
              {completedCount} <span className="text-base text-slate-400">/ {tasks.length}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
              <Flame className="h-3.5 w-3.5 text-orange-300" />
              XP earned
            </div>
            <div className="text-2xl font-semibold text-white">{totalXp}</div>
          </div>

          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
              <Target className="h-3.5 w-3.5 text-cyan-300" />
              Completion
            </div>
            <div className="text-2xl font-semibold text-white">{Math.round(progress)}%</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
            <span>Daily progress</span>
            <span>{completedCount} / {tasks.length} completed</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <ul className="space-y-3">
          {tasks.map((task) => {
            const isCompleted = task.completed;
            const categoryClass = categoryStyles[task.category] || categoryStyles.Fitness;

            return (
              <li
                key={task.id}
                className={`rounded-2xl border p-3 transition-all duration-200 ${
                  isCompleted
                    ? 'border-emerald-500/30 bg-emerald-500/5 opacity-70'
                    : 'border-slate-800 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className="flex w-full items-center gap-3 text-left"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors duration-200 ${
                      isCompleted
                        ? 'border-emerald-400 bg-emerald-500 text-white'
                        : 'border-slate-600 bg-slate-950 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p
                        className={`text-base font-medium text-white ${
                          isCompleted ? 'line-through decoration-slate-400' : ''
                        }`}
                      >
                        {task.title}
                      </p>

                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-300">
                        <Zap className="h-3 w-3 text-cyan-300" />
                        +{task.xp} XP
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${categoryClass}`}>
                        {task.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        {isCompleted ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default DailyTasks;
