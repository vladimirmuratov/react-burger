import React, {FC} from "react";
import styles from './constructor.module.css';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {NavLink, useLocation} from 'react-router-dom'

export const Constructor: FC = () => {
    const {pathname} = useLocation()
    const isExact = pathname === '/'

    return (
        <NavLink exact={true} to="/" className={styles.wrapper}>
            <span className={styles.icon}>
                <BurgerIcon type={isExact ? "primary" : "secondary"}/>
            </span>
            <span className={isExact ? styles.activeLink : styles.link}>Конструктор</span>
        </NavLink>
    )
}