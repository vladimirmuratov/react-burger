import React, {FC} from "react";
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {NavLink, useLocation} from 'react-router-dom';

import styles from './account.module.css';
import {useSelector} from "react-redux";

export const Account: FC = () => {
    const {pathname} = useLocation()
    const isExact = pathname === '/profile'

    const name = useSelector((state: any) => state.user.profile.name)
    const name2 = useSelector((state: any) => state.user?.user?.user?.name)

    return (
        <NavLink exact={true} to="/profile" className={styles.wrapper}>
            <span className={styles.icon}>
                <ProfileIcon type={isExact ? "primary" : "secondary"}/>
            </span>
            <span className={styles.block}>
                <span className={isExact ? styles.activeLink : styles.link}>Личный кабинет</span>
                {name
                    ? <span className={styles.footer}>{name}</span>
                    : <span className={styles.footer}>{name2}</span>
                }
            </span>
        </NavLink>
    )
}