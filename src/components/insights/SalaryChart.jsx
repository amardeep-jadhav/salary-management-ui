import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import { formatSalary } from '../../utils/salaryFormatter'

const COLORS = [
  '#4f8ef7', '#f7654f', '#4fc9a4', '#a84ff7',
  '#f7a84f', '#4ff7c9', '#f74fa8', '#8ef74f',
  '#f7e24f', '#4f4ff7'
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded shadow-sm p-2" style={{ fontSize: '12px' }}>
        <p className="fw-medium mb-1">{label}</p>
        <p className="mb-0 text-primary">
          Avg: {formatSalary(payload[0].value, 'USD')}
        </p>
      </div>
    )
  }
  return null
}

function SalaryChart({ data = [] }) {
  const chartData = data.slice(0, 10).map(item => ({
    name: item.job_title?.length > 15
      ? item.job_title.substring(0, 15) + '...'
      : item.job_title,
    fullName: item.job_title,
    avg_salary: Math.round(Number(item.avg_salary)),
    headcount: item.headcount,
  }))

  if (!chartData.length) {
    return (
      <div className="text-center py-5 text-muted">
        <p>No data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="name"
          angle={-35}
          textAnchor="end"
          tick={{ fontSize: 11 }}
          interval={0}
        />
        <YAxis
          tick={{ fontSize: 11 }}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: 'transparent' }}
        />
        <Bar
          dataKey="avg_salary"
          radius={[4, 4, 0, 0]}
          activeBar={{ stroke: '#1a1f2e', strokeWidth: 1.5, fillOpacity: 0.85 }}
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default SalaryChart