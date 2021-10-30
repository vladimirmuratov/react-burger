import React, {FC, useState} from 'react';
import styles from './app-header.module.css';
import {Constructor} from "./components-header/constructor/constructor";
import {Feed} from "./components-header/feed/feed";
import {LogoHeader} from "./components-header/logo-header/logo-header";
import {Account} from "./components-header/account/account";
import {useSelector} from "react-redux";
import {Login} from "./components-header/login/login";
import {CloseIcon, MenuIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import {TState} from "./app-header-types";

export const AppHeader: FC = () => {
    const isAuth = useSelector<TState>(state => state.user.isAuth)
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false)

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
            <span className={isOpenMobileMenu ? styles.iconHidden : styles.menuIcon}>
                <MenuIcon type="secondary" onClick={() => setIsOpenMobileMenu(true)}/>
            </span>
            <div className={`${isOpenMobileMenu ? styles.mobileMenu : styles.iconHidden}`}>
                <span className={styles.closeIcon}>
                    <CloseIcon type="secondary" onClick={() => setIsOpenMobileMenu(false)}/>
                </span>
                <NavLink exact={true} to="/" onClick={() => setIsOpenMobileMenu(false)}>Конструктор</NavLink>
                <NavLink exact={true} to="/feed" onClick={() => setIsOpenMobileMenu(false)}>Лента</NavLink>
                {isAuth
                ? (<NavLink exact={true} to="/profile" onClick={() => setIsOpenMobileMenu(false)}>Личный кабинет</NavLink>)
                    : (<NavLink exact={true} to="/login" onClick={() => setIsOpenMobileMenu(false)}>Войти</NavLink>)
                }
            </div>
        </header>
    )
}