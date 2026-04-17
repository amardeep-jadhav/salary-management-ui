import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#1a1f2e' }}>
      <div className="container-fluid px-4">
        <span className="navbar-brand fw-semibold d-flex align-items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect width="20" height="20" rx="5" fill="#4f8ef7" />
            <path d="M5 10h10M10 5v10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
          SalaryHR
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-1">
            <li className="nav-item">
              <NavLink
                to="/employees"
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded ${isActive ? 'bg-white bg-opacity-10 text-white fw-medium' : 'text-white-50'}`
                }
              >
                Employees
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/insights"
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded ${isActive ? 'bg-white bg-opacity-10 text-white fw-medium' : 'text-white-50'}`
                }
              >
                Insights
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar