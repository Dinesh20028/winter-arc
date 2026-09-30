import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { day: 'Mon', Fitness: 52, Coding: 48, Study: 60, English: 46 },
  { day: 'Tue', Fitness: 58, Coding: 54, Study: 68, English: 49 },
  { day: 'Wed', Fitness: 63, Coding: 61, Study: 74, English: 55 },
  { day: 'Thu', Fitness: 69, Coding: 66, Study: 71, English: 58 },
  { day: 'Fri', Fitness: 72, Coding: 76, Study: 78, English: 64 },
  { day: 'Sat', Fitness: 78, Coding: 80, Study: 82, English: 70 },
  { day: 'Sun', Fitness: 84, Coding: 86, Study: 88, English: 76 },
];

function ProgressChart() {
  return (
    <div className="w-full rounded-3xl border border-slate-800/80 bg-[radial-gradient(circle_at_top,_rgba(14,116,144,0.12),_rgba(15,23,42,0)_35%),rgba(15,23,42,0.78)] p-4 shadow-[0_18px_40px_rgba(15,23,42,0.45)] backdrop-blur-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">Progress Overview</h3>
          <p className="mt-1 text-sm text-slate-400">Your 7-day consistency</p>
        </div>
        <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
          Live
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 16, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.15)" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <YAxis
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              fontSize={12}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '12px',
                color: '#e2e8f0',
              }}
              cursor={{ stroke: 'rgba(148, 163, 184, 0.35)', strokeWidth: 1 }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: 12,
                fontSize: '12px',
                color: '#cbd5e1',
              }}
            />
            <Line
              type="monotone"
              dataKey="Fitness"
              stroke="#f87171"
              strokeWidth={3}
              dot={{ r: 3, fill: '#f87171', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#fca5a5' }}
              animationDuration={900}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="Coding"
              stroke="#4ade80"
              strokeWidth={3}
              dot={{ r: 3, fill: '#4ade80', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#86efac' }}
              animationDuration={900}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="Study"
              stroke="#60a5fa"
              strokeWidth={3}
              dot={{ r: 3, fill: '#60a5fa', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#93c5fd' }}
              animationDuration={900}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="English"
              stroke="#facc15"
              strokeWidth={3}
              dot={{ r: 3, fill: '#facc15', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#fde68a' }}
              animationDuration={900}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProgressChart;
