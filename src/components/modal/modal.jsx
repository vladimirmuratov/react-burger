import React, {useEffect} from "react";
import PropTypes from "prop-types";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import {useSelector} from "react-redux";


export const Modal = ({title = '', onClose, children}) => {
    const isOpenModalIngredient = useSelector(state => state.burger.isModalIngredientOpen)
    const isOpenModalOrder = useSelector(state => state.order.isModalOrderOpen)

    useEffect(() => {
        if(!isOpenModalIngredient && !isOpenModalOrder){
            return undefined
        }
    }, [isOpenModalOrder, isOpenModalIngredient])

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

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node.isRequired
}