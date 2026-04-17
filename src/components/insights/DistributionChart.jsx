import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts'

const COLORS = ['#4f8ef7', '#4fc9a4', '#a84ff7', '#f7654f']

function DistributionChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="text-center py-5 text-muted">
        <p>No data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="range" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value) => [value.toLocaleString(), 'Employees']}
          cursor={{ fill: 'transparent' }}
        />
        <Bar
          dataKey="count"
          radius={[4, 4, 0, 0]}
          activeBar={{ stroke: '#1a1f2e', strokeWidth: 1.5, fillOpacity: 0.85 }}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default DistributionChart