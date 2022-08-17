import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import React from "react";
import PropTypes from 'prop-types';
import { modalRoot } from "../utils/utils";

export default function Modal({ handleClose, title, children, hasOverlay }) {
    function handleKeydown(e) {
        return e.key === 'Escape' && handleClose();
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
                    <h2 className={title && `${styles.title} text text_type_main-large mt-10`}>{title}</h2>
                    { children }
                    <button onClick={handleClose} className={styles.button} >
                        <CloseIcon type="primary" />
                    </button>
                </div>
            </>
        ),
        modalRoot
    )
}

Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node.isRequired
}