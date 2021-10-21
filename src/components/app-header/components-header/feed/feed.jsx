import React from "react";
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './feed.module.css'

export const Feed = () => {
    return(
        <button className={styles.wrapper}>
            <span>
                <ListIcon type="secondary"/>
            </span>
            <span className={styles.text}>Лента заказов</span>
        </button>
    )
}