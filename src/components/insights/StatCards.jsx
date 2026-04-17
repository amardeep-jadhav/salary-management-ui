import { formatSalary } from '../../utils/salaryFormatter'

function StatCards({ data = [], currency = 'USD', country }) {

  const totals = data.reduce((acc, row) => {
    return {
      min_salary: acc.min_salary === null ? Number(row.min_salary) : Math.min(acc.min_salary, Number(row.min_salary)),
      max_salary: acc.max_salary === null ? Number(row.max_salary) : Math.max(acc.max_salary, Number(row.max_salary)),
      avg_salary: acc.avg_salary + (Number(row.avg_salary) * row.headcount),
      headcount: acc.headcount + row.headcount,
    }
  }, { min_salary: null, max_salary: null, avg_salary: 0, headcount: 0 })

  const avgSalary = totals.headcount > 0
    ? Math.round(totals.avg_salary / totals.headcount)
    : 0

  const cards = [
    {
      label: 'Minimum salary',
      value: formatSalary(totals.min_salary, currency),
      sub: 'Lowest in selection',
      color: '#4f8ef7',
    },
    {
      label: 'Maximum salary',
      value: formatSalary(totals.max_salary, currency),
      sub: 'Highest in selection',
      color: '#f7654f',
    },
    {
      label: 'Average salary',
      value: formatSalary(avgSalary, currency),
      sub: 'Weighted mean',
      color: '#4fc9a4',
    },
    {
      label: 'Total headcount',
      value: totals.headcount.toLocaleString(),
      sub: 'Active employees',
      color: '#a84ff7',
    },
  ]

  return (
    <>
      {!country && (
        <div
          className="alert alert-info d-flex align-items-center gap-2 py-2 px-3 mb-3"
          style={{ fontSize: '13px' }}
        >
          <svg
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            style={{ flexShrink: 0 }}
          >
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg>
          Salaries shown in USD. Select a specific country to see local currency values.
        </div>
      )}
      <div className="row g-3 mb-4">
        {cards.map((card) => (
          <div key={card.label} className="col-6 col-md-3">
            <div
              className="stat-card h-100"
              style={{
                borderLeft: `4px solid ${card.color}`,
                background: `linear-gradient(135deg, ${card.color}08 0%, #ffffff 60%)`,
              }}
            >
              <div
                className="stat-label"
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  color: card.color,
                  marginBottom: '0.5rem'
                }}
              >
                {card.label}
              </div>
              <div
                className="stat-value"
                style={{
                  color: card.color,
                  fontSize: '28px',
                  fontWeight: '800',
                  letterSpacing: '-0.5px',
                  lineHeight: '1.1',
                  marginBottom: '0.4rem'
                }}
              >
                {card.value}
              </div>
              <div
                className="stat-sub"
                style={{
                  fontSize: '12px',
                  color: '#6c757d',
                  fontWeight: '500'
                }}
              >
                {card.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default StatCards