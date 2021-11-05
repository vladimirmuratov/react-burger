import React, {FC, useCallback, useEffect, useState} from "react";
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {OrderDetails} from "../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {
    addIngredientInConstructor,
    clearConstructor,
    deleteIngredientInConstructor,
    incrementCount,
    openModal,
    updateConstructor
} from "../../services/ingredients/actions";
import {DraggableConstructorCard} from "../draggable-constructor-card/draggable-constructor-card";
import {Modal} from "../modal/modal";
import {clearOrder, postOrderData} from "../../services/order/actions";
import {useHistory} from 'react-router-dom';
import {TItem} from "../../types";
import {getProfileData} from "../../services/user/actions";


export const BurgerConstructor: FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const data = useSelector((state: any) => state.burger.ingredientsInConstructor)
    const orderNum = useSelector((state: any) => state.order.orderNum)
    const isAuth = useSelector((state: any) => state.user.isAuth)

    const bun: Array<TItem> = data.length && data.filter((item: TItem) => item.type === 'bun')
    const ingredients: Array<TItem> = data.length && data.filter((item: TItem) => item.type !== 'bun')
    const isVisibleModal = useSelector((state: any) => state.burger.isModalOpen)

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
        if (bun.length) {
            let data = bun.concat(newCards)
            dispatch(updateConstructor(data))
        } else {
            dispatch(updateConstructor(newCards))
        }
    }, [data, bun, dispatch])

    useEffect(() => {
        if(refreshToken){
            dispatch(getProfileData())
        }
    }, [dispatch, refreshToken])

    useEffect(() => {
        const sum = data.reduce((accum: number, item: TItem) => item.type === 'bun' ? accum + item.price * 2 : accum + item.price, 0)
        setTotal(sum)
    }, [data])

    const addItem = (item: TItem) => {
        dispatch(addIngredientInConstructor(item))
        dispatch(incrementCount(item._id))
    }

    const openHandler = () => {
        if (!isAuth) {
            return history.replace({pathname: '/login'})
        }

        const arrIds: string[] = []
        data.map((item: TItem) => arrIds.push(item._id))
        dispatch(postOrderData(arrIds))
        dispatch(openModal(true))
    }

    const closeHandler = () => {
        dispatch(openModal(false))
        dispatch(clearOrder())
        dispatch(clearConstructor())
    }

    const deleteHandler = (id: number) => {
        dispatch(deleteIngredientInConstructor(id))
    }

    const modal = (
        <Modal onClose={closeHandler}>
            <OrderDetails number={orderNum && orderNum}/>
        </Modal>
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
                        {ingredients.length > 0
                            ? ingredients && ingredients.map((item: TItem, index: number) => (
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
                            <Button type={isAuth ? "primary" : "secondary"} size="large" onClick={openHandler}>
                                {isAuth ? 'Оформить заказ' : 'Войти'}
                            </Button>
                        )
                        : <></>
                    }
                </div>
            </section>
            {isVisibleModal && modal}
        </>
    )
}