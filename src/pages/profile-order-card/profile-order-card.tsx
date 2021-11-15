import React, {FC, useEffect} from "react";
import {getProfileData} from "../../services/user/actions";
import {useDispatch} from "../../services/hooks";
import {OrderInfo} from "../../components/order-info/order-info";

export const ProfileOrderCard: FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfileData())
    }, [dispatch])

    return (
        <div>
            <OrderInfo/>
        </div>
    )
}