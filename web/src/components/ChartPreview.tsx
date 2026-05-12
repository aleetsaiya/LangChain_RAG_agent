import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { chartColors } from '../constants/chat'
import type { ChartData } from '../types/chat'

type ChartPreviewProps = {
  chartData: ChartData
}

export function ChartPreview({ chartData }: ChartPreviewProps) {
  const chartRows = chartData.labels.map((label, index) => ({
    name: label,
    value: chartData.values[index],
  }))

  return (
    <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50/80 p-4">
      <div className="text-xs font-bold uppercase text-teal-700">Chart data</div>
      <h2 className="mt-1 text-lg font-semibold text-slate-950">
        {chartData.title}
      </h2>

      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartData.type === 'line' ? (
            <LineChart
              data={chartRows}
              margin={{ top: 12, right: 18, bottom: 4, left: -12 }}
            >
              <CartesianGrid stroke="#cbd5e1" strokeDasharray="4 4" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#475569', fontSize: 12 }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={false}
              />
              <YAxis
                domain={['dataMin - 0.05', 'dataMax + 0.05']}
                tick={{ fill: '#475569', fontSize: 12 }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  border: '1px solid #cbd5e1',
                  borderRadius: 8,
                  color: '#0f172a',
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0f766e"
                strokeWidth={3}
                dot={{ r: 5, fill: '#059669', stroke: '#ffffff', strokeWidth: 2 }}
                activeDot={{ r: 7, fill: '#0f766e' }}
              />
            </LineChart>
          ) : (
            <PieChart>
              <Tooltip
                formatter={(value) =>
                  typeof value === 'number' ? `${value}%` : `${value}`
                }
                contentStyle={{
                  border: '1px solid #cbd5e1',
                  borderRadius: 8,
                  color: '#0f172a',
                }}
              />
              <Pie
                data={chartRows}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="78%"
                innerRadius="48%"
                paddingAngle={2}
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {chartRows.map((row, index) => (
                  <Cell
                    key={row.name}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {chartRows.map((row, index) => (
          <div
            className="flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2 text-sm text-slate-700"
            key={row.name}
          >
            <span className="inline-flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ background: chartColors[index % chartColors.length] }}
              />
              {row.name}
            </span>
            <strong className="text-slate-950">
              {chartData.type === 'pie' ? `${row.value}%` : row.value.toFixed(2)}
            </strong>
          </div>
        ))}
      </div>
    </div>
  )
}
