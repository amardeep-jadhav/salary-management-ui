import { useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import { formatSalary, formatDate, getInitials, getEmploymentTypeBadge } from '../../utils/salaryFormatter'

function EmployeeTable({ employees, onEdit, onDelete, isLoading }) {
  const columns = useMemo(() => [
    {
      header: 'Employee',
      accessorKey: 'full_name',
      cell: ({ row }) => {
        const emp = row.original
        const initials = getInitials(emp.full_name)
        const colors = ['#4f8ef7', '#f7654f', '#4fc9f7', '#a84ff7', '#f7a84f']
        const color = colors[emp.full_name.charCodeAt(0) % colors.length]
        return (
          <div className="d-flex align-items-center gap-2">
            <div
              className="avatar"
              style={{ background: color + '20', color: color }}
            >
              {initials}
            </div>
            <div>
              <div className="fw-medium" style={{ fontSize: '14px' }}>{emp.full_name}</div>
              <div className="text-muted" style={{ fontSize: '12px' }}>{emp.email}</div>
            </div>
          </div>
        )
      }
    },
    {
      header: 'Department',
      accessorKey: 'department',
      cell: ({ row }) => (
        <div>
          <div style={{ fontSize: '14px' }}>{row.original.department?.name || '—'}</div>
          <div className="text-muted" style={{ fontSize: '12px' }}>{row.original.job_title?.name || '—'}</div>
        </div>
      )
    },
    {
      header: 'Location',
      accessorKey: 'country',
      cell: ({ row }) => (
        <div>
          <div style={{ fontSize: '14px' }}>{row.original.country}</div>
          <div className="text-muted" style={{ fontSize: '12px' }}>{row.original.city || '—'}</div>
        </div>
      )
    },
    {
      header: 'Salary',
      accessorKey: 'salary',
      cell: ({ row }) => (
        <span className="salary-cell">
          {formatSalary(row.original.salary, row.original.currency)}
        </span>
      )
    },
    {
      header: 'Type',
      accessorKey: 'employment_type',
      cell: ({ row }) => {
        const badge = getEmploymentTypeBadge(row.original.employment_type)
        return (
          <span className={`badge bg-${badge.color} bg-opacity-10 text-${badge.color}`}
            style={{ fontSize: '11px' }}>
            {badge.label}
          </span>
        )
      }
    },
    {
      header: 'Hired',
      accessorKey: 'hired_on',
      cell: ({ row }) => (
        <span className="text-muted" style={{ fontSize: '13px' }}>
          {formatDate(row.original.hired_on)}
        </span>
      )
    },
    {
      header: '',
      id: 'actions',
      cell: ({ row }) => (
        <div className="d-flex gap-1 justify-content-end">
          <button
            className="btn btn-sm btn-outline-primary btn-action"
            onClick={() => onEdit(row.original)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger btn-action"
            onClick={() => onDelete(row.original)}
          >
            Delete
          </button>
        </div>
      )
    },
  ], [onEdit, onDelete])

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    )
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  style={{
                    fontSize: '12px', fontWeight: '600',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    color: '#6c757d', borderBottom: '2px solid #e9ecef',
                    padding: '10px 12px', whiteSpace: 'nowrap'
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-5 text-muted">
                No employees found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} style={{ padding: '10px 12px' }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeTable