import React, { useState } from 'react';
import {
	Crown,
	Flame,
	LockKeyhole,
	Medal,
	Plus,
	Sparkles,
	Trophy,
	Users,
	Zap,
} from 'lucide-react';

const summaryCards = [
	{ label: 'Global Rank', value: '#12', detail: 'Top 5% this season', icon: Trophy },
	{ label: 'Current Streak', value: '18 days', detail: 'Keep your momentum', icon: Flame },
	{ label: 'Best Streak', value: '24 days', detail: 'Personal best', icon: Zap },
	{ label: 'Total XP', value: '1,840', detail: 'Across all missions', icon: Sparkles },
];

const leaderboardUsers = [
	{ name: 'Maya Sharma', global: 8, friends: 4, groups: 1, streak: 26, best: 38, level: 'Elite', xp: 2350 },
	{ name: 'Arjun Mehta', global: 9, friends: 1, groups: 4, streak: 22, best: 31, level: 'Diamond', xp: 2210 },
	{ name: 'Priya Nair', global: 10, friends: 6, groups: 3, streak: 20, best: 27, level: 'Diamond', xp: 2075 },
	{ name: 'Kabir Singh', global: 11, friends: 5, groups: 7, streak: 16, best: 29, level: 'Platinum', xp: 1960 },
	{ name: 'Dinesh', global: 12, friends: 3, groups: 2, streak: 18, best: 24, level: 'Gold', xp: 1840 },
	{ name: 'Ananya Rao', global: 13, friends: 2, groups: 5, streak: 14, best: 21, level: 'Gold', xp: 1765 },
	{ name: 'Rohan Das', global: 14, friends: 8, groups: 6, streak: 12, best: 19, level: 'Silver', xp: 1630 },
	{ name: 'Isha Kapoor', global: 15, friends: 7, groups: 8, streak: 10, best: 18, level: 'Silver', xp: 1515 },
	{ name: 'Dev Patel', global: 16, friends: 9, groups: 10, streak: 8, best: 15, level: 'Bronze', xp: 1380 },
	{ name: 'Neha Joshi', global: 17, friends: 10, groups: 9, streak: 6, best: 12, level: 'Bronze', xp: 1240 },
];

const leaderboardTabs = [
	{ label: 'Global', key: 'global', icon: Trophy },
	{ label: 'Friends', key: 'friends', icon: Users },
	{ label: 'Private Groups', key: 'groups', icon: LockKeyhole },
];

const levelStyles = {
	Bronze: 'border-orange-400/25 bg-orange-500/10 text-orange-200',
	Silver: 'border-slate-400/25 bg-slate-400/10 text-slate-200',
	Gold: 'border-amber-400/25 bg-amber-500/10 text-amber-200',
	Platinum: 'border-cyan-400/25 bg-cyan-500/10 text-cyan-200',
	Diamond: 'border-sky-400/25 bg-sky-500/10 text-sky-200',
	Elite: 'border-rose-400/25 bg-rose-500/10 text-rose-200',
	Master: 'border-violet-400/25 bg-violet-500/10 text-violet-200',
};

function Contest() {
	const [activeTab, setActiveTab] = useState('global');
	const [groupNotice, setGroupNotice] = useState(false);

	const rankedUsers = [...leaderboardUsers].sort((first, second) => first[activeTab] - second[activeTab]);

	return (
		<main className="min-h-screen overflow-x-hidden bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<header className="mb-6">
					<p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75">
						Winter Arc 2026
					</p>
					<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
						Contest &amp; Leaderboard
					</h1>
					<p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
						Compete with friends, build your streak, and climb the leaderboard.
					</p>
				</header>

				<section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{summaryCards.map(({ label, value, detail, icon: Icon }) => (
						<article
							key={label}
							className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/30"
						>
							<div className="mb-4 flex items-center justify-between gap-3">
								<p className="text-sm text-slate-300">{label}</p>
								<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-200">
									<Icon className="h-4 w-4" />
								</span>
							</div>
							<p className="text-2xl font-semibold text-white">{value}</p>
							<p className="mt-1 text-xs text-slate-400">{detail}</p>
						</article>
					))}
				</section>

				<section className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
					<article className="min-w-0 rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm sm:p-5">
						<div className="mb-5 flex flex-wrap items-center justify-between gap-4">
							<div>
								<p className="text-xs uppercase tracking-[0.2em] text-slate-400">Season standings</p>
								<h2 className="mt-1 text-xl font-semibold text-white">Leaderboard</h2>
							</div>
							<div className="flex max-w-full gap-1 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70 p-1">
								{leaderboardTabs.map(({ label, key, icon: Icon }) => (
									<button
										key={key}
										type="button"
										onClick={() => setActiveTab(key)}
										aria-pressed={activeTab === key}
										className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm ${
											activeTab === key
												? 'border border-cyan-400/30 bg-cyan-500/10 text-cyan-100'
												: 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
										}`}
									>
										<Icon className="h-3.5 w-3.5" />
										{label}
									</button>
								))}
							</div>
						</div>

						<div className="mb-3 hidden grid-cols-[42px_minmax(120px,1fr)_repeat(4,minmax(70px,0.65fr))] gap-3 px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:grid">
							<span>Rank</span>
							<span>Player</span>
							<span className="text-center">Streak</span>
							<span className="text-center">Best</span>
							<span className="text-center">Level</span>
							<span className="text-right">XP</span>
						</div>

						<div className="space-y-2">
							{rankedUsers.map((user) => {
								const isCurrentUser = user.name === 'Dinesh';
								const position = user[activeTab];

								return (
									<div
										key={user.name}
										className={`grid grid-cols-[38px_minmax(0,1fr)] items-center gap-x-3 gap-y-3 rounded-2xl border p-3 transition-all duration-200 sm:grid-cols-[42px_minmax(120px,1fr)_repeat(4,minmax(70px,0.65fr))] sm:gap-3 sm:px-4 ${
											isCurrentUser
												? 'border-cyan-400/35 bg-cyan-500/[0.09] shadow-[0_0_28px_rgba(34,211,238,0.08)]'
												: 'border-slate-800 bg-slate-950/55 hover:border-slate-700 hover:bg-slate-950/85'
										}`}
									>
										<div className="flex items-center gap-2">
											{position <= 3 ? (
												<Medal className={`h-4 w-4 ${position === 1 ? 'text-amber-300' : position === 2 ? 'text-slate-300' : 'text-orange-300'}`} />
											) : (
												<span className="w-4 text-center text-sm font-semibold text-slate-400">{position}</span>
											)}
										</div>

										<div className="flex min-w-0 items-center gap-3">
											<span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-xs font-bold ${isCurrentUser ? 'border-cyan-300/40 bg-cyan-400/15 text-cyan-100' : 'border-slate-700 bg-slate-800 text-slate-300'}`}>
												{user.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
											</span>
											<div className="min-w-0">
												<p className={`truncate text-sm font-semibold ${isCurrentUser ? 'text-cyan-50' : 'text-slate-100'}`}>
													{user.name}
													{isCurrentUser && <span className="ml-2 text-[10px] font-medium uppercase tracking-wide text-cyan-300">You</span>}
												</p>
												<p className="text-[10px] text-slate-500 sm:hidden">Rank #{position}</p>
											</div>
										</div>

										<div className="col-span-2 grid grid-cols-2 gap-2 sm:col-span-1 sm:block sm:text-center">
											<span className="text-[10px] uppercase tracking-wide text-slate-500 sm:hidden">Current streak</span>
											<span className="flex items-center gap-1.5 text-xs font-medium text-slate-200 sm:justify-center">
												<Flame className="h-3.5 w-3.5 text-orange-300" /> {user.streak} days
											</span>
										</div>

										<div className="col-span-2 grid grid-cols-2 gap-2 sm:col-span-1 sm:block sm:text-center">
											<span className="text-[10px] uppercase tracking-wide text-slate-500 sm:hidden">Best streak</span>
											<span className="text-xs font-medium text-slate-200">{user.best} days</span>
										</div>

										<div className="col-span-2 grid grid-cols-2 items-center gap-2 sm:col-span-1 sm:block">
											<span className="text-[10px] uppercase tracking-wide text-slate-500 sm:hidden">Rank level</span>
											<span className={`inline-flex w-fit rounded-full border px-2 py-1 text-[10px] font-semibold ${levelStyles[user.level]}`}>
												{user.level}
											</span>
										</div>

										<div className="col-span-2 flex items-center justify-between border-t border-slate-800/70 pt-2 sm:col-span-1 sm:justify-end sm:border-0 sm:pt-0">
											<span className="text-[10px] uppercase tracking-wide text-slate-500 sm:hidden">XP</span>
											<span className={`text-sm font-bold tabular-nums ${isCurrentUser ? 'text-cyan-200' : 'text-white'}`}>
												{user.xp.toLocaleString()}
											</span>
										</div>
									</div>
								);
							})}
						</div>
					</article>

					<aside className="space-y-5">
						<article className="rounded-3xl border border-cyan-400/25 bg-cyan-500/[0.07] p-5 shadow-[0_18px_45px_rgba(8,145,178,0.08)] backdrop-blur-sm">
							<div className="mb-4 flex items-center justify-between">
								<span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-400/10 text-cyan-100">
									<Trophy className="h-5 w-5" />
								</span>
								<span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-200">
									Global
								</span>
							</div>
							<p className="text-xs uppercase tracking-[0.2em] text-cyan-100/70">Your position</p>
							<div className="mt-2 flex items-end justify-between gap-3">
								<p className="text-4xl font-bold text-white">#12</p>
								<p className="pb-1 text-xs text-cyan-100/70">of active members</p>
							</div>
							<div className="mt-5 space-y-3 border-t border-cyan-200/10 pt-4">
								<div className="flex items-center justify-between text-sm">
									<span className="text-slate-300">Player</span>
									<span className="font-semibold text-white">Dinesh</span>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-slate-300">Current streak</span>
									<span className="font-semibold text-white">18 days</span>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-slate-300">Rank level</span>
									<span className="font-semibold text-cyan-100">Gold</span>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-slate-300">Total XP</span>
									<span className="font-semibold text-cyan-100">1,840</span>
								</div>
							</div>
						</article>

						<article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.35)] backdrop-blur-sm">
							<div className="mb-3 flex items-center gap-3">
								<span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-500/10 text-cyan-200">
									<Users className="h-5 w-5" />
								</span>
								<div>
									<p className="text-xs uppercase tracking-[0.18em] text-slate-400">Make it social</p>
									<h2 className="mt-1 text-lg font-semibold text-white">Private groups</h2>
								</div>
							</div>
							<p className="mb-4 text-sm leading-6 text-slate-300">
								Challenge your friends and keep each other moving through the Winter Arc.
							</p>
							<button
								type="button"
								onClick={() => setGroupNotice(true)}
								className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition-all duration-200 hover:border-cyan-300/60 hover:bg-cyan-500/15"
							>
								<Plus className="h-4 w-4" />
								Create Private Group
							</button>
							{groupNotice && (
								<p className="mt-3 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-100">
									Private group creation is coming soon.
								</p>
							)}
						</article>

						<div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-xs leading-5 text-slate-400">
							Rankings use sample data for the Winter Arc prototype.
						</div>
					</aside>
				</section>
			</div>
		</main>
	);
}

export default Contest;
