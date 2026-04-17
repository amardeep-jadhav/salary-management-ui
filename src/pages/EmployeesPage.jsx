import { useState, useCallback, useRef } from 'react'
import { useEmployees, useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from '../hooks/useEmployees'
import { useQuery } from '@tanstack/react-query'
import { getDepartments, getJobTitles } from '../api/metaApi'
import EmployeeTable from '../components/employees/EmployeeTable'
import EmployeeModal from '../components/employees/EmployeeModal'
import DeleteConfirmModal from '../components/employees/DeleteConfirmModal'
import ErrorAlert from '../components/shared/ErrorAlert'
import { useDebounce } from '../hooks/useDebounce'

function EmployeesPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [countryFilter, setCountry] = useState('')
  const [deptFilter, setDept] = useState('')
  const [selectedEmployee, setSelected] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const debouncedSearch = useDebounce(search, 300)

  const { data, isLoading, isError } = useEmployees({
    page,
    search: debouncedSearch,
    country: countryFilter,
    department_id: deptFilter,
  })

  const { data: deptData } = useQuery({ queryKey: ['departments'], queryFn: getDepartments })
  const { data: titleData } = useQuery({ queryKey: ['job_titles'], queryFn: getJobTitles })

  const createEmployee = useCreateEmployee()
  const updateEmployee = useUpdateEmployee()
  const deleteEmployee = useDeleteEmployee()

  const handleAddClick = () => {
    setSelected({})
    setShowModal(true)
  }

  const handleEdit = useCallback((employee) => {
    setSelected(employee)
    setShowModal(true)
  }, [])

  const handleDelete = useCallback((employee) => {
    setDeleteTarget(employee)
  }, [])

  const handleModalClose = () => {
    setSelected(null)
    setShowModal(false)
  }

  const handleSubmit = (data) => {
    if (data.id) {
      updateEmployee.mutate(data, {
        onSuccess: () => handleModalClose()
      })
    } else {
      createEmployee.mutate(data, {
        onSuccess: () => handleModalClose()
      })
    }
  }

  const handleConfirmDelete = (id) => {
    deleteEmployee.mutate(id, {
      onSuccess: () => setDeleteTarget(null)
    })
  }

  const employees = data?.data || []
  const meta = data?.meta || {}

  return (
    <div>
      <div className="page-header">
        <div>
          <h4 className="fw-semibold mb-1">Employees</h4>
          <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
            {data?.meta?.total_count?.toLocaleString() || employees.length} total active employees
          </p>
        </div>
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          style={{ background: '#1a1f2e', borderColor: '#1a1f2e' }}
          onClick={handleAddClick}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
            <path d="M8 3v10M3 8h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Add employee
        </button>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body pb-0">
          <div className="row g-2 mb-3">
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <circle cx="6.5" cy="6.5" r="4.5" stroke="#6c757d" strokeWidth="1.5" />
                    <path d="M10 10l3 3" stroke="#6c757d" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1) }}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={countryFilter}
                onChange={e => { setCountry(e.target.value); setPage(1) }}
              >
                <option value="">All countries</option>
                {['US', 'GB', 'IN', 'DE', 'FR', 'CA', 'AU', 'SG', 'JP'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={deptFilter}
                onChange={e => { setDept(e.target.value); setPage(1) }}
              >
                <option value="">All departments</option>
                {deptData?.departments?.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-1">
              {(search || countryFilter || deptFilter) && (
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={() => { setSearch(''); setCountry(''); setDept(''); setPage(1) }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {isError && <div className="px-3"><ErrorAlert /></div>}

        <EmployeeTable
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />

        {meta.total_pages > 1 && (
          <div className="card-footer bg-white d-flex align-items-center justify-content-between">
            <span className="text-muted" style={{ fontSize: '13px' }}>
              Page {meta.current_page} of {meta.total_pages}
            </span>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPage(p => p - 1)}>Previous</button>
                </li>
                {Array.from({ length: Math.min(5, meta.total_pages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(page - 2, meta.total_pages - 4)) + i
                  return (
                    <li key={pageNum} className={`page-item ${pageNum === page ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setPage(pageNum)}>{pageNum}</button>
                    </li>
                  )
                })}
                <li className={`page-item ${page === meta.total_pages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPage(p => p + 1)}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {showModal && (
        <EmployeeModal
          employee={selectedEmployee}
          departments={deptData?.departments}
          jobTitles={titleData?.job_titles}
          onSubmit={handleSubmit}
          onCancel={handleModalClose}
          isLoading={createEmployee.isPending || updateEmployee.isPending}
        />
      )}

      <DeleteConfirmModal
        employee={deleteTarget}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleteEmployee.isPending}
      />
    </div>
  )
}

export default EmployeesPage