import React, {FC} from "react";
import styles from './logo-header.module.css';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';

export const LogoHeader: FC = () => {
    return(
        <div className={styles.wrapper}>
            <Logo/>
        </div>
    )
}