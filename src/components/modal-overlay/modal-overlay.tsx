import React, {FC, useEffect} from "react";
import styles from './modal-overlay.module.css';
import ReactDOM from "react-dom";
import {useSelector} from "react-redux";
import {TProps} from "./modal-overlay-types";

const modalRoot: any = document.getElementById("modal");


export const ModalOverlay: FC<TProps> = ({onClose, children}) => {
    const isOpenModal = useSelector((state: any) => state.burger.isModalOpen)

    const handlerEscClick = (e: { key: string; }) => {
        if (e.key === "Escape") {
            onClose()
        }
    }

    //TODO any
    const handleOverlayClick = (e: { target: any; currentTarget: any; }) => {
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