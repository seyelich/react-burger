import React, { FC, MouseEvent }  from "react";
import styles from './modal-overlay.module.css';

export const ModalOverlay: FC<{ handleClose: () => void }> = ({ handleClose }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    
    function handleClick(e: MouseEvent<HTMLDivElement>) {
        e.target === ref?.current && handleClose();
    }

    return (
        <div ref={ref} onClick={handleClick} className={styles.overlay}></div>
    )
}
