import {
	Activity,
	Award,
	BookOpen,
	BriefcaseBusiness,
	Check,
	CircleDot,
	Code2,
	Dumbbell,
	Flame,
	Languages,
	LockKeyhole,
	Sparkles,
	TrendingUp,
	Trophy,
	Wallet,
	Zap,
} from 'lucide-react';
import {
	CartesianGrid,
	Line,
	LineChart,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const overallProgressData = [
	{ day: 1, progress: 0 },
	{ day: 7, progress: 5 },
	{ day: 14, progress: 10 },
	{ day: 21, progress: 16 },
	{ day: 30, progress: 28 },
	{ day: 38, progress: 42 },
	{ day: 45, progress: 48 },
	{ day: 52, progress: 56 },
	{ day: 60, progress: 66 },
	{ day: 68, progress: 74 },
	{ day: 75, progress: 82 },
	{ day: 83, progress: 91 },
	{ day: 90, progress: 100 },
];

const weeklyGrowthData = [
	{ week: 'Wk 1', Fitness: 12, Coding: 8, Study: 10, English: 7, Money: 9 },
	{ week: 'Wk 2', Fitness: 20, Coding: 15, Study: 18, English: 13, Money: 16 },
	{ week: 'Wk 3', Fitness: 27, Coding: 22, Study: 25, English: 19, Money: 21 },
	{ week: 'Wk 4', Fitness: 35, Coding: 29, Study: 33, English: 25, Money: 28 },
	{ week: 'Wk 5', Fitness: 42, Coding: 36, Study: 39, English: 32, Money: 35 },
	{ week: 'Wk 6', Fitness: 50, Coding: 43, Study: 47, English: 38, Money: 41 },
	{ week: 'Wk 7', Fitness: 57, Coding: 50, Study: 54, English: 44, Money: 47 },
	{ week: 'Wk 8', Fitness: 65, Coding: 57, Study: 61, English: 50, Money: 54 },
	{ week: 'Wk 9', Fitness: 72, Coding: 64, Study: 68, English: 56, Money: 60 },
	{ week: 'Wk 10', Fitness: 78, Coding: 70, Study: 73, English: 62, Money: 66 },
	{ week: 'Wk 11', Fitness: 84, Coding: 76, Study: 78, English: 68, Money: 70 },
];

const summaryStats = [
	{ label: 'Overall Progress', value: '42%', detail: 'of your 90-day goal', icon: Activity, color: 'text-cyan-300', fill: 'from-cyan-400 to-sky-300' },
	{ label: 'Current Streak', value: '18', suffix: 'days', detail: 'You are on a roll', icon: Flame, color: 'text-orange-300', fill: 'from-orange-400 to-rose-400' },
	{ label: 'Total XP', value: '1,840', detail: 'earned so far', icon: Zap, color: 'text-amber-300', fill: 'from-amber-300 to-yellow-400' },
	{ label: 'Days Completed', value: '38', suffix: '/ 90', detail: '52 days to go', icon: Check, color: 'text-emerald-300', fill: 'from-emerald-400 to-teal-300' },
];

const categories = [
	{ name: 'Fitness', value: 84, trend: '+8%', icon: Dumbbell, color: 'text-rose-300', bar: 'bg-rose-400', tint: 'bg-rose-400/10 border-rose-400/20' },
	{ name: 'Coding', value: 76, trend: '+12%', icon: Code2, color: 'text-emerald-300', bar: 'bg-emerald-400', tint: 'bg-emerald-400/10 border-emerald-400/20' },
	{ name: 'Study', value: 78, trend: '+6%', icon: BookOpen, color: 'text-sky-300', bar: 'bg-sky-400', tint: 'bg-sky-400/10 border-sky-400/20' },
	{ name: 'English', value: 68, trend: '+5%', icon: Languages, color: 'text-amber-300', bar: 'bg-amber-300', tint: 'bg-amber-300/10 border-amber-300/20' },
	{ name: 'Money', value: 70, trend: '+9%', icon: Wallet, color: 'text-violet-300', bar: 'bg-violet-400', tint: 'bg-violet-400/10 border-violet-400/20' },
];

const milestones = [
	{ day: 30, title: 'Bronze', detail: 'First month complete', icon: Award, status: 'completed', color: 'text-amber-300' },
	{ day: 45, title: 'Diamond', detail: 'Next milestone', icon: Sparkles, status: 'current', color: 'text-cyan-200' },
	{ day: 60, title: 'Elite', detail: 'Two-thirds through', icon: Zap, status: 'upcoming', color: 'text-violet-300' },
	{ day: 75, title: 'Master', detail: 'Final stretch', icon: Trophy, status: 'upcoming', color: 'text-rose-300' },
	{ day: 90, title: 'Winter Master', detail: 'Challenge complete', icon: LockKeyhole, status: 'upcoming', color: 'text-slate-400' },
];

const performanceStats = [
	{ label: 'Best Streak', value: '24 days' },
	{ label: 'Average Daily XP', value: '48 XP' },
	{ label: 'Total Tasks Completed', value: '38' },
	{ label: 'Completion Rate', value: '42%' },
];

const chartTick = { fill: '#64748b', fontSize: 11 };
const chartGrid = '#1e293b';

function ChartTooltip({ active, payload, label, suffix = '%' }) {
	if (!active || !payload?.length) return null;

	return (
		<div className="rounded-xl border border-slate-700 bg-slate-950/95 px-3 py-2.5 shadow-xl shadow-black/30">
			<p className="mb-2 text-xs font-medium text-slate-400">{label}</p>
			<div className="space-y-1.5">
				{payload.map((item) => (
					<div key={item.dataKey} className="flex items-center justify-between gap-5 text-xs">
						<span className="flex items-center gap-2 text-slate-300">
							<span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />
							{item.name}
						</span>
						<span className="font-semibold text-white">{item.value}{suffix}</span>
					</div>
				))}
			</div>
		</div>
	);
}

function Progress() {
	return (
		<main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 sm:py-8 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<header className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
					<div>
						<p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75">
							Winter Arc 2026
						</p>
						<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Progress</h1>
						<p className="mt-2 text-sm text-slate-400 sm:text-base">
							Track your growth across the 90-day challenge.
						</p>
					</div>
					<div className="flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-2 text-xs font-medium text-cyan-100">
						<span className="relative flex h-2 w-2">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-50" />
							<span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
						</span>
						Day 38 of 90
					</div>
				</header>

				<section aria-label="Progress summary" className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
					{summaryStats.map(({ label, value, suffix, detail, icon: Icon, color, fill }) => (
						<article key={label} className="group relative overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/75 p-4 shadow-[0_16px_38px_rgba(2,6,23,0.24)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900">
							<div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-slate-800/80 ${color}`}>
								<Icon className="h-4 w-4" />
							</div>
							<p className="text-xs font-medium text-slate-400">{label}</p>
							<div className="mt-1 flex items-baseline gap-1.5">
								<span className="text-2xl font-semibold tracking-tight text-white">{value}</span>
								{suffix && <span className="text-sm text-slate-400">{suffix}</span>}
							</div>
							<p className="mt-1 text-xs text-slate-500">{detail}</p>
							<span className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r ${fill} opacity-50`} />
						</article>
					))}
				</section>

				<section className="mb-5 rounded-2xl border border-slate-800/90 bg-slate-900/75 p-4 shadow-[0_18px_45px_rgba(2,6,23,0.25)] backdrop-blur-sm sm:p-5">
					<div className="mb-5 flex flex-wrap items-start justify-between gap-4">
						<div>
							<div className="flex items-center gap-2">
								<h2 className="text-base font-semibold text-white sm:text-lg">90-Day Winter Arc Progress</h2>
								<span className="rounded-md border border-slate-700 bg-slate-800/80 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">90 DAYS</span>
							</div>
							<p className="mt-1 text-xs text-slate-400">Your overall growth, day by day</p>
						</div>
						<div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-2.5 py-1.5 text-[11px] font-medium text-emerald-200">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
							Live Progress
						</div>
					</div>
					<div className="h-64 w-full sm:h-72">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={overallProgressData} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
								<CartesianGrid stroke={chartGrid} strokeDasharray="3 5" vertical={false} />
								<XAxis
									dataKey="day"
									type="number"
									domain={[1, 90]}
									ticks={[1, 15, 30, 45, 60, 75, 90]}
									tickFormatter={(day) => `Day ${day}`}
									tick={chartTick}
									axisLine={false}
									tickLine={false}
									dy={10}
								/>
								<YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={chartTick} tickFormatter={(value) => `${value}%`} axisLine={false} tickLine={false} />
								<Tooltip content={<ChartTooltip labelFormatter={(day) => `Day ${day}`} />} cursor={{ stroke: '#334155', strokeDasharray: '4 4' }} />
								<ReferenceLine x={38} stroke="#67e8f9" strokeDasharray="3 5" strokeOpacity={0.35} />
								<Line
									type="monotone"
									dataKey="progress"
									name="Progress"
									stroke="#67e8f9"
									strokeWidth={3}
									dot={{ r: 3, fill: '#0f172a', stroke: '#67e8f9', strokeWidth: 2 }}
									activeDot={{ r: 6, fill: '#a5f3fc', stroke: '#164e63', strokeWidth: 3 }}
									isAnimationActive
									animationDuration={1400}
									animationEasing="ease-out"
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
					<div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
						<span className="text-slate-500">Current pace</span>
						<span className="font-medium text-cyan-200">42% <span className="text-slate-500">of challenge complete</span></span>
					</div>
				</section>

				<section className="mb-5">
					<div className="mb-3 flex items-end justify-between gap-4">
						<div>
							<h2 className="text-base font-semibold text-white sm:text-lg">Category Progress</h2>
							<p className="mt-1 text-xs text-slate-400">Momentum across your five focus areas</p>
						</div>
						<span className="hidden text-xs text-slate-500 sm:block">This week <span className="ml-1 text-emerald-300">↗ trending up</span></span>
					</div>
					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
						{categories.map(({ name, value, trend, icon: Icon, color, bar, tint }) => (
							<article key={name} className="group rounded-2xl border border-slate-800/90 bg-slate-900/75 p-4 shadow-[0_14px_35px_rgba(2,6,23,0.2)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900">
								<div className="mb-4 flex items-center justify-between">
									<div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${tint} ${color}`}>
										<Icon className="h-4 w-4" />
									</div>
									<span className="flex items-center gap-1 text-[11px] font-medium text-emerald-300">
										<TrendingUp className="h-3 w-3" />{trend}
									</span>
								</div>
								<div className="flex items-end justify-between gap-2">
									<h3 className="text-sm font-medium text-slate-200">{name}</h3>
									<span className="text-xl font-semibold text-white">{value}<span className="text-xs text-slate-500">%</span></span>
								</div>
								<div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
									<div className={`h-full rounded-full ${bar} transition-all duration-700 group-hover:brightness-110`} style={{ width: `${value}%` }} />
								</div>
							</article>
						))}
					</div>
				</section>

				<section className="mb-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
					<div className="rounded-2xl border border-slate-800/90 bg-slate-900/75 p-4 shadow-[0_18px_45px_rgba(2,6,23,0.25)] backdrop-blur-sm sm:p-5">
						<div className="mb-5">
							<h2 className="text-base font-semibold text-white sm:text-lg">Weekly Growth</h2>
							<p className="mt-1 text-xs text-slate-400">Category progress over the last 11 weeks</p>
						</div>
						<div className="mb-3 flex flex-wrap gap-x-4 gap-y-2">
							{[
								['Fitness', '#fb7185'],
								['Coding', '#4ade80'],
								['Study', '#60a5fa'],
								['English', '#facc15'],
								['Money', '#a78bfa'],
							].map(([name, color]) => (
								<span key={name} className="flex items-center gap-1.5 text-[11px] text-slate-400">
									<span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />{name}
								</span>
							))}
						</div>
						<div className="h-56 w-full sm:h-64">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={weeklyGrowthData} margin={{ top: 8, right: 4, left: -22, bottom: 0 }}>
									<CartesianGrid stroke={chartGrid} strokeDasharray="3 5" vertical={false} />
									<XAxis dataKey="week" tick={chartTick} axisLine={false} tickLine={false} dy={8} />
									<YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={chartTick} tickFormatter={(value) => `${value}%`} axisLine={false} tickLine={false} />
									<Tooltip content={<ChartTooltip labelFormatter={(week) => week} />} cursor={{ stroke: '#334155', strokeDasharray: '4 4' }} />
									<Line type="monotone" dataKey="Fitness" stroke="#fb7185" strokeWidth={2.2} dot={false} activeDot={{ r: 4 }} isAnimationActive animationDuration={1200} />
									<Line type="monotone" dataKey="Coding" stroke="#4ade80" strokeWidth={2.2} dot={false} activeDot={{ r: 4 }} isAnimationActive animationDuration={1350} />
									<Line type="monotone" dataKey="Study" stroke="#60a5fa" strokeWidth={2.2} dot={false} activeDot={{ r: 4 }} isAnimationActive animationDuration={1500} />
									<Line type="monotone" dataKey="English" stroke="#facc15" strokeWidth={2.2} dot={false} activeDot={{ r: 4 }} isAnimationActive animationDuration={1650} />
									<Line type="monotone" dataKey="Money" stroke="#a78bfa" strokeWidth={2.2} dot={false} activeDot={{ r: 4 }} isAnimationActive animationDuration={1800} />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>

					<aside className="rounded-2xl border border-slate-800/90 bg-slate-900/75 p-4 shadow-[0_18px_45px_rgba(2,6,23,0.25)] backdrop-blur-sm sm:p-5">
						<div className="mb-5 flex items-start justify-between gap-3">
							<div>
								<h2 className="text-base font-semibold text-white sm:text-lg">Performance Summary</h2>
								<p className="mt-1 text-xs text-slate-400">Your Winter Arc at a glance</p>
							</div>
							<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-200">
								<Trophy className="h-4 w-4" />
							</span>
						</div>
						<div className="divide-y divide-slate-800/80">
							{performanceStats.map(({ label, value }) => (
								<div key={label} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
									<span className="text-xs text-slate-400">{label}</span>
									<span className="text-sm font-semibold text-slate-100">{value}</span>
								</div>
							))}
						</div>
						<div className="mt-5 flex items-start gap-2.5 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] p-3">
							<CircleDot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" />
							<p className="text-xs leading-5 text-slate-400">Your strongest category is <span className="font-medium text-rose-200">Fitness</span>, up 8% this week.</p>
						</div>
					</aside>
				</section>

				<section className="rounded-2xl border border-slate-800/90 bg-slate-900/75 p-4 shadow-[0_18px_45px_rgba(2,6,23,0.25)] backdrop-blur-sm sm:p-5">
					<div className="mb-5 flex flex-wrap items-end justify-between gap-3">
						<div>
							<h2 className="text-base font-semibold text-white sm:text-lg">90-Day Milestones</h2>
							<p className="mt-1 text-xs text-slate-400">Every finish line is another beginning</p>
						</div>
						<span className="text-xs font-medium text-cyan-200">38 <span className="text-slate-500">/ 90 days</span></span>
					</div>
					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
						{milestones.map(({ day, title, detail, icon: Icon, status, color }) => {
							const completed = status === 'completed';
							const current = status === 'current';

							return (
								<article
									key={day}
									className={`relative rounded-xl border p-3.5 transition duration-200 ${
										completed
											? 'border-emerald-400/15 bg-emerald-400/[0.035]'
											: current
												? 'border-cyan-300/30 bg-cyan-300/[0.07] shadow-[0_0_25px_rgba(34,211,238,0.06)]'
												: 'border-slate-800 bg-slate-950/25 opacity-75 hover:opacity-100'
									}`}
								>
									<div className="mb-3 flex items-center justify-between gap-2">
										<span className={`flex h-8 w-8 items-center justify-center rounded-lg ${completed ? 'bg-emerald-400/10 text-emerald-300' : current ? 'bg-cyan-300/10 text-cyan-200' : 'bg-slate-800 text-slate-500'}`}>
											{completed ? <Check className="h-4 w-4" /> : <Icon className={`h-4 w-4 ${current ? color : ''}`} />}
										</span>
										<span className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${completed ? 'text-emerald-300' : current ? 'text-cyan-200' : 'text-slate-500'}`}>
											{completed ? 'Complete' : current ? 'Current' : 'Upcoming'}
										</span>
									</div>
									<p className="text-xs text-slate-500">Day {day}</p>
									<h3 className={`mt-0.5 text-sm font-semibold ${completed ? 'text-emerald-100' : current ? 'text-white' : 'text-slate-300'}`}>{title}</h3>
									<p className="mt-1 text-[11px] text-slate-500">{detail}</p>
								</article>
							);
						})}
					</div>
				</section>
			</div>
		</main>
	);
}

export default Progress;
