import React from "react";
import style from './orders.module.css';
import {SideBar} from "../../components/sidebar/sidebar";

export const OrdersPage = () => {
    return (
        <div className={style.wrapper}>
            <div>
                <SideBar/>
            </div>
            <div className={style.form}>
                OrdersPage
            </div>
        </div>
    )
}