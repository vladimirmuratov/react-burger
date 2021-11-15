import React, {FC, useCallback, useEffect} from "react";
import styles from './modal-overlay.module.css';
import ReactDOM from "react-dom";
import {TProps} from "./modal-overlay-types";
import {useSelector} from "../../services/hooks";

const modalRoot = document.getElementById("modal") as HTMLFormElement;


export const ModalOverlay: FC<TProps> = ({onClose, children}) => {
    const {isOpenModal} = useSelector(state => state.modal)

    const handlerEscClick = useCallback((e: { key: string; }) => {
        if (e.key === "Escape") {
            onClose()
        }
    }, [onClose, isOpenModal])

    const handleOverlayClick = useCallback((e: { target: any; currentTarget: any; }) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }, [onClose])

    useEffect(() => {
        document.addEventListener('keydown', handlerEscClick)
        return () => {
            document.removeEventListener('keydown', handlerEscClick)
        }
    }, [handlerEscClick])

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