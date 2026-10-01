import {
	ArrowLeft,
	ArrowRight,
	BookOpen,
	CalendarDays,
	Check,
	Code2,
	Dumbbell,
	Flame,
	Languages,
	Target,
	TrendingUp,
	Wallet,
} from 'lucide-react';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const calendarDays = [
	{ date: 28, month: 'previous' },
	{ date: 29, month: 'previous' },
	{ date: 30, month: 'previous' },
	...Array.from({ length: 31 }, (_, index) => ({ date: index + 1, month: 'current' })),
	{ date: 1, month: 'next' },
];

const dayStatus = {
	1: 'today',
	2: 'missed',
};

const summaryStats = [
	{ label: 'Challenge Day', value: '1 / 90', icon: Target, accent: 'text-cyan-200 border-cyan-400/20 bg-cyan-400/[0.08]' },
	{ label: 'Completed Days', value: '0', icon: Check, accent: 'text-emerald-200 border-emerald-400/20 bg-emerald-400/[0.08]' },
	{ label: 'Current Streak', value: '18 days', icon: Flame, accent: 'text-orange-200 border-orange-400/20 bg-orange-400/[0.08]' },
	{ label: 'Best Streak', value: '24 days', icon: TrendingUp, accent: 'text-amber-200 border-amber-400/20 bg-amber-400/[0.08]' },
	{ label: 'Completion Rate', value: '0%', icon: CalendarDays, accent: 'text-blue-200 border-blue-400/20 bg-blue-400/[0.08]' },
];

const focusAreas = [
	{ label: 'Fitness', value: 84, icon: Dumbbell, bar: 'bg-rose-400', iconStyle: 'text-rose-200 border-rose-400/20 bg-rose-400/10' },
	{ label: 'Coding', value: 76, icon: Code2, bar: 'bg-emerald-400', iconStyle: 'text-emerald-200 border-emerald-400/20 bg-emerald-400/10' },
	{ label: 'Study', value: 78, icon: BookOpen, bar: 'bg-blue-400', iconStyle: 'text-blue-200 border-blue-400/20 bg-blue-400/10' },
	{ label: 'English', value: 68, icon: Languages, bar: 'bg-amber-400', iconStyle: 'text-amber-200 border-amber-400/20 bg-amber-400/10' },
	{ label: 'Money', value: 70, icon: Wallet, bar: 'bg-violet-400', iconStyle: 'text-violet-200 border-violet-400/20 bg-violet-400/10' },
];

function GlassCard({ children, className = '' }) {
	return <div className={`rounded-2xl border border-slate-800/90 bg-slate-900/75 shadow-[0_18px_45px_rgba(2,6,23,0.24)] backdrop-blur-sm ${className}`}>{children}</div>;
}

function DayCell({ date, month }) {
	const status = month === 'current' ? dayStatus[date] || (date > 1 ? 'upcoming' : 'today') : 'outside';
	const isCurrentMonth = month === 'current';

	return (
		<div className={`relative min-h-16 border-r border-t border-slate-800/70 p-2 transition sm:min-h-20 sm:p-3 ${
			isCurrentMonth ? 'bg-slate-950/25 hover:bg-slate-800/35' : 'bg-slate-950/55 text-slate-700'
		} ${status === 'today' ? 'z-10 bg-cyan-400/[0.08] shadow-[inset_0_0_24px_rgba(34,211,238,0.1)]' : ''}`}>
			<div className="flex items-start justify-between gap-1">
				<span className={`text-xs font-semibold sm:text-sm ${status === 'today' ? 'text-cyan-100' : isCurrentMonth ? 'text-slate-300' : 'text-slate-700'}`}>{date}</span>
				{status === 'today' && <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />}
			</div>
			{status === 'today' && <span className="mt-4 block text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-200 sm:mt-6">Start day</span>}
			{status === 'missed' && <span className="mt-4 block h-1 w-5 rounded-full bg-rose-400/60 sm:mt-6" />}
			{status === 'upcoming' && <span className="absolute bottom-2 left-2 h-1 w-1 rounded-full bg-slate-700 sm:bottom-3 sm:left-3" />}
		</div>
	);
}

function LegendItem({ label, type }) {
	const marker = {
		completed: 'bg-emerald-300',
		today: 'border border-cyan-200 bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.7)]',
		missed: 'h-1 w-5 rounded-full bg-rose-400/70',
		upcoming: 'bg-slate-700',
	}[type];

	return <span className="flex items-center gap-2 text-[11px] text-slate-400"><span className={`h-2 w-2 rounded-full ${marker}`} />{label}</span>;
}

function Calendar() {
	return (
		<main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 sm:py-8 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<header className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
					<div>
						<p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75">Winter Arc 2026</p>
						<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Calendar</h1>
						<p className="mt-2 text-sm text-slate-400 sm:text-base">Track your Winter Arc journey day by day.</p>
					</div>
					<div className="flex items-center gap-2 self-start rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-2 text-xs font-medium text-cyan-100 sm:self-auto">
						<span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-50" /><span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" /></span>
						Day 1 of 90
					</div>
				</header>

				<div className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
					<section>
						<GlassCard className="overflow-hidden">
							<div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 p-4 sm:p-5">
								<div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/65">Monthly view</p><h2 className="mt-1 text-xl font-semibold text-white">October 2026</h2></div>
								<div className="flex items-center gap-2"><button type="button" aria-label="Previous month" className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-950/60 text-slate-400 transition hover:border-cyan-400/35 hover:text-cyan-100"><ArrowLeft className="h-4 w-4" /></button><button type="button" aria-label="Next month" className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-950/60 text-slate-400 transition hover:border-cyan-400/35 hover:text-cyan-100"><ArrowRight className="h-4 w-4" /></button></div>
							</div>
							<div className="grid grid-cols-7 border-b border-slate-800/80 bg-slate-950/35">
								{weekdays.map((day) => <div key={day} className="px-1 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:text-xs">{day}</div>)}
							</div>
							<div className="grid grid-cols-7 border-l border-slate-800/70">
								{calendarDays.map((day, index) => <DayCell key={`${day.month}-${day.date}-${index}`} {...day} />)}
							</div>
							<div className="flex flex-wrap gap-x-5 gap-y-3 border-t border-slate-800/80 px-4 py-4 sm:px-5"><LegendItem label="Completed" type="completed" /><LegendItem label="Today" type="today" /><LegendItem label="Missed" type="missed" /><LegendItem label="Upcoming" type="upcoming" /></div>
						</GlassCard>
					</section>

					<aside className="space-y-6">
						<GlassCard className="p-5 sm:p-6">
							<div className="mb-5 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-200"><Target className="h-4 w-4" /></span><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/65">Challenge pulse</p><h2 className="mt-1 text-lg font-semibold text-white">Your month at a glance</h2></div></div>
							<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">{summaryStats.map(({ label, value, icon: Icon, accent }) => <div key={label} className="flex items-center justify-between gap-3 rounded-xl border border-slate-800/80 bg-slate-950/35 p-3"><div className="flex items-center gap-3"><span className={`flex h-8 w-8 items-center justify-center rounded-lg border ${accent}`}><Icon className="h-3.5 w-3.5" /></span><span className="text-xs text-slate-400">{label}</span></div><span className="text-sm font-semibold text-white">{value}</span></div>)}</div>
						</GlassCard>

						<GlassCard className="p-5 sm:p-6">
							<div className="mb-5 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/[0.08] text-blue-200"><TrendingUp className="h-4 w-4" /></span><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-200/65">Focus pillars</p><h2 className="mt-1 text-lg font-semibold text-white">October Focus</h2></div></div>
							<div className="space-y-4">{focusAreas.map(({ label, value, icon: Icon, bar, iconStyle }) => <div key={label}><div className="mb-2 flex items-center justify-between gap-3"><div className="flex items-center gap-2.5"><span className={`flex h-7 w-7 items-center justify-center rounded-lg border ${iconStyle}`}><Icon className="h-3.5 w-3.5" /></span><span className="text-xs font-semibold text-slate-200">{label}</span></div><span className="text-xs font-semibold text-slate-300">{value}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-800"><div className={`h-full rounded-full ${bar}`} style={{ width: `${value}%` }} /></div></div>)}</div>
						</GlassCard>
					</aside>
				</div>

				<section className="mt-6 rounded-2xl border border-cyan-400/15 bg-slate-900/60 p-5 text-center shadow-[0_18px_45px_rgba(8,47,73,0.12)]"><p className="text-sm font-semibold text-white">October is your foundation month.</p><p className="mt-1 text-xs text-slate-500">Show up today, then let the next day take care of itself.</p></section>
			</div>
		</main>
	);
}

export default Calendar;
