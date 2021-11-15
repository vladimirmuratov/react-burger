import React, {FC} from "react";
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {NavLink, useLocation} from 'react-router-dom';
import styles from './account.module.css';

export const Account: FC = () => {
    const {pathname} = useLocation()
    const isExact = pathname === '/profile'

    return (
        <NavLink exact={true} to="/profile" className={styles.wrapper}>
            <span className={styles.icon}>
                <ProfileIcon type={isExact ? "primary" : "secondary"}/>
            </span>
            <span className={styles.block}>
                <span className={isExact ? styles.activeLink : styles.link}>Личный кабинет</span>
            </span>
        </NavLink>
    )
}