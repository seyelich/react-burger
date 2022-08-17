import React from "react";
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay({ handleClose }) {
    const ref = React.useRef(null);
    
    function handleClick(e) {
        return e.target === ref.current && handleClose();
    }

    return (
        <div ref={ref} onClick={handleClick} className={styles.overlay}></div>
    )
}

ModalOverlay.propTypes = {
    handleClose: PropTypes.func.isRequired
}