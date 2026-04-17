import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from 'bootstrap'
import { employeeSchema } from '../../schemas/employeeSchema'

function EmployeeModal({ employee, departments, jobTitles, onSubmit, onCancel, isLoading }) {
  const modalRef = useRef(null)
  const bsModal = useRef(null)
  const isEdit = !!employee?.id

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),
  })

  useEffect(() => {
    bsModal.current = new Modal(modalRef.current, { backdrop: 'static' })
    return () => bsModal.current?.dispose()
  }, [])

  useEffect(() => {
    if (employee !== null) {
      reset(employee?.id ? {
        ...employee,
        salary: Number(employee.salary),
        department_id: employee.department?.id || employee.department_id,
        job_title_id: employee.job_title?.id || employee.job_title_id,
      } : {
        currency: 'USD',
        employment_type: 'full_time',
        active: true,
      })
      bsModal.current?.show()
    } else {
      bsModal.current?.hide()
    }
  }, [employee, reset])

  const onFormSubmit = (data) => {
    if (isEdit) {
      onSubmit({ id: employee.id, ...data })
    } else {
      onSubmit(data)
    }
  }

  const Field = ({ name, label, type = 'text', placeholder }) => (
    <div className="mb-3">
      <label className="form-label fw-medium" style={{ fontSize: '13px' }}>{label}</label>
      <input
        type={type}
        className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        {...register(name, type === 'number' ? { valueAsNumber: true } : {})}
      />
      {errors[name] && (
        <div className="invalid-feedback">{errors[name].message}</div>
      )}
    </div>
  )

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-semibold">
              {isEdit ? 'Edit employee' : 'Add employee'}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
            />
          </div>
          <div className="modal-body">
            <form id="employee-form" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="row g-3">
                <div className="col-md-6">
                  <Field name="full_name" label="Full name" placeholder="John Smith" />
                </div>
                <div className="col-md-6">
                  <Field name="email" label="Email" type="email" placeholder="john@company.com" />
                </div>
                <div className="col-md-6">
                  <Field name="phone" label="Phone" placeholder="+1 555 000 0000" />
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-medium" style={{ fontSize: '13px' }}>Gender</label>
                    <select className="form-select" {...register('gender')}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <Field name="country" label="Country" placeholder="US" />
                </div>
                <div className="col-md-6">
                  <Field name="city" label="City" placeholder="New York" />
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-medium" style={{ fontSize: '13px' }}>Department</label>
                    <select
                      className={`form-select ${errors.department_id ? 'is-invalid' : ''}`}
                      {...register('department_id')}
                    >
                      <option value="">Select department</option>
                      {departments?.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                    {errors.department_id && (
                      <div className="invalid-feedback">{errors.department_id.message}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-medium" style={{ fontSize: '13px' }}>Job title</label>
                    <select
                      className={`form-select ${errors.job_title_id ? 'is-invalid' : ''}`}
                      {...register('job_title_id')}
                    >
                      <option value="">Select job title</option>
                      {jobTitles?.map(j => (
                        <option key={j.id} value={j.id}>{j.name} — {j.level}</option>
                      ))}
                    </select>
                    {errors.job_title_id && (
                      <div className="invalid-feedback">{errors.job_title_id.message}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label fw-medium" style={{ fontSize: '13px' }}>Employment type</label>
                    <select
                      className={`form-select ${errors.employment_type ? 'is-invalid' : ''}`}
                      {...register('employment_type')}
                    >
                      <option value="full_time">Full Time</option>
                      <option value="part_time">Part Time</option>
                      <option value="contract">Contract</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <Field name="salary" label="Salary" type="number" placeholder="85000" />
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label fw-medium" style={{ fontSize: '13px' }}>Currency</label>
                    <select className="form-select" {...register('currency')}>
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                      <option value="EUR">EUR</option>
                      <option value="INR">INR</option>
                      <option value="CAD">CAD</option>
                      <option value="AUD">AUD</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <Field name="hired_on" label="Hire date" type="date" />
                </div>
                <div className="col-md-6">
                  <Field name="date_of_birth" label="Date of birth" type="date" />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="employee-form"
              className="btn btn-primary"
              disabled={isLoading}
              style={{ background: '#1a1f2e', borderColor: '#1a1f2e' }}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Saving...
                </>
              ) : isEdit ? 'Update employee' : 'Add employee'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeModal