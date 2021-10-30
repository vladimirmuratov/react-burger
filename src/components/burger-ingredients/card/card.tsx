import React, {FC} from "react";
import styles from './card.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {addCurrentIngredient, openModal} from "../../../services/ingredients/actions";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {TItem, TProps, TStateBurger} from "./card-types";

export const Card: FC<TProps> = ({product}) => {
    const data: any = useSelector<TStateBurger>(state => state.burger.ingredientsInConstructor)
    const totalCount = data.length && data.filter((item: TItem) => item._id === product._id).reduce((accum: number, item: TItem) => accum + item.count, 0)
    const dispatch = useDispatch()

    let location = useLocation();

    const type = product.type === 'bun' ? 'bun' : 'item'
    const [, dragRef] = useDrag({
        type: type,
        item: {...product}
    })

    const onOpenModal = () => {
        dispatch(addCurrentIngredient(product))
        dispatch(openModal(true))
    }

    return (
        <Link to={{
            pathname: `/ingredients/${product._id}`,
            state: {background: location}
        }}
              className={styles.link}
        >
            <div ref={dragRef} className={styles.wrapper} onClick={onOpenModal}>
                {totalCount > 0 &&
                <span className={styles.counter}>
                    <Counter count={totalCount}/>
                </span>
                }
                <div>
                    <img src={product.image} alt={product.name}/>
                </div>
                <div className={styles.price}>
                    <p className="text text_type_digits-default">{product.price}</p>
                    <span><CurrencyIcon type={"primary"}/></span>
                </div>
                <div className={styles.text}>
                    <p className={"text text_type_main-default"}>{product.name}</p>
                </div>
            </div>
        </Link>
    )
}