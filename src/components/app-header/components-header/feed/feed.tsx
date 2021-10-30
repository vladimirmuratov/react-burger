import React, {FC} from "react";
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './feed.module.css'
import {NavLink, useLocation} from "react-router-dom";

export const Feed:FC = () => {
    const {pathname} = useLocation()
    const isExact = pathname === '/feed'

    return (
        <NavLink exact={true} to="/feed" className={styles.wrapper}>
            <span className={styles.icon}>
                <ListIcon type={isExact ? "primary" : "secondary"}/>
            </span>
            <span className={isExact ? styles.activeLink : styles.link}>Лента заказов</span>
        </NavLink>
    )
}