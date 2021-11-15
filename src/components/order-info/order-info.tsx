import React, {FC, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "../../services/hooks";
import style from './order-info.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {formattedDate, getCookie} from "../../services/utils";
import {useLocation, useParams} from "react-router-dom";
import {Preloader} from "../preloader/preloader";
import {wsConnectionClose, wsConnectionStart} from "../../services/feed/actions";
import {WS_ORDERS_ALL, WS_ORDERS_PROFILE} from "../../api/api";

export const OrderInfo: FC = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const {id} = useParams<{ id: string }>()
    const {orders, wsConnected} = useSelector(state => state.feed)
    const order = orders?.find(item => item.number === Number(id))
    const {number, name, status, ingredients: orderIdsIngredients, createdAt} = order || {}
    const {ingredients: data} = useSelector(state => state.burger)
    const accessToken = getCookie('accessToken')?.slice(6).trim()

    useEffect((): (() => void) => {
        if (location.pathname === `/feed/${id}`) {
            dispatch(wsConnectionStart(WS_ORDERS_ALL))
        }

        if (location.pathname === `/profile/orders/${id}`) {
            dispatch(wsConnectionStart(`${WS_ORDERS_PROFILE}${accessToken}`))
        }

        return () => dispatch(wsConnectionClose())
    }, [dispatch])


    const counts = useMemo(() => {
        return orderIdsIngredients?.reduce((acc: any, curr: any) => {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
        }, {})
    }, [orderIdsIngredients])

    const orderFeedItems = useMemo(() => {
        return data?.filter((item) => orderIdsIngredients?.includes(item._id))
    }, [orderIdsIngredients, data])

    const orderFeedItemsWithCounts = useMemo(() => {
        return orderFeedItems?.map((item) => ({
            _id: item._id,
            type: item.type,
            name: item.name,
            count: item.type === 'bun' ? 2 : counts[item._id],
            price: item.price * counts[item._id],
            image_mobile: item.image_mobile
        }))
    }, [counts, orderFeedItems])

    const price = useMemo(() => {
        return orderFeedItemsWithCounts.reduce((acc, el) => el.type === 'bun' ? acc + el.price * 2 : acc + el.price, 0);
    }, [orderFeedItemsWithCounts])

    return (
        <>
            {!wsConnected
                ? <Preloader/>
                : <div className={style.orderInfo_wrapper}>
                    <p className={`${style.orderInfo_wrapper__number} text text_type_digits-default mt-5 mb-10`}>{`#${number}`}</p>
                    <p className="text text_type_main-medium mb-3">{name}</p>
                    {status === 'done'
                        ? <p className={`${style.ready} text text_type_main-default mb-15`}>Выполнен</p>
                        : status === 'created'
                            ? <p className={`${style.created} text text_type_main-default mb-15`}>Создан</p>
                            : <p className={`${style.pending} text text_type_main-default mb-15`}>Готовится</p>
                    }
                    <p className="text text_type_main-medium mb-6">Состав:</p>
                    <ul className={`${style.orderInfo_blockItem} mb-5`}>
                        {orderFeedItemsWithCounts.map((item, index) => (
                            <li key={index} className={style.item}>
                                <div className={style.orderInfo_pict}>
                                    <img className={style.orderInfo_img} src={item.image_mobile}/>
                                </div>
                                <p className="text text_type_main-default">{item.name}</p>
                                <p className={`${style.item_price} text text_type_digits-default`}>{item.count} x {item.price}<CurrencyIcon
                                    type="primary"/></p>
                            </li>
                        ))}
                    </ul>
                    <div className={style.orderInfo_footer}>
                        <span
                            className="text text_type_main-default text_color_inactive">{formattedDate(createdAt)}</span>
                        <span
                            className={`${style.orderInfo_footer__price} text text_type_digits-default`}>{price}<CurrencyIcon
                            type={"primary"}/></span>
                    </div>
                </div>
            }
        </>
    )
}