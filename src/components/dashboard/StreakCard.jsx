import React from 'react';
import { Flame, Medal, Sparkles, Trophy } from 'lucide-react';

function StreakCard({
  currentStreak = 18,
  bestStreak = 24,
  rank = 'Gold',
  xpEarnedToday = 120,
  nextRankProgress = 72,
}) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-[radial-gradient(circle_at_top,_rgba(103,232,249,0.18),_rgba(15,23,42,0)_30%),linear-gradient(180deg,rgba(15,23,42,0.94),rgba(15,23,42,0.82))] p-5 shadow-[0_20px_50px_rgba(14,116,144,0.18)] backdrop-blur-xl">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_55%)]" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
              Streak
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">Momentum</h3>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-300/30 bg-orange-500/10 text-orange-200 shadow-[0_0_20px_rgba(251,146,60,0.2)]">
            <Flame className="h-5 w-5" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-700/80 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Current streak</span>
              <span className="text-2xl font-bold text-white">{currentStreak} days</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-700/80 bg-slate-950/60 p-3">
              <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                <Trophy className="h-3.5 w-3.5 text-amber-300" />
                Best streak
              </div>
              <div className="mt-2 text-xl font-semibold text-white">{bestStreak} days</div>
            </div>

            <div className="rounded-2xl border border-slate-700/80 bg-slate-950/60 p-3">
              <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                <Medal className="h-3.5 w-3.5 text-cyan-300" />
                Rank
              </div>
              <div className="mt-2 text-xl font-semibold text-white">{rank}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/80 bg-slate-950/60 p-4">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
              <span>XP earned today</span>
              <span className="font-semibold text-cyan-100">{xpEarnedToday}</span>
            </div>

            <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-slate-400">
              <span>Next rank</span>
              <span>Platinum</span>
            </div>

            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400"
                style={{ width: `${nextRankProgress}%` }}
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span>{nextRankProgress}% to next rank</span>
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default StreakCard;
