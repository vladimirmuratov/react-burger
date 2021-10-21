import React from "react";
import styles from './constructor.module.css';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useHistory, useRouteMatch} from 'react-router-dom'

export const Constructor = () => {
    const history = useHistory()
    const {isExact} = useRouteMatch()

    const clickHandler = () => {
        history.replace({pathname: "/"})
    }

    return(
        <button className={styles.wrapper} onClick={clickHandler}>
            <span>
                <BurgerIcon type={isExact ? "primary" : "secondary"}/>
            </span>
            <span className={isExact ? styles.activeLink : styles.link}>Конструктор</span>
        </button>
    )
}