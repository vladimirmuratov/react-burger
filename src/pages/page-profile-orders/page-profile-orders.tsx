import React, {FC, useEffect} from "react";
import style from './page-profile-orders.module.css';
import {SideBar} from "../../components/sidebar/sidebar";
import {getProfileData} from "../../services/user/actions";
import {useDispatch} from "../../services/hooks";
import {getCookie} from "../../services/utils";
import {wsConnectionClose, wsConnectionStart} from "../../services/feed/actions";
import {WS_ORDERS_PROFILE} from "../../api/api";
import {OrderList} from "../../components/order-list/order-list";

export const ProfileOrdersPage: FC = () => {
    const dispatch = useDispatch()
    const accessToken = getCookie('accessToken')?.slice(6).trim()

    useEffect(() => {
        dispatch(getProfileData())
    }, [dispatch])

    useEffect((): (() => void) => {
        dispatch(wsConnectionStart(`${WS_ORDERS_PROFILE}${accessToken}`))
        return () => dispatch(wsConnectionClose())
    }, [dispatch, accessToken])

    return (
        <div className={style.pageProfileOrders_wrapper}>
            <div>
                <SideBar/>
            </div>
            <div className={style.pageProfileOrders_orderList}>
                <OrderList/>
            </div>
        </div>
    )
}