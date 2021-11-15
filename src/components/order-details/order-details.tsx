import React, {FC} from "react";
import styles from './order-details.module.css';
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TProps} from "./order-detail-types";

export const OrderDetails: FC<TProps> = ({number}) => {
    return (
        <div className={styles.content}>
            <p className="text text_type_digits-large mb-8 mt-20">{number}</p>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <CheckMarkIcon type="primary"/>
            <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_type_main-default text_color_inactive">Дождитесь
                готовности на орбитальной станции</p>
        </div>
    )
}