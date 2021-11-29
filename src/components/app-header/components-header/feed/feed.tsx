import React, {FC} from "react";
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './feed.module.css'
import {NavLink, useLocation} from "react-router-dom";

export const Feed:FC = () => {
    const {pathname} = useLocation()
    const isExact = pathname === '/feed'

    return (
        <NavLink exact={true} to="/feed" className={styles.feed_wrapper}>
            <span className={styles.feed_icon}>
                <ListIcon type={isExact ? "primary" : "secondary"}/>
            </span>
            <span className={isExact ? styles.feed_activeLink : styles.feed_link}>Лента заказов</span>
        </NavLink>
    )
}