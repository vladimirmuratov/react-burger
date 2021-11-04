import React, {FC, useEffect} from "react";
import style from './page-order.module.css';
import {getProfileData} from "../../services/user/actions";
import {useDispatch} from "react-redux";

export const HistoryOrderPage: FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfileData())
    }, [dispatch])

    return (
        <div className={style.wrapper}>
            <div className={style.form}>
                  Page History Order
            </div>
        </div>
    )
}