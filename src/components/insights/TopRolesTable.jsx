import { formatSalary } from '../../utils/salaryFormatter'

function TopRolesTable({ data = [], currency = 'USD' }) {
  if (!data.length) return null

  return (
    <div className="table-responsive">
      <table className="table table-sm align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th style={{ fontSize: '12px', color: '#6c757d', fontWeight: '600' }}>#</th>
            <th style={{ fontSize: '12px', color: '#6c757d', fontWeight: '600' }}>Role</th>
            <th style={{ fontSize: '12px', color: '#6c757d', fontWeight: '600', textAlign: 'right' }}>Avg salary</th>
          </tr>
        </thead>
        <tbody>
          {data.map((role, index) => (
            <tr key={role.job_title}>
              <td>
                <span
                  className="badge rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{
                    width: '24px', height: '24px',
                    background: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#e9ecef',
                    color: index < 3 ? '#fff' : '#6c757d',
                    fontSize: '11px'
                  }}
                >
                  {index + 1}
                </span>
              </td>
              <td style={{ fontSize: '13px', fontWeight: '500' }}>{role.job_title}</td>
              <td style={{ fontSize: '13px', textAlign: 'right', fontWeight: '600', color: '#1a1f2e' }}>
                {formatSalary(role.avg_salary, currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TopRolesTable