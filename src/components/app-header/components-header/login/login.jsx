import React from "react";
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css'
import {NavLink, useLocation} from "react-router-dom"

export const Login = () => {
    const {pathname} = useLocation()
    const isExact = pathname === '/login'

    return (
        <NavLink exact={true} to="/login" className={styles.wrapper}>
            <span className={styles.icon}>
                <ListIcon type={isExact ? "primary" : "secondary"}/>
            </span>
            <span className={isExact ? styles.activeLink : styles.link}>Войти</span>
        </NavLink>
    )
}