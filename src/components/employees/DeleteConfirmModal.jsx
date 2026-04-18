import { useEffect, useRef } from 'react'
import { Modal } from 'bootstrap'

function DeleteConfirmModal({ employee, onConfirm, onCancel, isLoading }) {
  const modalRef = useRef(null)
  const bsModal = useRef(null)

  useEffect(() => {
    bsModal.current = new Modal(modalRef.current, { backdrop: 'static' })
    return () => bsModal.current?.dispose()
  }, [])

  useEffect(() => {
    if (employee) {
      bsModal.current?.show()
    } else {
      bsModal.current?.hide()
      // Clean up Bootstrap leftovers
      document.body.style.overflow = ''
      document.body.classList.remove('modal-open')
      document.body.style.paddingRight = ''
      const backdrop = document.querySelector('.modal-backdrop')
      if (backdrop) backdrop.remove()
    }
  }, [employee])

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-semibold">Delete employee</h5>
          </div>
          <div className="modal-body">
            <p className="text-muted mb-0">
              Are you sure you want to remove{' '}
              <span className="fw-medium text-dark">{employee?.full_name}</span>?
              This action will deactivate the employee record.
            </p>
          </div>
          <div className="modal-footer border-0 pt-0">
            <button
              className="btn btn-outline-secondary"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onConfirm(employee?.id)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Deleting...
                </>
              ) : 'Yes, delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal