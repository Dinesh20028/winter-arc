import {
	Bell,
	CalendarDays,
	ChevronDown,
	CircleUserRound,
	Command,
	Eye,
	KeyRound,
	LockKeyhole,
	LogOut,
	Palette,
	ShieldCheck,
	Sparkles,
	SunMedium,
	Trophy,
	UserRound,
} from 'lucide-react';

const appearanceSettings = [
	{ label: 'Theme', description: 'Keep your workspace focused after dark.', value: 'Dark', icon: SunMedium, control: 'select' },
	{ label: 'Accent Glow', description: 'Set the highlight color across your arc.', value: 'Winter Blue', icon: Sparkles, control: 'select' },
	{ label: 'Compact Mode', description: 'Use tighter spacing across the dashboard.', value: 'Off', icon: Command, control: 'toggle', enabled: false },
];

const notificationSettings = [
	{ label: 'Daily Mission Reminder', description: 'A nudge when your daily missions are waiting.', enabled: true },
	{ label: 'Streak Reminder', description: 'Protect your momentum before the day ends.', enabled: true },
	{ label: 'Achievement Notifications', description: 'Celebrate each milestone as it unlocks.', enabled: true },
	{ label: 'Leaderboard Updates', description: 'See when your standing changes.', enabled: false },
];

const privacySettings = [
	{ label: 'Profile Visibility', description: 'Choose who can view your Winter Arc profile.', value: 'Friends', icon: Eye, control: 'select' },
	{ label: 'Show on Global Leaderboard', description: 'Let your progress appear in the global rankings.', enabled: true },
	{ label: 'Show Current Streak', description: 'Make your consistency visible to friends.', enabled: true },
];

function GlassCard({ children, className = '' }) {
	return <div className={`rounded-2xl border border-slate-800/90 bg-slate-900/75 shadow-[0_18px_45px_rgba(2,6,23,0.24)] backdrop-blur-sm ${className}`}>{children}</div>;
}

function Toggle({ enabled }) {
	return (
		<span className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border p-0.5 transition ${enabled ? 'border-cyan-300/40 bg-cyan-400/25' : 'border-slate-700 bg-slate-800'}`}>
			<span className={`h-4.5 w-4.5 rounded-full shadow-sm transition ${enabled ? 'translate-x-5 bg-cyan-200 shadow-[0_0_10px_rgba(103,232,249,0.6)]' : 'translate-x-0 bg-slate-500'}`} />
		</span>
	);
}

function SelectControl({ value }) {
	return (
		<span className="inline-flex min-w-28 items-center justify-between gap-3 rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs font-semibold text-slate-200">
			{value}
			<ChevronDown className="h-3.5 w-3.5 text-cyan-200/70" />
		</span>
	);
}

function SettingRow({ label, description, value, icon: Icon, control, enabled }) {
	return (
		<div className="flex items-center justify-between gap-5 border-t border-slate-800/80 py-4 first:border-t-0 first:pt-0 last:pb-0">
			<div className="flex min-w-0 items-start gap-3">
				{Icon && <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-400/15 bg-cyan-400/[0.06] text-cyan-200"><Icon className="h-4 w-4" /></span>}
				<div className="min-w-0">
					<p className="text-sm font-semibold text-slate-100">{label}</p>
					<p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
				</div>
			</div>
			{control === 'select' ? <SelectControl value={value} /> : <Toggle enabled={enabled} />}
		</div>
	);
}

function SectionHeader({ icon: Icon, eyebrow, title }) {
	return (
		<div className="mb-5 flex items-center gap-3">
			<span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.08)]"><Icon className="h-4.5 w-4.5" /></span>
			<div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/65">{eyebrow}</p><h2 className="mt-1 text-lg font-semibold text-white">{title}</h2></div>
		</div>
	);
}

function Settings() {
	return (
		<main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 sm:py-8 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<header className="mb-8">
					<p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75">Winter Arc 2026</p>
					<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Settings</h1>
					<p className="mt-2 text-sm text-slate-400 sm:text-base">Customize your Winter Arc experience.</p>
				</header>

				<div className="grid gap-6 lg:grid-cols-2">
					<GlassCard className="p-5 sm:p-6">
						<SectionHeader icon={Palette} eyebrow="Personalize" title="Appearance" />
						{appearanceSettings.map((setting) => <SettingRow key={setting.label} {...setting} />)}
					</GlassCard>

					<GlassCard className="p-5 sm:p-6">
						<SectionHeader icon={Bell} eyebrow="Stay in rhythm" title="Notifications" />
						{notificationSettings.map((setting) => <SettingRow key={setting.label} {...setting} />)}
					</GlassCard>

					<GlassCard className="p-5 sm:p-6">
						<SectionHeader icon={Trophy} eyebrow="Your mission" title="Challenge Settings" />
						<div className="space-y-4">
							<div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-slate-100">Challenge</p><p className="mt-1 text-xs text-slate-500">Your active seasonal challenge.</p></div><span className="text-right text-xs font-semibold text-cyan-100">Winter Arc 2026</span></div>
							<div className="grid gap-3 border-t border-slate-800/80 pt-4 sm:grid-cols-2"><div className="flex items-center gap-3"><CalendarDays className="h-4 w-4 text-cyan-200" /><div><p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Start Date</p><p className="mt-1 text-xs font-semibold text-slate-200">October 1, 2026</p></div></div><div className="flex items-center gap-3"><CalendarDays className="h-4 w-4 text-blue-200" /><div><p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">End Date</p><p className="mt-1 text-xs font-semibold text-slate-200">December 31, 2026</p></div></div></div>
							<div className="border-t border-slate-800/80 pt-4"><SettingRow label="Streak Protection" description="Keep one missed day from breaking your run." enabled /></div>
						</div>
					</GlassCard>

					<GlassCard className="p-5 sm:p-6">
						<SectionHeader icon={ShieldCheck} eyebrow="Your boundaries" title="Privacy" />
						{privacySettings.map((setting) => <SettingRow key={setting.label} {...setting} />)}
					</GlassCard>
				</div>

				<GlassCard className="mt-6 p-5 sm:p-6">
					<SectionHeader icon={CircleUserRound} eyebrow="Account access" title="Account" />
					<div className="grid gap-3 sm:grid-cols-3">
						<button type="button" className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/45 p-3 text-left transition hover:border-cyan-400/30 hover:bg-slate-800/50"><UserRound className="h-4 w-4 text-cyan-200" /><span className="text-sm font-semibold text-slate-200">Profile</span></button>
						<button type="button" className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/45 p-3 text-left transition hover:border-cyan-400/30 hover:bg-slate-800/50"><KeyRound className="h-4 w-4 text-cyan-200" /><span className="text-sm font-semibold text-slate-200">Change Password</span></button>
						<button type="button" className="flex items-center gap-3 rounded-xl border border-rose-400/15 bg-rose-400/[0.04] p-3 text-left transition hover:border-rose-300/35 hover:bg-rose-400/[0.08]"><LogOut className="h-4 w-4 text-rose-200" /><span className="text-sm font-semibold text-rose-100">Sign Out</span></button>
					</div>
				</GlassCard>

				<section className="relative mt-6 overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-6 text-center shadow-[0_20px_55px_rgba(8,47,73,0.16)] sm:p-8">
					<div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-cyan-300/50 shadow-[0_0_18px_rgba(103,232,249,0.45)]" />
					<LockKeyhole className="mx-auto h-5 w-5 text-cyan-200/80" />
					<h2 className="mt-3 text-lg font-semibold text-white">Winter Arc 2026</h2>
					<p className="mt-2 text-sm text-slate-400">90 days. One mission. No excuses.</p>
				</section>
			</div>
		</main>
	);
}

export default Settings;
