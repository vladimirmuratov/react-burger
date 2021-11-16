import React, {FC, useMemo} from "react";
import {useSelector} from "../../services/hooks";
import {Order} from "../order/order";
import style from './order-list.module.css';

export const OrderList: FC = () => {
const {orders} = useSelector(state => state.feed)

    const renderOrders = useMemo(() => {
        return orders?.length > 0 && (
            orders?.map(order => (
                <Order key={order._id} {...order}/>
            ))
        )
    }, [orders])

    return(
        <ul className={style.orderList_wrapper}>
            {renderOrders}
        </ul>
    )
}