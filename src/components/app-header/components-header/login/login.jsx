import React from "react";
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './login.module.css'
import {useHistory, useRouteMatch} from "react-router-dom";
import styles from "../constructor/constructor.module.css";

export const Login = () => {
    const history = useHistory()
    const {isExact} = useRouteMatch()

    const clickHandler = () => {
        history.replace({pathname: "/login"})
    }

    return (
        <button className={style.wrapper} onClick={clickHandler}>
            <span>
                <ListIcon type={isExact ? "secondary" : "primary"}/>
            </span>
            <span className={isExact ? styles.link : styles.activeLink}>Войти</span>
        </button>
    )
}