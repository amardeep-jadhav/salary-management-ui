import { formatDate, getInitials } from '../../utils/salaryFormatter'

function RecentHiresTable({ data = [] }) {
  if (!data.length) {
    return <p className="text-muted text-center py-3" style={{ fontSize: '13px' }}>No recent hires in last 90 days</p>
  }

  return (
    <div className="table-responsive">
      <table className="table table-sm align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th style={{ fontSize: '12px', color: '#6c757d', fontWeight: '600' }}>Employee</th>
            <th style={{ fontSize: '12px', color: '#6c757d', fontWeight: '600' }}>Role</th>
            <th style={{ fontSize: '12px', color: '#6c757d', fontWeight: '600' }}>Country</th>
            <th style={{ fontSize: '12px', color: '#6c757d', fontWeight: '600' }}>Hired</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 8).map((hire, index) => {
            const colors = ['#4f8ef7', '#f7654f', '#4fc9a4', '#a84ff7', '#f7a84f']
            const color = colors[index % colors.length]
            return (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="avatar"
                      style={{
                        background: color + '20',
                        color: color,
                        width: '28px',
                        height: '28px',
                        fontSize: '11px'
                      }}
                    >
                      {getInitials(hire.full_name)}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>{hire.full_name}</span>
                  </div>
                </td>
                <td style={{ fontSize: '12px', color: '#6c757d' }}>{hire.job_title}</td>
                <td style={{ fontSize: '12px' }}>{hire.country}</td>
                <td>
                  <span className="badge bg-success bg-opacity-10 text-success" style={{ fontSize: '11px' }}>
                    {formatDate(hire.hired_on)}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RecentHiresTable