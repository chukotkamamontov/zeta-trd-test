import React, {useEffect, useState} from 'react'
import ReactDOM  from 'react-dom'
import styles from './Modal.module.css'

const Modal = ({open, onClose, getFormData, type, error, children}) => {
    
    

    const [text, setText] = useState('')
    // console.log(text)
    // console.log(text)

    if (!open) return null

    const inputHandler = (ev) => {
        ev.preventDefault()
        setText(ev.target.value);
        // getFormData(ev.target.value);
    }

    const formHandler = (ev) => {
        ev.preventDefault()
        getFormData(text)
        setText('')
        onClose()
    }
 
  
    return ReactDOM.createPortal(
        <>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.modal}>
                {/* <button>Close</button> */}
                {error && <div>{error}</div>}
                <div>type: {type}</div>
                <div>value: {text}</div>
                <form onSubmit={formHandler}>
                    {type === 'add' && <input type='text' value={text} onChange={inputHandler} placeholder='enter node name'/>}
                    {type === 'rename' && <input type='text' value={text} onChange={inputHandler} placeholder='enter new node name'/>}
                </form>
                {children}
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal