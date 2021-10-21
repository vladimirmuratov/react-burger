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
            <div className={styles.wrapper__leftBlock}>
                <div>
                    <Constructor/>
                </div>
                <div>
                    <Feed/>
                </div>
            </div>
                <LogoHeader/>
            <div className={styles.wrapper__account}>
                {isAuth
                    ? (< Account/>)
                    : (<Login/>)
                }
            </div>
        </header>
    )
}