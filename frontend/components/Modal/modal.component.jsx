import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import styles from './modal.module.css'

export default function Modal({ show, onClose, children, title }) {
    const [isBrowser, setIsBrowser] = useState('');

    useEffect(() => setIsBrowser(true), [isBrowser])

    const handleClose = evt => {
        evt.preventDefault();
        onClose();
    }

    const modalContent = (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <a href="#" onClick={handleClose}>
                        <FaTimes />
                    </a>
                </div>
                {title && <div>{title}</div>}
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    )

    return (
        isBrowser ? ReactDOM.createPortal(
            show ? modalContent : null,
            document.getElementById('modal-root')
        ) : null
    )
}
