import React from "react";
import styles from './card.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {addCurrentIngredient, openModalIngredient} from "../../../services/ingredients/actions";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";

export const Card = ({product}) => {
    const data = useSelector(state => state.burger.ingredientsInConstructor)
    const totalCount = data.length && data.filter(item => item._id === product._id).reduce((accum, item) => accum + item.count, 0)
    const dispatch = useDispatch()

    let location = useLocation();

    const type = product.type === 'bun' ? 'bun' : 'item'
    const [, dragRef] = useDrag({
        type: type,
        item: {...product}
    })

    const openModal = () => {
        dispatch(addCurrentIngredient(product))
        dispatch(openModalIngredient(true))
    }

    return (
        <Link to={{
            pathname: `/ingredients/${product._id}`,
            state: {background: location}
        }}
              className={styles.link}
        >
            <div ref={dragRef} className={styles.wrapper} onClick={openModal}>
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

Card.propTypes = {
    product: PropTypes.object.isRequired
}