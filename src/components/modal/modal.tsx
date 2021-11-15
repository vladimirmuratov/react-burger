import React, {FC, useEffect} from "react";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import {TProps} from "./modal-types";
import {useSelector} from "../../services/hooks";


export const Modal: FC<TProps> = ({title = '', onClose, children}) => {
    const {isOpenModal} = useSelector(state => state.modal)

    useEffect(() => {
        if(!isOpenModal){
            return undefined
        }
    }, [isOpenModal])

    return (
        <ModalOverlay onClose={onClose}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <span className="text text_type_main-large">{title}</span>
                    <span className={styles.close}>
                        <CloseIcon type="primary" onClick={onClose}/>
                    </span>
                </div>
                {children}
            </div>
        </ModalOverlay>
    )
}