import React, {FC} from "react";
import styles from './order.module.css';
import {TOrder} from "../../services/feed/types";
import {formattedDate} from "../../services/utils";
import {useDispatch, useSelector} from "../../services/hooks";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from "react-router-dom";
import {toggleModal} from "../../services/modal/actions";

export const Order: FC<TOrder> = ({...order}) => {
    let location = useLocation()
    const dispatch = useDispatch()

    const {ingredients} = useSelector(state => state.burger)
    const ids = order.ingredients

    const imagesArr: string[] = []
    let totalPrice = 0

    ids.forEach(id => {
        let tempPrice = 0
        ingredients.forEach(item => {
            if (id === item._id) {
                imagesArr.push(item.image_mobile)
                if (item.type === 'bun') {
                    tempPrice += item.price * 2
                } else {
                    tempPrice += item.price
                }
            }
        })
        totalPrice += tempPrice
    })

    const onOpenModal = () => {
        dispatch(toggleModal(true))
    }

    const onShowImages = (): JSX.Element[] => {
        const tempArr: JSX.Element[] = []
        if (imagesArr.length > 5) {
            for (let i = 0; i < 5; i++) {
                tempArr.push(
                    <picture key={i} className={styles.order_images}>
                        <img className={styles.order_image} src={imagesArr[i]} alt="imgName"/>
                    </picture>
                )
            }
            tempArr.push(
                <picture key={imagesArr[5]} className={styles.order_images}>
                    <img className={styles.order_image} src={imagesArr[5]} alt="imgName"/>
                    <span className={styles.order_amount}>+{imagesArr.length - 5}</span>
                </picture>
            )
        } else {
            imagesArr.forEach((item, index) => {
                tempArr.push(
                    <picture key={index} className={styles.order_images}>
                        <img className={styles.order_image} src={item} alt={item}/>
                    </picture>
                )
            })
        }

        return tempArr
    }

    return (
        <Link className={styles.link} to={{
            pathname: `${location.pathname}/${order.number}`,
            state: {background: location}
        }}>
            <li className={styles.order_wrapper} onClick={onOpenModal}>
                <div className={styles.order_num_date}>
                    <span className="text text_type_digits-default">{`#${order.number}`}</span>
                    <span
                        className="text text_type_main-default text_color_inactive">{formattedDate(order.createdAt)}</span>
                </div>
                <div className={`${styles.order_title} text text_type_main-medium`}>
                    <p>{order.name}</p>
                </div>
                <div className={styles.order_imagesBlock__wrapper}>
                    <div className={styles.order_imagesBlock}>
                        {onShowImages()}
                    </div>
                    <span className={`${styles.order_price} text text_type_digits-default`}>
                        {totalPrice}<CurrencyIcon type="primary"/>
                    </span>
                </div>
            </li>
        </Link>
    )
}