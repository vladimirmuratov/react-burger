import React from "react";
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useHistory, useRouteMatch} from 'react-router-dom';

import styles from './account.module.css';
import {useSelector} from "react-redux";

export const Account = () => {
    const history = useHistory()
    const {isExact} = useRouteMatch()
    const name = useSelector(state => state.user.profile.name)
    const name2 = useSelector(state => state.user?.user?.user?.name)

    const clickHandler = () => {
        history.replace({pathname: '/profile'})
    }

    return (
        <button className={styles.wrapper} onClick={clickHandler}>
            <span>
                <ProfileIcon type={isExact ? "secondary" : "primary"}/>
            </span>
            <span className={styles.block}>
                <span className={isExact ? styles.link : styles.activeLink}>Личный кабинет</span>
                {name
                    ? <span className={styles.footer}>{name}</span>
                    : <span className={styles.footer}>{name2}</span>
                }
            </span>
        </button>
    )
}