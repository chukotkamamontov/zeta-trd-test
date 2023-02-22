import React, {useEffect} from 'react'
import ReactDOM  from 'react-dom'
import styles from './Modal.module.css'

const Modal = ({open, onClose, children}) => {
    
  if (!open) return null
  
  return ReactDOM.createPortal(
    <>
        <div className={styles.overlay} onClick={onClose}></div>
        <div className={styles.modal}>
            <button>Close</button>
            {children}
        </div>
    </>,
    document.getElementById('portal')
  )
}

export default Modal