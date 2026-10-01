import {
	Award,
	BadgeCheck,
	BookOpen,
	CalendarDays,
	Check,
	Code2,
	Dumbbell,
	Flame,
	Gem,
	Languages,
	Medal,
	Pencil,
	Share2,
	Shield,
	Sparkles,
	Target,
	Trophy,
	UserRound,
	Wallet,
	Zap,
} from 'lucide-react';

const profile = {
	name: 'Dinesh Reddy',
	username: '@dinesh',
	challenge: 'Winter Arc 2026',
	day: 38,
	totalDays: 90,
	rank: 'Gold',
	nextRank: 'Platinum',
	level: 18,
	xp: '1,840',
	currentStreak: 18,
	bestStreak: 24,
	rankProgress: 72,
};

const statistics = [
	{ label: 'Current Streak', value: '18', suffix: 'days', icon: Flame, tone: 'text-orange-200 border-orange-400/20 bg-orange-400/[0.08]' },
	{ label: 'Best Streak', value: '24', suffix: 'days', icon: Trophy, tone: 'text-amber-200 border-amber-400/20 bg-amber-400/[0.08]' },
	{ label: 'Total XP', value: '1,840', icon: Zap, tone: 'text-cyan-200 border-cyan-400/20 bg-cyan-400/[0.08]' },
	{ label: 'Days Completed', value: '38', suffix: '/ 90', icon: CalendarDays, tone: 'text-blue-200 border-blue-400/20 bg-blue-400/[0.08]' },
	{ label: 'Tasks Completed', value: '38', icon: Check, tone: 'text-emerald-200 border-emerald-400/20 bg-emerald-400/[0.08]' },
	{ label: 'Achievements', value: '8', icon: Award, tone: 'text-violet-200 border-violet-400/20 bg-violet-400/[0.08]' },
];

const categoryProgress = [
	{ name: 'Fitness', progress: 84, icon: Dumbbell, color: 'rose', track: 'bg-rose-400', iconStyle: 'text-rose-200 border-rose-400/20 bg-rose-400/10' },
	{ name: 'Coding', progress: 76, icon: Code2, color: 'emerald', track: 'bg-emerald-400', iconStyle: 'text-emerald-200 border-emerald-400/20 bg-emerald-400/10' },
	{ name: 'Study', progress: 78, icon: BookOpen, color: 'blue', track: 'bg-blue-400', iconStyle: 'text-blue-200 border-blue-400/20 bg-blue-400/10' },
	{ name: 'English', progress: 68, icon: Languages, color: 'amber', track: 'bg-amber-400', iconStyle: 'text-amber-200 border-amber-400/20 bg-amber-400/10' },
	{ name: 'Money', progress: 70, icon: Wallet, color: 'violet', track: 'bg-violet-400', iconStyle: 'text-violet-200 border-violet-400/20 bg-violet-400/10' },
];

const recentAchievements = [
	{ title: 'First Step', reward: '+50 XP', icon: Target, tone: 'text-cyan-200 border-cyan-400/20 bg-cyan-400/[0.08]' },
	{ title: 'Week Warrior', reward: '+100 XP', icon: Shield, tone: 'text-emerald-200 border-emerald-400/20 bg-emerald-400/[0.08]' },
	{ title: 'Two Week Fighter', reward: '+150 XP', icon: Medal, tone: 'text-orange-200 border-orange-400/20 bg-orange-400/[0.08]' },
	{ title: 'XP Hunter', reward: '+150 XP', icon: Gem, tone: 'text-violet-200 border-violet-400/20 bg-violet-400/[0.08]' },
];

const challengeDetails = [
	{ label: 'Start Date', value: 'October 1, 2026' },
	{ label: 'End Date', value: 'December 31, 2026' },
	{ label: 'Challenge Length', value: '90 Days' },
	{ label: 'Current Day', value: '38' },
	{ label: 'Overall Progress', value: '42%' },
];

function GlassCard({ children, className = '' }) {
	return <div className={`rounded-2xl border border-slate-800/90 bg-slate-900/75 shadow-[0_18px_45px_rgba(2,6,23,0.24)] backdrop-blur-sm ${className}`}>{children}</div>;
}

function Profile() {
	return (
		<main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 sm:py-8 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<header className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
					<div>
						<p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75">Winter Arc 2026</p>
						<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">My Profile</h1>
						<p className="mt-2 text-sm text-slate-400 sm:text-base">Your Winter Arc journey at a glance.</p>
					</div>
					<div className="flex gap-2">
						<button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:bg-slate-800">
							<Pencil className="h-3.5 w-3.5" />
							Edit Profile
						</button>
						<button type="button" className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/25 bg-cyan-400/[0.08] px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-400/[0.14]">
							<Share2 className="h-3.5 w-3.5" />
							Share Profile
						</button>
					</div>
				</header>

				<section className="mb-7 overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-900/80 shadow-[0_20px_55px_rgba(8,47,73,0.18)]">
					<div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[1fr_0.8fr] lg:items-center">
						<div className="flex flex-col gap-5 sm:flex-row sm:items-center">
							<div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-cyan-300/35 bg-slate-800/90 text-cyan-100 shadow-[0_0_38px_rgba(34,211,238,0.2)]">
								<span className="absolute inset-2 rounded-full border border-cyan-200/10" />
								<UserRound className="relative h-11 w-11" strokeWidth={1.5} />
							</div>
							<div>
								<div className="flex flex-wrap items-center gap-2">
									<h2 className="text-2xl font-semibold tracking-tight text-white">{profile.name}</h2>
									<span className="rounded-full border border-amber-400/25 bg-amber-400/[0.08] px-2 py-1 text-[10px] font-semibold text-amber-200">{profile.rank}</span>
								</div>
								<p className="mt-1 text-sm text-slate-400">{profile.username}</p>
								<div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
									<span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-cyan-200" />{profile.challenge}</span>
									<span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-blue-200" />Day {profile.day} of {profile.totalDays}</span>
								</div>
							</div>
						</div>

						<div className="border-t border-slate-800/80 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
							<div className="mb-3 flex items-center justify-between">
								<div>
									<p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Rank progress</p>
									<p className="mt-1 text-sm font-semibold text-white">{profile.rank} <span className="font-normal text-slate-500">to</span> {profile.nextRank}</p>
								</div>
								<span className="text-sm font-semibold text-cyan-200">{profile.rankProgress}%</span>
							</div>
							<div className="h-2 overflow-hidden rounded-full bg-slate-800">
								<div className="h-full w-[72%] rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.45)]" />
							</div>
							<div className="mt-3 flex items-center justify-between text-xs">
								<span className="text-slate-400">Level {profile.level} <span className="text-slate-600">·</span> {profile.xp} XP</span>
								<span className="text-cyan-200">72 XP to next rank</span>
							</div>
						</div>
					</div>
				</section>

				<section aria-label="Profile statistics" className="mb-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
					{statistics.map(({ label, value, suffix, icon: Icon, tone }) => (
						<GlassCard key={label} className="p-4 transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900">
							<div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl border ${tone}`}><Icon className="h-4 w-4" /></div>
							<p className="text-xs font-medium text-slate-400">{label}</p>
							<div className="mt-1 flex items-baseline gap-1.5"><span className="text-2xl font-semibold tracking-tight text-white">{value}</span>{suffix && <span className="text-sm text-slate-500">{suffix}</span>}</div>
						</GlassCard>
					))}
				</section>

				<div className="grid gap-7 xl:grid-cols-[1.2fr_0.8fr]">
					<section>
						<div className="mb-3 flex items-end justify-between gap-3"><div><h2 className="text-lg font-semibold text-white">Category Progress</h2><p className="mt-1 text-xs text-slate-500">Your momentum across the five pillars.</p></div><Target className="h-5 w-5 text-cyan-200/70" /></div>
						<div className="grid gap-3 sm:grid-cols-2">
							{categoryProgress.map(({ name, progress, icon: Icon, track, iconStyle }) => (
								<GlassCard key={name} className="p-4 transition duration-200 hover:border-slate-700">
									<div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${iconStyle}`}><Icon className="h-4 w-4" /></span><span className="text-sm font-semibold text-slate-100">{name}</span></div><span className="text-sm font-semibold text-white">{progress}%</span></div>
									<div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className={`h-full rounded-full ${track}`} style={{ width: `${progress}%` }} /></div>
								</GlassCard>
							))}
						</div>
					</section>

					<section>
						<div className="mb-3 flex items-end justify-between gap-3"><div><h2 className="text-lg font-semibold text-white">Recent Achievements</h2><p className="mt-1 text-xs text-slate-500">Milestones you have unlocked.</p></div><BadgeCheck className="h-5 w-5 text-cyan-200/70" /></div>
						<GlassCard className="divide-y divide-slate-800/80">
							{recentAchievements.map(({ title, reward, icon: Icon, tone }) => (
								<div key={title} className="flex items-center justify-between gap-3 p-4 transition hover:bg-slate-800/30"><div className="flex min-w-0 items-center gap-3"><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${tone}`}><Icon className="h-4 w-4" /></span><span className="truncate text-sm font-semibold text-slate-100">{title}</span></div><span className="shrink-0 text-xs font-semibold text-amber-200">{reward}</span></div>
							))}
						</GlassCard>
					</section>
				</div>

				<section className="mt-7">
					<div className="mb-3 flex items-end justify-between gap-3"><div><h2 className="text-lg font-semibold text-white">Winter Arc Information</h2><p className="mt-1 text-xs text-slate-500">The challenge timeline behind your progress.</p></div><Shield className="h-5 w-5 text-cyan-200/70" /></div>
					<GlassCard className="grid gap-0 divide-y divide-slate-800/80 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
						{challengeDetails.map(({ label, value }) => <div key={label} className="p-4"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p><p className="mt-2 text-sm font-semibold text-white">{value}</p></div>)}
					</GlassCard>
				</section>
			</div>
		</main>
	);
}

export default Profile;
