import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {OrderDetails} from "../order-details/order-details";
import {useDrop} from "react-dnd";
import {
    addIngredientInConstructor,
    clearConstructor,
    deleteIngredientInConstructor,
    incrementCount,
    updateConstructor
} from "../../services/ingredients/actions";
import {DraggableConstructorCard} from "../draggable-constructor-card/draggable-constructor-card";
import {Modal} from "../modal/modal";
import {clearOrder, postOrderData} from "../../services/order/actions";
import {useHistory} from 'react-router-dom';
import {TItem} from "../../types";
import {getProfileData} from "../../services/user/actions";
import {useDispatch, useSelector} from "../../services/hooks";
import {toggleModal} from "../../services/modal/actions";
import {Preloader} from "../preloader/preloader";


export const BurgerConstructor: FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const {ingredientsInConstructor: data} = useSelector((state) => state.burger)
    const {orderNum} = useSelector((state) => state.order)
    const {isAuth} = useSelector((state) => state.user)

    const bun = useMemo(() => {
        return data?.filter((item: TItem) => item.type === 'bun')
    }, [data])

    const ingredients = useMemo(() => {
        return data?.filter((item: TItem) => item.type !== 'bun')
    }, [data])

    const {isOpenModal} = useSelector(state => state.modal)
    const [total, setTotal] = useState<number>(0)

    const refreshToken = localStorage.getItem('refreshToken')

    const [{isHoverBun}, dropTargetBun] = useDrop({
        accept: 'bun',
        collect: monitor => ({
            isHoverBun: monitor.isOver(),
        }),
        drop(item: TItem) {
            addItem(item)
        }
    })

    const [{isHover}, dropTargetItem] = useDrop({
        accept: 'item',
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item: TItem) {
            addItem(item)
        }
    })

    const [, dropTargetItem2] = useDrop({
        accept: 'itemDrop'
    })

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const newCards = [...data.filter((item: TItem) => item.type !== 'bun')];
        newCards.splice(hoverIndex, 0, newCards.splice(dragIndex, 1)[0]);
        if (bun.length > 0) {
            let data = bun.concat(newCards)
            dispatch(updateConstructor(data))
        } else {
            dispatch(updateConstructor(newCards))
        }
    }, [data, bun, dispatch])

    useEffect(() => {
        if (refreshToken) {
            dispatch(getProfileData())
        }
    }, [dispatch, refreshToken])

    const sum = useMemo(() => {
        return data?.reduce((accum: number, item: TItem) => item.type === 'bun' ? accum + item.price * 2 : accum + item.price, 0)
    }, [data])

    useEffect(() => {
        setTotal(sum)
    }, [sum])

    const addItem = (item: TItem) => {
        dispatch(addIngredientInConstructor(item))
        dispatch(incrementCount(item._id))
    }

    const makeOrder = () => {
        if (!isAuth) {
            return history.replace({pathname: '/login'})
        }

        const arrIds: Array<string> = []
        data.map((item: TItem) => arrIds.push(item._id))
        dispatch(postOrderData(arrIds))
        dispatch(toggleModal(true))
    }

    const closeHandler = useCallback(() => {
        dispatch(toggleModal(false))
        dispatch(clearOrder())
        dispatch(clearConstructor())
    }, [dispatch])

    const deleteHandler = (id: number) => {
        dispatch(deleteIngredientInConstructor(id))
    }

    const modalOrder = (
        <Modal onClose={closeHandler}>
            <OrderDetails number={orderNum ? orderNum : <Preloader/>}/>
        </Modal>
    )

    const modalWithPreloader = (
        <div className={styles.waitModal}>
            <Modal onClose={() => {}}>
                <OrderDetails number={orderNum ? orderNum : <Preloader/>}/>
            </Modal>
        </div>
    )

    return (
        <>
            <section className={styles.block}>
                <div className={`${styles.itemUp} ${isHoverBun && styles.activeBorder}`} ref={dropTargetBun}>
                    {bun.length
                        ? bun.map((item: TItem) => (
                            <ConstructorElement key={item._id} text={`${item.name} (верх)`} thumbnail={item.image}
                                                price={item.price}
                                                type="top"
                                                isLocked={true}/>
                        ))
                        : <p className="text text_type_main-default">Перетащите сюда булку</p>
                    }
                </div>
                <div className={`${styles.content} ${isHover && styles.activeBorder}`} ref={dropTargetItem}>
                    <div ref={dropTargetItem2}>
                        {ingredients?.length > 0
                            ? ingredients && ingredients?.map((item: TItem, index: number) => (
                            <DraggableConstructorCard
                                key={index}
                                item={item}
                                index={index}
                                customId={item.customId}
                                deleteHandler={deleteHandler}
                                moveCard={moveCard}
                            />
                        ))
                            : <p className="text text_type_main-default">Перетащите сюда ингредиенты</p>
                        }
                    </div>
                </div>
                <div className={styles.itemDown}>
                    {bun.length ?
                        bun.map((item: TItem) => (
                            <ConstructorElement key={item._id} text={`${item.name} (низ)`} thumbnail={item.image}
                                                price={item.price}
                                                type="bottom"
                                                isLocked={true}/>
                        ))
                        : <></>
                    }
                </div>

                <div className={styles.buttonBlock}>
                    {total
                        ? (
                            <>
                                <span className="text text_type_digits-medium">{total}</span>
                                <span className={styles.icon}><CurrencyIcon type="primary"/></span>
                            </>
                        )
                        : <></>}
                    {bun.length
                        ? (
                            <Button type={isAuth ? "primary" : "secondary"} size="large" onClick={makeOrder}>
                                {isAuth ? 'Оформить заказ' : 'Войти'}
                            </Button>
                        )
                        : <></>
                    }
                </div>
            </section>
            {isOpenModal && orderNum
                ? modalOrder
                : (isOpenModal && !orderNum) && modalWithPreloader
            }
        </>
    )
}