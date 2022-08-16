import React from "react";
import ReactDOM from "react-dom";
import styles from './modal-overlay.module.css';
const modalRoot = document.getElementById("react-modals");

export default function ModalOverlay({ handleClose, ...props }) {
    const ref = React.useRef(null);
    
    function handleClick(e) {
        return e.target === ref.current && handleClose();
    }

    return ReactDOM.createPortal(
        (
            <div ref={ref} onClick={handleClick} className={styles.overlay}>{props.children}</div>
        ),
        modalRoot
    )
}