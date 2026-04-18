import { useEffect, useRef } from 'react'
import { Toast as BsToast } from 'bootstrap'

function Toast({ message, type = 'success', onClose }) {
  const toastRef = useRef(null)
  const bsToast = useRef(null)

  useEffect(() => {
    bsToast.current = new BsToast(toastRef.current, {
      delay: 3000,
      autohide: true,
    })

    toastRef.current.addEventListener('hidden.bs.toast', onClose)
    bsToast.current.show()

    return () => bsToast.current?.dispose()
  }, [])

  const config = {
    success: {
      icon: '✓',
      bg: '#1a1f2e',
      color: '#fff',
    },
    error: {
      icon: '✕',
      bg: '#dc3545',
      color: '#fff',
    },
  }

  const { icon, bg, color } = config[type] || config.success

  return (
    <div
      ref={toastRef}
      className="toast align-items-center border-0"
      role="alert"
      style={{
        background: bg,
        color: color,
        minWidth: '280px',
      }}
    >
      <div className="d-flex align-items-center gap-2 p-3">
        <span
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '700',
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
        <span style={{ fontSize: '14px', fontWeight: '500', flex: 1 }}>
          {message}
        </span>
        <button
          type="button"
          className="btn-close btn-close-white ms-2"
          onClick={() => bsToast.current?.hide()}
        />
      </div>
    </div>
  )
}

export default Toast