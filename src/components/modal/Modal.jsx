import React, { useState } from 'react'
import ReactDOM  from 'react-dom'
import styles from './Modal.module.css'

const Modal = ({open, onClose, getFormData, type, error}) => {

    const [text, setText] = useState('')

    const inputHandler = (ev) => {
        ev.preventDefault()
        setText(ev.target.value);
    }
    
    const formHandler = (ev) => {
        ev.preventDefault()
        getFormData(text)
        setText('')
        onClose()
    }
    
    if (!open) return null
  
    return ReactDOM.createPortal(
        <>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.modal}>
                <h1>{type}</h1>
                {error && <div>{error}</div>}
                <form onSubmit={formHandler}>
                    {!error && <input type='text' value={text} onChange={inputHandler} placeholder={type === 'add' ? 'Node Name': 'name'}/>}
                </form>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal