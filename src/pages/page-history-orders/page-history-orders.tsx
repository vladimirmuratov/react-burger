import React, {FC} from "react";
import style from './page-history-orders.module.css';
import {SideBar} from "../../components/sidebar/sidebar";

export const HistoryOrdersPage: FC = () => {
    return (
        <div className={style.wrapper}>
            <div>
                <SideBar/>
            </div>
            <div className={style.form}>
                Page History Orders
            </div>
        </div>
    )
}