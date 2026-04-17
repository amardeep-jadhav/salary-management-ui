import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts'

const COLORS = [
  '#4f8ef7', '#f7654f', '#4fc9a4', '#a84ff7',
  '#f7a84f', '#4ff7c9', '#f74fa8', '#8ef74f',
  '#f7e24f', '#4f4ff7'
]

function HeadcountChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="text-center py-5 text-muted">
        <p>No data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 40, left: 80, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis type="number" tick={{ fontSize: 12 }} />
        <YAxis
          type="category"
          dataKey="department"
          tick={{ fontSize: 12 }}
          width={75}
        />
        <Tooltip
          formatter={(value) => [value.toLocaleString(), 'Employees']}
          cursor={{ fill: 'transparent' }}
        />
        <Bar
          dataKey="headcount"
          radius={[0, 4, 4, 0]}
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

export default HeadcountChart