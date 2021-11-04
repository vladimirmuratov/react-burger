import React, {FC, useEffect} from "react";
import style from './page-history-orders.module.css';
import {SideBar} from "../../components/sidebar/sidebar";
import {getProfileData} from "../../services/user/actions";
import {useDispatch} from "react-redux";

export const HistoryOrdersPage: FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfileData())
    }, [dispatch])

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