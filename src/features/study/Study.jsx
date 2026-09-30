import React, { useState } from 'react';
import {
	BookOpen,
	BookOpenCheck,
	Brain,
	CheckCircle2,
	Clock3,
	Code2,
	Database,
	GraduationCap,
	Network,
	Play,
	Target,
	TrendingUp,
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
	{ label: 'Study Streak', value: '15 days', icon: TrendingUp },
	{ label: 'Study Time This Week', value: '12h 40m', icon: Clock3 },
	{ label: 'Weekly Goal', value: '15 hours', icon: Target },
	{ label: 'Study Progress', value: '78%', icon: BookOpenCheck },
];

const weeklyActivity = [
	{ day: 'Mon', hours: 1.5 },
	{ day: 'Tue', hours: 2 },
	{ day: 'Wed', hours: 1 },
	{ day: 'Thu', hours: 2.5 },
	{ day: 'Fri', hours: 1.5 },
	{ day: 'Sat', hours: 3 },
	{ day: 'Sun', hours: 1.5 },
];

const studyStats = [
	{ label: 'Total Study Time', value: '86h 20m' },
	{ label: 'Subjects Completed', value: '8' },
	{ label: 'Chapters Completed', value: '34' },
	{ label: 'Best Study Streak', value: '24 days' },
];

const subjects = [
	{ name: 'Data Structures', progress: 72, icon: Brain },
	{ name: 'Computer Networks', progress: 64, icon: Network },
	{ name: 'Database Management', progress: 58, icon: Database },
	{ name: 'Web Development', progress: 76, icon: Code2 },
];

const recentActivity = [
	{ title: 'OSI Model Revision', status: 'Completed', when: 'Today' },
	{ title: 'SQL Queries Practice', status: 'Completed', when: 'Yesterday' },
	{ title: 'React State Management', status: 'Completed', when: '2 days ago' },
	{ title: 'Routing Algorithms', status: 'In Progress', when: '3 days ago' },
];

const topics = ['OSI Model', 'TCP/IP', 'Routing'];

function Study() {
	const [sessionStarted, setSessionStarted] = useState(false);

	return (
		<main className="min-h-screen overflow-x-hidden bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<header className="mb-6">
					<p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-200/75">
						Winter Arc 2026
					</p>
					<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Study</h1>
					<p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
						Build consistent study habits and make steady progress toward your academic goals.
					</p>
				</header>

				<section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{overviewCards.map(({ label, value, icon: Icon }) => (
						<article
							key={label}
							className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/30"
						>
							<div className="mb-4 flex items-center justify-between gap-3">
								<p className="text-sm text-slate-300">{label}</p>
								<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-blue-200">
									<Icon className="h-4 w-4" />
								</span>
							</div>
							<p className="text-2xl font-semibold text-white">{value}</p>
						</article>
					))}
				</section>

				<section className="mb-6 grid gap-5 xl:grid-cols-[1.45fr_0.85fr]">
					<article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
						<div className="mb-5 flex flex-wrap items-start justify-between gap-4">
							<div>
								<p className="text-xs uppercase tracking-[0.22em] text-slate-400">Today's study plan</p>
								<h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
									Data Communication &amp; Networking
								</h2>
							</div>
							<button
								type="button"
								onClick={() => setSessionStarted((started) => !started)}
								className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
									sessionStarted
										? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500/15'
										: 'border-blue-400/30 bg-blue-500/10 text-blue-100 hover:border-blue-300/60 hover:bg-blue-500/15'
								}`}
							>
								{sessionStarted ? <CheckCircle2 className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
								{sessionStarted ? 'Session Started' : 'Start Study Session'}
							</button>
						</div>

						{sessionStarted && (
							<div className="mb-5 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100 transition-all duration-200">
								Study session started. Stay focused!
							</div>
						)}

						<div className="mb-5 grid gap-3 sm:grid-cols-3">
							<div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
								<p className="text-xs uppercase tracking-[0.16em] text-slate-400">Planned time</p>
								<p className="mt-2 flex items-center gap-2 font-semibold text-white">
									<Clock3 className="h-4 w-4 text-blue-300" /> 90 minutes
								</p>
							</div>
							<div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
								<p className="text-xs uppercase tracking-[0.16em] text-slate-400">Difficulty</p>
								<p className="mt-2 font-semibold text-white">Medium</p>
							</div>
							<div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
								<p className="text-xs uppercase tracking-[0.16em] text-slate-400">Topics</p>
								<p className="mt-2 font-semibold text-white">3 planned</p>
							</div>
						</div>

						<div>
							<p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Today's topics</p>
							<div className="flex flex-wrap gap-2">
								{topics.map((topic) => (
									<span
										key={topic}
										className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-100"
									>
										{topic}
									</span>
								))}
							</div>
						</div>
					</article>

					<article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
						<div className="mb-4 flex items-center justify-between gap-3">
							<div>
								<p className="text-xs uppercase tracking-[0.2em] text-slate-400">Your numbers</p>
								<h2 className="mt-1 text-lg font-semibold text-white">Study statistics</h2>
							</div>
							<GraduationCap className="h-5 w-5 text-blue-300" />
						</div>
						<div className="space-y-3">
							{studyStats.map(({ label, value }) => (
								<div
									key={label}
									className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-3"
								>
									<span className="text-sm text-slate-300">{label}</span>
									<span className="shrink-0 text-sm font-semibold text-white">{value}</span>
								</div>
							))}
						</div>
					</article>
				</section>

				<section className="mb-6 grid gap-5 xl:grid-cols-[1.4fr_0.85fr]">
					<article className="min-w-0 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
						<div className="mb-4 flex flex-wrap items-end justify-between gap-3">
							<div>
								<p className="text-xs uppercase tracking-[0.2em] text-slate-400">Weekly activity</p>
								<h2 className="mt-2 text-xl font-semibold text-white">Study time</h2>
							</div>
							<span className="text-[10px] font-medium uppercase tracking-[0.16em] text-blue-200/80">
								Study activity (hours)
							</span>
						</div>
						<div className="h-[260px] w-full rounded-2xl border border-slate-800 bg-slate-950/70 p-3 sm:h-[280px] sm:p-4">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={weeklyActivity} margin={{ top: 12, right: 12, left: -12, bottom: 8 }}>
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
										domain={[0, 3.5]}
										ticks={[0, 1, 2, 3]}
										axisLine={false}
										tickLine={false}
										tick={{ fill: '#94a3b8', fontSize: 11 }}
										width={34}
									/>
									<Tooltip
										formatter={(value) => [`${value} hours`, 'Study time']}
										labelStyle={{ color: '#e2e8f0', fontWeight: 600 }}
										contentStyle={{
											backgroundColor: 'rgba(15, 23, 42, 0.96)',
											border: '1px solid rgba(96, 165, 250, 0.3)',
											borderRadius: '12px',
											color: '#f8fafc',
										}}
										cursor={{ stroke: 'rgba(96, 165, 250, 0.35)', strokeWidth: 1 }}
									/>
									<Line
										type="monotone"
										dataKey="hours"
										stroke="#60a5fa"
										strokeWidth={3}
										dot={{ r: 3, fill: '#60a5fa', stroke: '#0f172a', strokeWidth: 2 }}
										activeDot={{ r: 5, fill: '#93c5fd', stroke: '#dbeafe', strokeWidth: 2 }}
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
							<span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/10 text-blue-200">
								<BookOpen className="h-5 w-5" />
							</span>
							<div>
								<p className="text-xs uppercase tracking-[0.18em] text-slate-400">Keep your pace</p>
								<h2 className="mt-1 text-lg font-semibold text-white">Study reminder</h2>
							</div>
						</div>
						<p className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4 text-sm leading-6 text-blue-100">
							Consistency beats intensity. Complete today's study target before the day ends.
						</p>
					</article>
				</section>

				<section className="mb-6">
					<div className="mb-4 flex items-end justify-between gap-3">
						<div>
							<p className="text-xs uppercase tracking-[0.2em] text-slate-400">Keep building</p>
							<h2 className="mt-1 text-xl font-semibold text-white">Subject progress</h2>
						</div>
						<span className="text-xs text-slate-400">4 subjects</span>
					</div>
					<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						{subjects.map(({ name, progress, icon: Icon }) => (
							<article
								key={name}
								className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/30"
							>
								<div className="mb-4 flex items-start justify-between gap-3">
									<span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-blue-200">
										<Icon className="h-5 w-5" />
									</span>
									<span className="text-sm font-semibold text-blue-200">{progress}%</span>
								</div>
								<h3 className="min-h-12 text-base font-semibold text-white">{name}</h3>
								<div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
									<div
										className="h-full rounded-full bg-blue-400 transition-[width] duration-500"
										style={{ width: `${progress}%` }}
									/>
								</div>
								<p className="mt-2 text-xs text-slate-400">Progress</p>
							</article>
						))}
					</div>
				</section>

				<section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.38)] backdrop-blur-sm">
					<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
						<div>
							<p className="text-xs uppercase tracking-[0.2em] text-slate-400">Your learning log</p>
							<h2 className="mt-1 text-xl font-semibold text-white">Recent study activity</h2>
						</div>
						<span className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
							<BookOpenCheck className="h-4 w-4 text-blue-300" /> Latest
						</span>
					</div>
					<div className="space-y-3">
						{recentActivity.map(({ title, status, when }) => (
							<div
								key={title}
								className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 transition-colors duration-200 hover:border-slate-700"
							>
								<div className="flex min-w-0 items-center gap-3">
									<span
										className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
											status === 'Completed'
												? 'border-emerald-400/25 bg-emerald-500/10 text-emerald-300'
												: 'border-blue-400/25 bg-blue-500/10 text-blue-300'
										}`}
									>
										{status === 'Completed' ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
									</span>
									<p className="truncate text-sm font-medium text-white">{title}</p>
								</div>
								<div className="flex items-center gap-3 pl-11 sm:pl-0">
									<span
										className={`text-xs ${status === 'Completed' ? 'text-emerald-300' : 'text-blue-300'}`}
									>
										{status}
									</span>
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

export default Study;
