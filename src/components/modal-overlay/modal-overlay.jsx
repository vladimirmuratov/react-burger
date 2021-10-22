import React, {useEffect} from "react";
import styles from './modal-overlay.module.css';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const modalRoot = document.getElementById("modal");


export const ModalOverlay = ({onClose, children}) => {
    const isOpenModal = useSelector(state => state.burger.isModalOpen)

    const handlerEscClick = (e) => {
        if (e.key === "Escape") {
            onClose()
        }
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handlerEscClick)
        return () => {
            document.removeEventListener('keydown', handlerEscClick)
        }
    }, [])

    return (
        <>
            {(isOpenModal) &&
            ReactDOM.createPortal((
                    <div className={styles.parent} onClick={handleOverlayClick}>
                        {children}
                    </div>),
                modalRoot
            )
            }
        </>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}