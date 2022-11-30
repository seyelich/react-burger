import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import React, { FC } from "react";
import { modalRoot } from "../../utils/constants";
import { IModal } from "./types";

export const Modal: FC<IModal> = ({ handleClose, title, children, hasOverlay, titleClassName }) => {
    function handleKeydown(e: KeyboardEvent ) {
        e.key === 'Escape' && handleClose();
    }

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeydown)

        return () => {
            document.removeEventListener('keydown', handleKeydown)
        }
    }, []);
    
    return ReactDOM.createPortal(
        (
            <>
                {hasOverlay && <ModalOverlay handleClose={handleClose} />}
                <div className={styles.modal} >
                    <h2 className={title && `${styles.title} text ${titleClassName} mt-10`}>{title}</h2>
                    { children }
                    <button onClick={handleClose} className={styles.button} >
                        <CloseIcon type="primary" />
                    </button>
                </div>
            </>
        ),
        modalRoot!
    )
}
