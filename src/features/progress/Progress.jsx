import {
	Activity,
	Award,
	BookOpen,
	Check,
	CircleDot,
	Code2,
	Dumbbell,
	Flame,
	Languages,
	LockKeyhole,
	Sparkles,
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
import { useApp } from '../../context/AppContext';
import {
	getDailyHistory,
	getLifetimeStats,
	getTodayKey,
} from '../../data/dailyHistory';

function buildWeeklyGrowthData(dailyHistory) {
	const challengeStart = new Date(2026, 9, 1);
	const weeklyData = [];

	for (let week = 0; week < 11; week += 1) {
		const totals = {
			Fitness: 0,
			Coding: 0,
			Study: 0,
			English: 0,
			Money: 0,
		};

		let daysWithData = 0;

		for (let day = 0; day < 7; day += 1) {
			const date = new Date(challengeStart);

			date.setDate(
				challengeStart.getDate() + week * 7 + day,
			);

			const year = date.getFullYear();
			const month = String(
				date.getMonth() + 1,
			).padStart(2, '0');
			const dateNumber = String(
				date.getDate(),
			).padStart(2, '0');

			const dateKey =
				`${year}-${month}-${dateNumber}`;

			const progress = dailyHistory[dateKey];

			if (!progress) {
				continue;
			}

			daysWithData += 1;

			totals.Fitness += progress.Fitness ?? 0;
			totals.Coding += progress.Coding ?? 0;
			totals.Study += progress.Study ?? 0;
			totals.English += progress.English ?? 0;
			totals.Money += progress.Money ?? 0;
		}

		weeklyData.push({
			week: `Wk ${week + 1}`,
			Fitness:
				daysWithData > 0
					? Math.round(
							totals.Fitness /
								daysWithData,
						)
					: 0,
			Coding:
				daysWithData > 0
					? Math.round(
							totals.Coding /
								daysWithData,
						)
					: 0,
			Study:
				daysWithData > 0
					? Math.round(
							totals.Study /
								daysWithData,
						)
					: 0,
			English:
				daysWithData > 0
					? Math.round(
							totals.English /
								daysWithData,
						)
					: 0,
			Money:
				daysWithData > 0
					? Math.round(
							totals.Money /
								daysWithData,
						)
					: 0,
		});
	}

	return weeklyData;
}

const milestones = [
	{
		day: 30,
		title: 'Bronze',
		detail: 'First month complete',
		icon: Award,
		color: 'text-amber-300',
	},
	{
		day: 45,
		title: 'Diamond',
		detail: 'Next milestone',
		icon: Sparkles,
		color: 'text-cyan-200',
	},
	{
		day: 60,
		title: 'Elite',
		detail: 'Two-thirds through',
		icon: Zap,
		color: 'text-violet-300',
	},
	{
		day: 75,
		title: 'Master',
		detail: 'Final stretch',
		icon: Trophy,
		color: 'text-rose-300',
	},
	{
		day: 90,
		title: 'Winter Master',
		detail: 'Challenge complete',
		icon: LockKeyhole,
		color: 'text-slate-400',
	},
];

const chartTick = {
	fill: '#64748b',
	fontSize: 11,
};

const chartGrid = '#1e293b';

function ChartTooltip({
	active,
	payload,
	label,
	suffix = '%',
}) {
	if (!active || !payload?.length) {
		return null;
	}

	return (
		<div className="rounded-xl border border-slate-700 bg-slate-950/95 px-3 py-2.5 shadow-xl shadow-black/30">
			<p className="mb-2 text-xs font-medium text-slate-400">
				{label}
			</p>

			<div className="space-y-1.5">
				{payload.map((item) => (
					<div
						key={item.dataKey}
						className="flex items-center justify-between gap-5 text-xs"
					>
						<span className="flex items-center gap-2 text-slate-300">
							<span
								className="h-1.5 w-1.5 rounded-full"
								style={{
									backgroundColor:
										item.color,
								}}
							/>

							{item.name}
						</span>

						<span className="font-semibold text-white">
							{item.value}
							{suffix}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

function Progress() {
	const {
		tasks,
		totalXp,
		completedTaskCount,
		taskProgress,
		currentStreak,
		bestStreak,
	} = useApp();

	const dailyHistory = getDailyHistory();
	const lifetimeStats = getLifetimeStats();

	const weeklyGrowthData =
		buildWeeklyGrowthData(dailyHistory);

	const historyDays =
		Object.values(dailyHistory).filter(Boolean);

	const averageDailyXp =
		historyDays.length > 0
			? Math.round(
					lifetimeStats.totalXp /
						historyDays.length,
				)
			: 0;

	const lifetimeTaskCount =
		historyDays.reduce(
			(total, day) =>
				total +
				Number(day.totalTaskCount || 0),
			0,
		);

	const lifetimeCompletionRate =
		lifetimeTaskCount > 0
			? Math.round(
					(lifetimeStats.completedTasks /
						lifetimeTaskCount) *
						100,
				)
			: 0;

	const categoryAverages = [
		'Fitness',
		'Coding',
		'Study',
		'English',
		'Money',
	].map((category) => {
		const total = historyDays.reduce(
			(sum, day) =>
				sum + Number(day[category] || 0),
			0,
		);

		return {
			category,
			value:
				historyDays.length > 0
					? Math.round(
							total /
								historyDays.length,
						)
					: 0,
		};
	});

	const strongestCategory = [
		...categoryAverages,
	].sort(
		(a, b) => b.value - a.value,
	)[0];

	const challengeStart =
		new Date(2026, 9, 1);

	const today = new Date();

	const challengeDay = Math.min(
		Math.max(
			Math.floor(
				(today - challengeStart) /
					(1000 * 60 * 60 * 24),
			) + 1,
			1,
		),
		90,
	);

	const liveProgressData = [];

	for (
		let day = 1;
		day <= 90;
		day += 1
	) {
		const date =
			new Date(challengeStart);

		date.setDate(
			challengeStart.getDate() +
				day -
				1,
		);

		const year =
			date.getFullYear();

		const month = String(
			date.getMonth() + 1,
		).padStart(2, '0');

		const dateNumber = String(
			date.getDate(),
		).padStart(2, '0');

		const dateKey =
			`${year}-${month}-${dateNumber}`;

		const savedProgress =
			dailyHistory[dateKey];

		const categoryValues = [
			savedProgress?.Fitness ?? 0,
			savedProgress?.Coding ?? 0,
			savedProgress?.Study ?? 0,
			savedProgress?.English ?? 0,
			savedProgress?.Money ?? 0,
		];

		const overallProgress =
			categoryValues.length > 0
				? Math.round(
						categoryValues.reduce(
							(sum, value) =>
								sum + value,
							0,
						) /
							categoryValues.length,
					)
				: 0;

		liveProgressData.push({
			day,
			progress: overallProgress,
		});
	}

	const todayProgress =
		dailyHistory[getTodayKey()] || {};

	const categoryConfig = [
		{
			name: 'Fitness',
			icon: Dumbbell,
			color: 'text-rose-300',
			bar: 'bg-rose-400',
			tint: 'bg-rose-400/10 border-rose-400/20',
		},
		{
			name: 'Coding',
			icon: Code2,
			color: 'text-emerald-300',
			bar: 'bg-emerald-400',
			tint: 'bg-emerald-400/10 border-emerald-400/20',
		},
		{
			name: 'Study',
			icon: BookOpen,
			color: 'text-sky-300',
			bar: 'bg-sky-400',
			tint: 'bg-sky-400/10 border-sky-400/20',
		},
		{
			name: 'English',
			icon: Languages,
			color: 'text-amber-300',
			bar: 'bg-amber-300',
			tint: 'bg-amber-300/10 border-amber-300/20',
		},
		{
			name: 'Money',
			icon: Wallet,
			color: 'text-violet-300',
			bar: 'bg-violet-400',
			tint: 'bg-violet-400/10 border-violet-400/20',
		},
	];

	const categories =
		categoryConfig.map((category) => ({
			...category,
			value:
				todayProgress[
					category.name
				] ?? 0,
		}));

	const dynamicSummaryStats = [
		{
			label: 'Overall Progress',
			value: `${Math.round(taskProgress)}%`,
			detail: 'of your current tasks',
			icon: Activity,
			color: 'text-cyan-300',
			fill: 'from-cyan-400 to-sky-300',
		},
		{
			label: 'Current Streak',
			value: currentStreak,
			suffix: 'days',
			detail: 'You are on a roll',
			icon: Flame,
			color: 'text-orange-300',
			fill: 'from-orange-400 to-rose-400',
		},
		{
			label: 'Total XP',
			value: totalXp.toLocaleString(),
			detail: 'earned from tasks',
			icon: Zap,
			color: 'text-amber-300',
			fill: 'from-amber-300 to-yellow-400',
		},
		{
			label: 'Tasks Completed',
			value: completedTaskCount,
			suffix: `/ ${tasks.length}`,
			detail: 'completed today',
			icon: Check,
			color: 'text-emerald-300',
			fill: 'from-emerald-400 to-teal-300',
		},
	];

	const performanceStats = [
		{
			label: 'Best Streak',
			value: `${bestStreak} days`,
		},
		{
			label: 'Average Daily XP',
			value: `${averageDailyXp} XP`,
		},
		{
			label: 'Total Tasks Completed',
			value: `${lifetimeStats.completedTasks}`,
		},
		{
			label: 'Completion Rate',
			value: `${lifetimeCompletionRate}%`,
		},
	];

	return (
		<main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 sm:py-8 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<header className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
					<div>
						<p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75">
							Winter Arc 2026
						</p>

						<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
							Progress
						</h1>

						<p className="mt-2 text-sm text-slate-400 sm:text-base">
							Track your growth across the 90-day challenge.
						</p>
					</div>

					<div className="flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-2 text-xs font-medium text-cyan-100">
						<span className="relative flex h-2 w-2">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-50" />
							<span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
						</span>

						Day {challengeDay} of 90
					</div>
				</header>

				<section
					aria-label="Progress summary"
					className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
				>
					{dynamicSummaryStats.map(
						({
							label,
							value,
							suffix,
							detail,
							icon: Icon,
							color,
							fill,
						}) => (
							<article
								key={label}
								className="group relative overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/75 p-4 shadow-[0_16px_38px_rgba(2,6,23,0.24)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900"
							>
								<div
									className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-slate-800/80 ${color}`}
								>
									<Icon className="h-4 w-4" />
								</div>

								<p className="text-xs font-medium text-slate-400">
									{label}
								</p>

								<div className="mt-1 flex items-baseline gap-1.5">
									<span className="text-2xl font-semibold tracking-tight text-white">
										{value}
									</span>

									{suffix && (
										<span className="text-sm text-slate-400">
											{suffix}
										</span>
									)}
								</div>

								<p className="mt-1 text-xs text-slate-500">
									{detail}
								</p>

								<span
									className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r ${fill} opacity-50`}
								/>
							</article>
						),
					)}
				</section>

				<section className="mb-5 rounded-2xl border border-slate-800/90 bg-slate-900/75 p-4 shadow-[0_18px_45px_rgba(2,6,23,0.25)] backdrop-blur-sm sm:p-5">
					<div className="mb-5 flex flex-wrap items-start justify-between gap-4">
						<div>
							<div className="flex items-center gap-2">
								<h2 className="text-base font-semibold text-white sm:text-lg">
									90-Day Winter Arc Progress
								</h2>

								<span className="rounded-md border border-slate-700 bg-slate-800/80 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
									90 DAYS
								</span>
							</div>

							<p className="mt-1 text-xs text-slate-400">
								Your overall growth, day by day
							</p>
						</div>

						<div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-2.5 py-1.5 text-[11px] font-medium text-emerald-200">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
							Live Progress
						</div>
					</div>

					<div className="h-64 w-full sm:h-72">
						<ResponsiveContainer
							width="100%"
							height="100%"
						>
							<LineChart
								data={liveProgressData}
								margin={{
									top: 8,
									right: 10,
									left: -18,
									bottom: 0,
								}}
							>
								<CartesianGrid
									stroke={chartGrid}
									strokeDasharray="3 5"
									vertical={false}
								/>

								<XAxis
									dataKey="day"
									type="number"
									domain={[1, 90]}
									ticks={[
										1,
										15,
										30,
										45,
										60,
										75,
										90,
									]}
									tickFormatter={(day) =>
										`Day ${day}`
									}
									tick={chartTick}
									axisLine={false}
									tickLine={false}
									dy={10}
								/>

								<YAxis
									domain={[0, 100]}
									ticks={[
										0,
										25,
										50,
										75,
										100,
									]}
									tick={chartTick}
									tickFormatter={(value) =>
										`${value}%`
									}
									axisLine={false}
									tickLine={false}
								/>

								<Tooltip
									content={
										<ChartTooltip
											labelFormatter={(day) =>
												`Day ${day}`
											}
										/>
									}
									cursor={{
										stroke: '#334155',
										strokeDasharray:
											'4 4',
									}}
								/>

								<ReferenceLine
									x={challengeDay}
									stroke="#67e8f9"
									strokeDasharray="3 5"
									strokeOpacity={0.35}
								/>

								<Line
									type="monotone"
									dataKey="progress"
									name="Progress"
									stroke="#67e8f9"
									strokeWidth={3}
									dot={{
										r: 3,
										fill: '#0f172a',
										stroke: '#67e8f9',
										strokeWidth: 2,
									}}
									activeDot={{
										r: 6,
										fill: '#a5f3fc',
										stroke: '#164e63',
										strokeWidth: 3,
									}}
									isAnimationActive
									animationDuration={1400}
									animationEasing="ease-out"
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>

					<div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
						<span className="text-slate-500">
							Current pace
						</span>

						<span className="font-medium text-cyan-200">
							{Math.round(taskProgress)}%
							<span className="text-slate-500">
								{' '}
								of challenge complete
							</span>
						</span>
					</div>
				</section>

				<section className="mb-5">
					<div className="mb-3 flex items-end justify-between gap-4">
						<div>
							<h2 className="text-base font-semibold text-white sm:text-lg">
								Category Progress
							</h2>

							<p className="mt-1 text-xs text-slate-400">
								Momentum across your five focus areas
							</p>
						</div>

						<span className="hidden text-xs text-slate-500 sm:block">
							Today
						</span>
					</div>

					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
						{categories.map(
							({
								name,
								value,
								icon: Icon,
								color,
								bar,
								tint,
							}) => (
								<article
									key={name}
									className="group rounded-2xl border border-slate-800/90 bg-slate-900/75 p-4 shadow-[0_14px_35px_rgba(2,6,23,0.2)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900"
								>
									<div className="mb-4 flex items-center justify-between">
										<div
											className={`flex h-9 w-9 items-center justify-center rounded-xl border ${tint} ${color}`}
										>
											<Icon className="h-4 w-4" />
										</div>

										<span className="text-[11px] font-medium text-slate-500">
											Today
										</span>
									</div>

									<div className="flex items-end justify-between gap-2">
										<h3 className="text-sm font-medium text-slate-200">
											{name}
										</h3>

										<span className="text-xl font-semibold text-white">
											{value}
											<span className="text-xs text-slate-500">
												%
											</span>
										</span>
									</div>

									<div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
										<div
											className={`h-full rounded-full ${bar} transition-all duration-700 group-hover:brightness-110`}
											style={{
												width: `${value}%`,
											}}
										/>
									</div>
								</article>
							),
						)}
					</div>
				</section>

				<section className="mb-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
					<div className="rounded-2xl border border-slate-800/90 bg-slate-900/75 p-4 shadow-[0_18px_45px_rgba(2,6,23,0.25)] backdrop-blur-sm sm:p-5">
						<div className="mb-5">
							<h2 className="text-base font-semibold text-white sm:text-lg">
								Weekly Growth
							</h2>

							<p className="mt-1 text-xs text-slate-400">
								Category progress over the last 11 weeks
							</p>
						</div>

						<div className="mb-3 flex flex-wrap gap-x-4 gap-y-2">
							{[
								['Fitness', '#fb7185'],
								['Coding', '#4ade80'],
								['Study', '#60a5fa'],
								['English', '#facc15'],
								['Money', '#a78bfa'],
							].map(
								([name, color]) => (
									<span
										key={name}
										className="flex items-center gap-1.5 text-[11px] text-slate-400"
									>
										<span
											className="h-1.5 w-1.5 rounded-full"
											style={{
												backgroundColor:
													color,
											}}
										/>

										{name}
									</span>
								),
							)}
						</div>

						<div className="h-56 w-full sm:h-64">
							<ResponsiveContainer
								width="100%"
								height="100%"
							>
								<LineChart
									data={weeklyGrowthData}
									margin={{
										top: 8,
										right: 4,
										left: -22,
										bottom: 0,
									}}
								>
									<CartesianGrid
										stroke={chartGrid}
										strokeDasharray="3 5"
										vertical={false}
									/>

									<XAxis
										dataKey="week"
										tick={chartTick}
										axisLine={false}
										tickLine={false}
										dy={8}
									/>

									<YAxis
										domain={[0, 100]}
										ticks={[
											0,
											25,
											50,
											75,
											100,
										]}
										tick={chartTick}
										tickFormatter={(value) =>
											`${value}%`
										}
										axisLine={false}
										tickLine={false}
									/>

									<Tooltip
										content={
											<ChartTooltip
												labelFormatter={(week) =>
													week
												}
											/>
										}
										cursor={{
											stroke: '#334155',
											strokeDasharray:
												'4 4',
										}}
									/>

									<Line
										type="monotone"
										dataKey="Fitness"
										stroke="#fb7185"
										strokeWidth={2.2}
										dot={false}
										activeDot={{ r: 4 }}
										isAnimationActive
										animationDuration={1200}
									/>

									<Line
										type="monotone"
										dataKey="Coding"
										stroke="#4ade80"
										strokeWidth={2.2}
										dot={false}
										activeDot={{ r: 4 }}
										isAnimationActive
										animationDuration={1350}
									/>

									<Line
										type="monotone"
										dataKey="Study"
										stroke="#60a5fa"
										strokeWidth={2.2}
										dot={false}
										activeDot={{ r: 4 }}
										isAnimationActive
										animationDuration={1500}
									/>

									<Line
										type="monotone"
										dataKey="English"
										stroke="#facc15"
										strokeWidth={2.2}
										dot={false}
										activeDot={{ r: 4 }}
										isAnimationActive
										animationDuration={1650}
									/>

									<Line
										type="monotone"
										dataKey="Money"
										stroke="#a78bfa"
										strokeWidth={2.2}
										dot={false}
										activeDot={{ r: 4 }}
										isAnimationActive
										animationDuration={1800}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>

					<aside className="rounded-2xl border border-slate-800/90 bg-slate-900/75 p-4 shadow-[0_18px_45px_rgba(2,6,23,0.25)] backdrop-blur-sm sm:p-5">
						<div className="mb-5 flex items-start justify-between gap-3">
							<div>
								<h2 className="text-base font-semibold text-white sm:text-lg">
									Performance Summary
								</h2>

								<p className="mt-1 text-xs text-slate-400">
									Your Winter Arc at a glance
								</p>
							</div>

							<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-200">
								<Trophy className="h-4 w-4" />
							</span>
						</div>

						<div className="divide-y divide-slate-800/80">
							{performanceStats.map(
								({ label, value }) => (
									<div
										key={label}
										className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
									>
										<span className="text-xs text-slate-400">
											{label}
										</span>

										<span className="text-sm font-semibold text-slate-100">
											{value}
										</span>
									</div>
								),
							)}
						</div>

						<div className="mt-5 flex items-start gap-2.5 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] p-3">
							<CircleDot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" />

							<p className="text-xs leading-5 text-slate-400">
								Your strongest category is{' '}
								<span className="font-medium text-cyan-200">
									{strongestCategory?.category ||
										'Not available'}
								</span>{' '}
								with an average progress of{' '}
								<span className="font-medium text-white">
									{strongestCategory?.value ||
										0}
									%
								</span>{' '}
								across recorded days.
							</p>
						</div>
					</aside>
				</section>

				<section className="rounded-2xl border border-slate-800/90 bg-slate-900/75 p-4 shadow-[0_18px_45px_rgba(2,6,23,0.25)] backdrop-blur-sm sm:p-5">
					<div className="mb-5 flex flex-wrap items-end justify-between gap-3">
						<div>
							<h2 className="text-base font-semibold text-white sm:text-lg">
								90-Day Milestones
							</h2>

							<p className="mt-1 text-xs text-slate-400">
								Every finish line is another beginning
							</p>
						</div>

						<span className="text-xs font-medium text-cyan-200">
							{challengeDay}{' '}
							<span className="text-slate-500">
								/ 90 days
							</span>
						</span>
					</div>

					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
						{milestones.map(
							({
								day,
								title,
								detail,
								icon: Icon,
								color,
							}) => {
								const completed =
									challengeDay >= day;

								const current =
									challengeDay < day &&
									(day === 30 ||
										challengeDay >=
											day - 15);

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
											<span
												className={`flex h-8 w-8 items-center justify-center rounded-lg ${
													completed
														? 'bg-emerald-400/10 text-emerald-300'
														: current
															? 'bg-cyan-300/10 text-cyan-200'
															: 'bg-slate-800 text-slate-500'
												}`}
											>
												{completed ? (
													<Check className="h-4 w-4" />
												) : (
													<Icon
														className={`h-4 w-4 ${
															current
																? color
																: ''
														}`}
													/>
												)}
											</span>

											<span
												className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${
													completed
														? 'text-emerald-300'
														: current
															? 'text-cyan-200'
															: 'text-slate-500'
												}`}
											>
												{completed
													? 'Complete'
													: current
														? 'Current'
														: 'Upcoming'}
											</span>
										</div>

										<p className="text-xs text-slate-500">
											Day {day}
										</p>

										<h3
											className={`mt-0.5 text-sm font-semibold ${
												completed
													? 'text-emerald-100'
													: current
														? 'text-white'
														: 'text-slate-300'
											}`}
										>
											{title}
										</h3>

										<p className="mt-1 text-[11px] text-slate-500">
											{detail}
										</p>
									</article>
								);
							},
						)}
					</div>
				</section>
			</div>
		</main>
	);
}

export default Progress;