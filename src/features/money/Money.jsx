import React, { useState } from 'react';
import {
	ArrowDownCircle,
	CalendarCheck,
	CheckCircle2,
	Circle,
	CircleDollarSign,
	CreditCard,
	PiggyBank,
	Play,
	Receipt,
	ShieldCheck,
	Target,
	TrendingUp,
	Wallet,
} from 'lucide-react';
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const overviewCards = [
	{ label: 'Savings Streak', value: '10 days', icon: TrendingUp },
	{ label: 'Saved This Month', value: '₹3,500', icon: PiggyBank },
	{ label: 'Monthly Savings Goal', value: '₹5,000', icon: Target },
	{ label: 'Money Progress', value: '70%', icon: CircleDollarSign },
];

const dailyPlan = [
	{ title: "Track today's spending", icon: Receipt },
	{ title: 'Review weekly budget', icon: CalendarCheck },
	{ title: 'Add money to savings', icon: ArrowDownCircle },
	{ title: 'Review savings goal', icon: Target },
];

const moneyStats = [
	{ label: 'Total Saved', value: '₹18,500', icon: PiggyBank },
	{ label: 'Monthly Budget', value: '₹12,000', icon: Wallet },
	{ label: 'Amount Spent', value: '₹8,500', icon: CreditCard },
	{ label: 'Savings Rate', value: '29%', icon: TrendingUp },
];

const weeklySpending = [
	{ day: 'Mon', amount: 800 },
	{ day: 'Tue', amount: 1100 },
	{ day: 'Wed', amount: 600 },
	{ day: 'Thu', amount: 1300 },
	{ day: 'Fri', amount: 900 },
	{ day: 'Sat', amount: 1500 },
	{ day: 'Sun', amount: 700 },
];

const savingsGoals = [
	{ name: 'Emergency Fund', progress: 45, icon: ShieldCheck },
	{ name: 'Education', progress: 60, icon: CalendarCheck },
	{ name: 'Fitness', progress: 35, icon: TrendingUp },
	{ name: 'Personal Goal', progress: 50, icon: Target },
];

const recentActivity = [
	{ title: 'Daily spending tracked', when: 'Today' },
	{ title: 'Weekly budget reviewed', when: 'Yesterday' },
	{ title: 'Savings updated', when: '2 days ago' },
	{ title: 'Expense review', when: '3 days ago' },
];

function Money() {
	const [sessionStarted, setSessionStarted] = useState(false);

	return (
		<main className="min-h-screen overflow-x-hidden bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<header className="mb-6">
					<p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75">
						Winter Arc 2026
					</p>
					<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Money</h1>
					<p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
						Build better money habits, control spending, and grow your savings.
					</p>
				</header>

				<section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{overviewCards.map(({ label, value, icon: Icon }) => (
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
						</article>
					))}
				</section>

				<section className="mb-6 grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
					<article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
						<div className="mb-5 flex flex-wrap items-start justify-between gap-4">
							<div>
								<p className="text-xs uppercase tracking-[0.22em] text-slate-400">Today's money plan</p>
								<h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">Build mindful money habits</h2>
							</div>
							<button
								type="button"
								onClick={() => setSessionStarted((started) => !started)}
								className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
									sessionStarted
										? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500/15'
										: 'border-cyan-400/30 bg-cyan-500/10 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.08)] hover:border-cyan-300/60 hover:bg-cyan-500/15'
								}`}
							>
								{sessionStarted ? <CheckCircle2 className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
								{sessionStarted ? 'Session Started' : 'Start Money Session'}
							</button>
						</div>

						{sessionStarted && (
							<div className="mb-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100 transition-all duration-200">
								Money session started. Take a moment to review your goals.
							</div>
						)}

						<div className="space-y-3">
							{dailyPlan.map(({ title, icon: Icon }) => (
								<div
									key={title}
									className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 transition-colors duration-200 hover:border-slate-700"
								>
									<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-500/10 text-cyan-200">
										<Icon className="h-4 w-4" />
									</span>
									<span className="min-w-0 flex-1 text-sm font-medium text-slate-200">{title}</span>
									<Circle className="h-4 w-4 shrink-0 text-slate-500" />
								</div>
							))}
						</div>
					</article>

					<article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
						<div className="mb-4 flex items-center justify-between gap-3">
							<div>
								<p className="text-xs uppercase tracking-[0.2em] text-slate-400">Your numbers</p>
								<h2 className="mt-1 text-lg font-semibold text-white">Money statistics</h2>
							</div>
							<Wallet className="h-5 w-5 text-cyan-300" />
						</div>
						<div className="space-y-3">
							{moneyStats.map(({ label, value, icon: Icon }) => (
								<div
									key={label}
									className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-3"
								>
									<span className="flex min-w-0 items-center gap-2 text-sm text-slate-300">
										<Icon className="h-4 w-4 shrink-0 text-cyan-300" />
										<span>{label}</span>
									</span>
									<span className="shrink-0 text-sm font-semibold text-white">{value}</span>
								</div>
							))}
						</div>
					</article>
				</section>

				<section className="mb-6 grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
					<article className="min-w-0 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
						<div className="mb-4 flex flex-wrap items-end justify-between gap-3">
							<div>
								<p className="text-xs uppercase tracking-[0.2em] text-slate-400">Weekly spending activity</p>
								<h2 className="mt-2 text-xl font-semibold text-white">Daily spending</h2>
							</div>
							<span className="text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-200/80">
								Spending (₹)
							</span>
						</div>
						<div className="h-[260px] w-full rounded-2xl border border-slate-800 bg-slate-950/70 p-3 sm:h-[280px] sm:p-4">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={weeklySpending} margin={{ top: 12, right: 12, left: -2, bottom: 8 }}>
									<CartesianGrid stroke="rgba(148, 163, 184, 0.16)" strokeDasharray="3 3" vertical={false} />
									<XAxis
										dataKey="day"
										axisLine={false}
										tickLine={false}
										tick={{ fill: '#cbd5e1', fontSize: 11 }}
										interval={0}
										height={28}
									/>
									<YAxis
										domain={[0, 1800]}
										ticks={[0, 500, 1000, 1500]}
										axisLine={false}
										tickLine={false}
										tick={{ fill: '#94a3b8', fontSize: 11 }}
										tickFormatter={(value) => `₹${value}`}
										width={52}
									/>
									<Tooltip
										formatter={(value) => [`₹${value}`, 'Spending']}
										labelStyle={{ color: '#e2e8f0', fontWeight: 600 }}
										contentStyle={{
											backgroundColor: 'rgba(15, 23, 42, 0.96)',
											border: '1px solid rgba(34, 211, 238, 0.3)',
											borderRadius: '12px',
											color: '#f8fafc',
										}}
										cursor={{ stroke: 'rgba(34, 211, 238, 0.35)', strokeWidth: 1 }}
									/>
									<Line
										type="monotone"
										dataKey="amount"
										stroke="#22d3ee"
										strokeWidth={3}
										dot={{ r: 3, fill: '#22d3ee', stroke: '#0f172a', strokeWidth: 2 }}
										activeDot={{ r: 5, fill: '#67e8f9', stroke: '#cffafe', strokeWidth: 2 }}
										animationDuration={900}
										animationEasing="ease-out"
										isAnimationActive
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</article>

					<article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
						<div className="mb-4 flex items-center gap-3">
							<span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-200">
								<PiggyBank className="h-5 w-5" />
							</span>
							<div>
								<p className="text-xs uppercase tracking-[0.18em] text-slate-400">Think long term</p>
								<h2 className="mt-1 text-lg font-semibold text-white">Money reminder</h2>
							</div>
						</div>
						<p className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-sm leading-6 text-cyan-100">
							Small savings every day can become a big difference over 90 days.
						</p>
					</article>
				</section>

				<section className="mb-6">
					<div className="mb-4 flex items-end justify-between gap-3">
						<div>
							<p className="text-xs uppercase tracking-[0.2em] text-slate-400">Steady progress</p>
							<h2 className="mt-1 text-xl font-semibold text-white">Savings progress</h2>
						</div>
						<span className="text-xs text-slate-400">4 goals</span>
					</div>
					<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						{savingsGoals.map(({ name, progress, icon: Icon }) => (
							<article
								key={name}
								className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/30"
							>
								<div className="mb-4 flex items-start justify-between gap-3">
									<span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-200">
										<Icon className="h-5 w-5" />
									</span>
									<span className="text-sm font-semibold text-cyan-200">{progress}%</span>
								</div>
								<h3 className="text-base font-semibold text-white">{name}</h3>
								<div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
									<div
										className="h-full rounded-full bg-cyan-400 transition-[width] duration-500"
										style={{ width: `${progress}%` }}
									/>
								</div>
								<p className="mt-2 text-xs text-slate-400">Goal progress</p>
							</article>
						))}
					</div>
				</section>

				<section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
					<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
						<div>
							<p className="text-xs uppercase tracking-[0.2em] text-slate-400">Your money log</p>
							<h2 className="mt-1 text-xl font-semibold text-white">Recent money activity</h2>
						</div>
						<span className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
							<Receipt className="h-4 w-4 text-cyan-300" /> Latest
						</span>
					</div>
					<div className="space-y-3">
						{recentActivity.map(({ title, when }) => (
							<div
								key={title}
								className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 transition-colors duration-200 hover:border-slate-700"
							>
								<div className="flex min-w-0 items-center gap-3">
									<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-400/25 bg-emerald-500/10 text-emerald-300">
										<CheckCircle2 className="h-4 w-4" />
									</span>
									<p className="truncate text-sm font-medium text-white">{title}</p>
								</div>
								<div className="flex items-center gap-3 pl-11 sm:pl-0">
									<span className="text-xs text-emerald-300">Completed</span>
									<span className="text-xs text-slate-400">{when}</span>
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</main>
	);
}

export default Money;
