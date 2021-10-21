import React from 'react';
import styles from './app-header.module.css';
import {Constructor} from "./components-header/constructor/constructor";
import {Feed} from "./components-header/feed/feed";
import {LogoHeader} from "./components-header/logo-header/logo-header";
import {Account} from "./components-header/account/account";
import {useSelector} from "react-redux";
import {Login} from "./components-header/login/login";

export const AppHeader = () => {
    const isAuth = useSelector(state => state.user.isAuth)

    return (
        <header className={styles.wrapper}>
            <div className={styles.construct}>
                <Constructor/>
            </div>
            <div className={styles.feed}>
                <Feed/>
            </div>
            <div className={styles.logo}>
                <LogoHeader/>
            </div>
            <div className={styles.account}>
                {isAuth
                    ? (< Account/>)
                    : (<Login/>)
                }
            </div>
        </header>
    )
}