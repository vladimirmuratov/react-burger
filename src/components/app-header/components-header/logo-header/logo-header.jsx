import React from "react";
import styles from './logo-header.module.css';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';

export const LogoHeader = () => {
    return(
        <div className={styles.wrapper}>
            <Logo/>
        </div>
    )
}