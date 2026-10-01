import {
	Award,
	BookOpen,
	Check,
	Code2,
	Crown,
	Dumbbell,
	Flame,
	Gem,
	Languages,
	LockKeyhole,
	Medal,
	Mic2,
	ShieldCheck,
	Sparkles,
	Star,
	Target,
	Trophy,
	Wallet,
	Zap,
} from 'lucide-react';

const achievementsByCategory = [
	{
		title: 'Streak Achievements',
		description: 'Show up every day. Let consistency do the talking.',
		tone: 'amber',
		achievements: [
			{ title: 'First Step', description: 'Complete Day 1', reward: 50, icon: Target, status: 'unlocked', date: 'Oct 02, 2026' },
			{ title: 'Week Warrior', description: 'Reach a 7-day streak', reward: 100, icon: ShieldCheck, status: 'unlocked', date: 'Oct 08, 2026' },
			{ title: 'Two Week Fighter', description: 'Reach a 14-day streak', reward: 150, icon: Flame, status: 'unlocked', date: 'Oct 15, 2026' },
			{ title: 'Monthly Beast', description: 'Reach a 30-day streak', reward: 300, icon: Medal, status: 'in-progress', progress: 60, progressLabel: '18 / 30 days' },
			{ title: 'Elite Grinder', description: 'Reach a 60-day streak', reward: 600, icon: Crown, status: 'locked', progress: 30, progressLabel: '18 / 60 days' },
			{ title: 'Winter Master', description: 'Complete all 90 days', reward: 1000, icon: Trophy, status: 'locked', progress: 20, progressLabel: '18 / 90 days' },
		],
	},
	{
		title: 'XP Achievements',
		description: 'Every task adds up. Stack your experience and level up.',
		tone: 'cyan',
		achievements: [
			{ title: 'XP Starter', description: 'Earn 500 XP', reward: 75, icon: Star, status: 'unlocked', date: 'Oct 10, 2026' },
			{ title: 'XP Hunter', description: 'Earn 1,000 XP', reward: 150, icon: Zap, status: 'unlocked', date: 'Oct 22, 2026' },
			{ title: 'XP Master', description: 'Earn 2,500 XP', reward: 300, icon: Sparkles, status: 'in-progress', progress: 74, progressLabel: '1,840 / 2,500 XP' },
			{ title: 'XP Legend', description: 'Earn 5,000 XP', reward: 600, icon: Gem, status: 'locked', progress: 37, progressLabel: '1,840 / 5,000 XP' },
		],
	},
	{
		title: 'Category Achievements',
		description: 'Build real momentum across every part of your life.',
		tone: 'blue',
		achievements: [
			{ title: 'Fitness Mode', description: 'Complete 20 fitness tasks', reward: 200, icon: Dumbbell, status: 'unlocked', date: 'Oct 19, 2026', color: 'rose' },
			{ title: 'Coding Beast', description: 'Complete 20 coding tasks', reward: 200, icon: Code2, status: 'unlocked', date: 'Oct 24, 2026', color: 'emerald' },
			{ title: 'Study Focus', description: 'Complete 20 study tasks', reward: 200, icon: BookOpen, status: 'unlocked', date: 'Oct 27, 2026', color: 'blue' },
			{ title: 'English Speaker', description: 'Complete 20 English tasks', reward: 200, icon: Mic2, status: 'in-progress', progress: 70, progressLabel: '14 / 20 tasks', color: 'amber' },
			{ title: 'Money Mindset', description: 'Complete 20 money tasks', reward: 200, icon: Wallet, status: 'locked', progress: 45, progressLabel: '9 / 20 tasks', color: 'violet' },
		],
	},
];

const summaryCards = [
	{ label: 'Achievements Unlocked', value: '8', detail: 'Keep earning your legacy', icon: Award, accent: 'text-cyan-200', iconBg: 'border-cyan-400/20 bg-cyan-400/[0.08]' },
	{ label: 'Total Achievements', value: '20', detail: 'Across 3 categories', icon: Trophy, accent: 'text-blue-200', iconBg: 'border-blue-400/20 bg-blue-400/[0.08]' },
	{ label: 'Current Streak', value: '18', suffix: 'days', detail: 'Your best is 24 days', icon: Flame, accent: 'text-orange-200', iconBg: 'border-orange-400/20 bg-orange-400/[0.08]' },
	{ label: 'Total XP', value: '1,840', detail: 'A little closer every day', icon: Zap, accent: 'text-amber-200', iconBg: 'border-amber-400/20 bg-amber-400/[0.08]' },
];

const recentUnlocks = [
	{ title: 'Study Focus', date: 'Oct 27, 2026', xp: '+200 XP', icon: BookOpen, tone: 'blue' },
	{ title: 'Coding Beast', date: 'Oct 24, 2026', xp: '+200 XP', icon: Code2, tone: 'emerald' },
	{ title: 'XP Hunter', date: 'Oct 22, 2026', xp: '+150 XP', icon: Zap, tone: 'cyan' },
];

const toneStyles = {
	amber: {
		icon: 'border-amber-400/20 bg-amber-400/[0.08] text-amber-200',
		glow: 'shadow-[0_0_26px_rgba(251,191,36,0.07)]',
	},
	cyan: {
		icon: 'border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-200',
		glow: 'shadow-[0_0_26px_rgba(34,211,238,0.07)]',
	},
	blue: {
		icon: 'border-blue-400/20 bg-blue-400/[0.08] text-blue-200',
		glow: 'shadow-[0_0_26px_rgba(96,165,250,0.07)]',
	},
	emerald: {
		icon: 'border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-200',
		glow: 'shadow-[0_0_26px_rgba(52,211,153,0.07)]',
	},
};

const categoryIconStyles = {
	rose: 'border-rose-400/20 bg-rose-400/10 text-rose-200',
	emerald: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
	blue: 'border-blue-400/20 bg-blue-400/10 text-blue-200',
	amber: 'border-amber-400/20 bg-amber-400/10 text-amber-200',
	violet: 'border-violet-400/20 bg-violet-400/10 text-violet-200',
};

function AchievementCard({ achievement, tone }) {
	const { title, description, reward, icon: Icon, status, progress, progressLabel, color } = achievement;
	const unlocked = status === 'unlocked';
	const inProgress = status === 'in-progress';
	const styles = toneStyles[tone];
	const iconStyle = color ? categoryIconStyles[color] : styles.icon;

	return (
		<article
			className={`group relative overflow-hidden rounded-2xl border p-4 transition duration-200 hover:-translate-y-0.5 ${
				unlocked
					? `border-cyan-400/20 bg-slate-900/90 ${styles.glow} hover:border-cyan-300/35`
					: inProgress
						? 'border-slate-700 bg-slate-900/80 hover:border-slate-600'
						: 'border-slate-800/80 bg-slate-950/35 hover:border-slate-700'
			}`}
		>
			{unlocked && <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />}
			<div className="flex items-start justify-between gap-3">
				<span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${unlocked || inProgress ? iconStyle : 'border-slate-800 bg-slate-900 text-slate-600'}`}>
					{unlocked ? <Icon className="h-5 w-5" /> : inProgress ? <Icon className="h-5 w-5" /> : <LockKeyhole className="h-4 w-4" />}
				</span>
				<span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold ${
					unlocked
						? 'border-emerald-400/15 bg-emerald-400/[0.07] text-emerald-200'
						: inProgress
							? 'border-cyan-400/15 bg-cyan-400/[0.06] text-cyan-200'
							: 'border-slate-800 bg-slate-900/70 text-slate-500'
				}`}>
					{unlocked ? <Check className="h-3 w-3" /> : !inProgress && <LockKeyhole className="h-3 w-3" />}
					{unlocked ? 'Unlocked' : inProgress ? 'In progress' : 'Locked'}
				</span>
			</div>

			<h3 className={`mt-4 text-sm font-semibold ${unlocked ? 'text-white' : inProgress ? 'text-slate-100' : 'text-slate-300'}`}>{title}</h3>
			<p className="mt-1 min-h-8 text-xs leading-5 text-slate-500">{description}</p>

			{(progress !== undefined || unlocked) && (
				<div className="mt-3">
					<div className="mb-1.5 flex items-center justify-between gap-2 text-[10px]">
						<span className="text-slate-500">{progressLabel || 'Complete'}</span>
						<span className={unlocked ? 'text-emerald-300' : inProgress ? 'text-cyan-200' : 'text-slate-500'}>{unlocked ? '100%' : `${progress}%`}</span>
					</div>
					<div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
						<div
							className={`h-full rounded-full transition-[width] duration-1000 ease-out ${
								unlocked ? 'bg-emerald-400' : inProgress ? 'animate-pulse bg-cyan-300' : 'bg-slate-600'
							}`}
							style={{ width: `${unlocked ? 100 : progress}%` }}
						/>
					</div>
				</div>
			)}

			<div className="mt-4 flex items-center justify-between border-t border-slate-800/70 pt-3">
				<span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600">Reward</span>
				<span className={`text-xs font-semibold ${unlocked ? 'text-amber-200' : 'text-slate-400'}`}>+{reward} XP</span>
			</div>
		</article>
	);
}

function Achievements() {
	return (
		<main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 sm:py-8 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<header className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
					<div>
						<p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75">Winter Arc 2026</p>
						<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Achievements</h1>
						<p className="mt-2 text-sm text-slate-400 sm:text-base">Build your legacy one milestone at a time.</p>
					</div>
					<div className="flex flex-wrap items-center gap-3">
						<div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-300">
							<Trophy className="h-3.5 w-3.5 text-cyan-200" />
							38 / 90 Days Completed
						</div>
						<div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-2 text-[11px] font-medium text-emerald-200">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-50" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
							</span>
							Progress active
						</div>
					</div>
				</header>

				<section aria-label="Achievement summary" className="mb-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
					{summaryCards.map(({ label, value, suffix, detail, icon: Icon, accent, iconBg }) => (
						<article key={label} className="group rounded-2xl border border-slate-800/90 bg-slate-900/75 p-4 shadow-[0_16px_38px_rgba(2,6,23,0.24)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900">
							<div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl border ${iconBg} ${accent}`}>
								<Icon className="h-4 w-4" />
							</div>
							<p className="text-xs font-medium text-slate-400">{label}</p>
							<div className="mt-1 flex items-baseline gap-1.5">
								<span className="text-2xl font-semibold tracking-tight text-white">{value}</span>
								{suffix && <span className="text-sm text-slate-400">{suffix}</span>}
							</div>
							<p className="mt-1 text-xs text-slate-500">{detail}</p>
						</article>
					))}
				</section>

				<section className="mb-7 overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-900/80 shadow-[0_20px_55px_rgba(8,47,73,0.16)]">
					<div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
						<div className="flex items-start gap-4">
							<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.09] text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.12)]">
								<Flame className="h-6 w-6" />
							</span>
							<div className="min-w-0">
								<div className="mb-1 flex flex-wrap items-center gap-2">
									<span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Next milestone</span>
									<span className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-2 py-0.5 text-[10px] font-medium text-cyan-100">+300 XP</span>
								</div>
								<h2 className="text-lg font-semibold text-white sm:text-xl">30 Day Streak</h2>
								<p className="mt-1 max-w-xl text-sm leading-6 text-slate-400">You have already built the hard part: showing up. Keep the rhythm going and make this month yours.</p>
							</div>
						</div>
						<div className="w-full lg:w-64">
							<div className="mb-2 flex items-center justify-between text-xs">
								<span className="text-slate-400">18 / 30 days</span>
								<span className="font-semibold text-cyan-100">60%</span>
							</div>
							<div className="h-2 overflow-hidden rounded-full bg-slate-800">
								<div className="h-full w-[60%] animate-pulse rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.45)]" />
							</div>
							<p className="mt-2 text-right text-[10px] text-slate-500">12 days to your next reward</p>
						</div>
					</div>
				</section>

				<div className="space-y-7">
					{achievementsByCategory.map((category) => (
						<section key={category.title}>
							<div className="mb-3 flex flex-wrap items-end justify-between gap-2">
								<div>
									<h2 className="text-base font-semibold text-white sm:text-lg">{category.title}</h2>
									<p className="mt-1 text-xs text-slate-500">{category.description}</p>
								</div>
								<span className="text-xs text-slate-500">{category.achievements.filter((achievement) => achievement.status === 'unlocked').length} unlocked</span>
							</div>
							<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
								{category.achievements.map((achievement) => (
									<AchievementCard key={achievement.title} achievement={achievement} tone={category.tone} />
								))}
							</div>
						</section>
					))}
				</div>

				<section className="mt-7 rounded-2xl border border-slate-800/90 bg-slate-900/75 p-4 shadow-[0_18px_45px_rgba(2,6,23,0.22)] backdrop-blur-sm sm:p-5">
					<div className="mb-4 flex items-center justify-between gap-3">
						<div>
							<h2 className="text-base font-semibold text-white sm:text-lg">Recent Unlocks</h2>
							<p className="mt-1 text-xs text-slate-500">A few wins worth remembering</p>
						</div>
						<span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-400/15 bg-amber-400/[0.06] text-amber-200">
							<Sparkles className="h-4 w-4" />
						</span>
					</div>
					<div className="grid gap-2 md:grid-cols-3">
						{recentUnlocks.map(({ title, date, xp, icon: Icon, tone }) => (
							<article key={title} className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-950/35 p-3 transition duration-200 hover:border-slate-700 hover:bg-slate-950/60">
								<span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${toneStyles[tone].icon}`}>
									<Icon className="h-4 w-4" />
								</span>
								<div className="min-w-0 flex-1">
									<h3 className="truncate text-sm font-medium text-slate-100">{title}</h3>
									<p className="mt-0.5 text-[11px] text-slate-500">Unlocked {date}</p>
								</div>
								<span className="shrink-0 text-xs font-semibold text-amber-200">{xp}</span>
							</article>
						))}
					</div>
				</section>
			</div>
		</main>
	);
}

export default Achievements;
