import React, {FC, useEffect} from "react";
import styles from './page-feed.module.css';
import {useDispatch, useSelector} from "../../services/hooks";
import {wsConnectionClose, wsConnectionStart} from "../../services/feed/actions";
import {WS_ORDERS_ALL} from "../../api/api";
import {OrderList} from "../../components/order-list/order-list";
import {FeedInfo} from "../../components/feed-info/feed-info";
import {Preloader} from "../../components/preloader/preloader";

export const FeedPage: FC = () => {
    const dispatch = useDispatch()
    const {orders, totalToday, total} = useSelector(state => state.feed)

    useEffect((): (() => void) => {
        dispatch(wsConnectionStart(WS_ORDERS_ALL))
        return () => dispatch(wsConnectionClose())
    }, [dispatch])

    return (
        <div className={styles.feedPage_wrapper}>
            {orders && totalToday && total
                ? <>
                    < h3 className={`${styles.feed_title} text text_type_main-large ml-6 mt-10 mb-5`}>Лента заказов</h3>
                    <div className={styles.feedPage_container}>
                        <OrderList/>
                        <FeedInfo/>
                    </div>
                </>
                : <Preloader/>
            }
        </div>
    )
}