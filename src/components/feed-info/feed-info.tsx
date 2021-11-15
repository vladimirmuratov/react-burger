import React, {FC, useCallback} from "react";
import style from './feed-info.module.css';
import {useSelector} from "../../services/hooks";
import {TOrder} from "../../services/feed/types";

export const FeedInfo: FC = () => {
    const {orders, total, totalToday} = useSelector(state => state.feed)

    const orderReady: Array<TOrder> = []
    const orderInProgress: Array<TOrder> = []

    orders.forEach(item => item.status === 'done' ? orderReady.push(item) : orderInProgress.push(item))

    const showNumbers = useCallback((array: Array<TOrder>, styleClass) => {
        return (
            <>
                <ul className={style.feedInfo_block__scroll}>
                    {
                        array?.map((item, index) => (
                            <li key={item._id}
                                className={`${styleClass} text text_type_digits-default`}>{item.number}
                            </li>
                        ))
                    }
                </ul>
            </>
        )
    }, [])

    return (
        <div className={style.feedInfo_wrapper}>
            <div className={style.feedInfo_blockReadyInfo}>
                <div className={style.feedInfo_block}>
                    <h3 className="text text_type_main-medium pb-6">Готовы:</h3>
                    {showNumbers(orderReady, style.ready)}
                </div>
                <div className={style.feedInfo_block}>
                    <h3 className="text text_type_main-medium pb-6">В работе:</h3>
                    {showNumbers(orderInProgress, style.work)}
                </div>
            </div>
            <p className="text text_type_main-medium mt-6">Выполнено за все время:</p>
            <p className="text text_type_digits-medium">{total}</p>
            <p className="text text_type_main-medium mt-6">Выполнено за сегодня:</p>
            <p className="text text_type_digits-medium">{totalToday}</p>
        </div>
    )
}