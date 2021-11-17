import React, {FC, useEffect} from "react";
import {getProfileData} from "../../services/user/actions";
import {useDispatch, useSelector} from "../../services/hooks";
import {OrderInfo} from "../../components/order-info/order-info";
import style from './profile-order-card.module.css';

export const ProfileOrderCard: FC = () => {
    const dispatch = useDispatch()
    const {isOpenModal} = useSelector(state => state.modal)
    const classStyle = isOpenModal ? style.profileOrderCard_wrapper : ''

    useEffect(() => {
        dispatch(getProfileData())
    }, [dispatch])

    return (
        <div className={classStyle}>
            <OrderInfo/>
        </div>
    )
}