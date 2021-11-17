import React, {FC} from "react";
import { OrderInfo } from "../../components/order-info/order-info";
import style from './feed-card.module.css';
import {useSelector} from "../../services/hooks";

export const FeedCard: FC = () => {
    const {isOpenModal} = useSelector(state => state.modal)
    const classStyle = isOpenModal ? style.feedCardWrapper : ''

    return(
        <div className={classStyle}>
            <OrderInfo/>
        </div>
    )
}