import React, {FC} from "react";
import styles from './logo-header.module.css';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from "react-router-dom";

export const LogoHeader: FC = () => {
    return(
        <div className={styles.wrapper}>
            <Link to="/">
                <Logo/>
            </Link>
        </div>
    )
}