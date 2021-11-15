import React, {FC, useEffect, useState} from "react";
import {Card} from "./card/card";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import {Preloader} from "../preloader/preloader";
import {TItem} from "../../types";
import {useSelector} from "../../services/hooks";

export const BurgerIngredients: FC = () => {
    const data = useSelector((state) => state.burger.ingredients)
    const isLoading = useSelector((state) => state.burger.isLoading)

    const [bun, setBun] = useState<Array<TItem>>([])
    const [main, setMain] = useState<Array<TItem>>([])
    const [sauce, setSauce] = useState<Array<TItem>>([])
    const [current, setCurrent] = useState<string>('one')

    useEffect(() => {
        const content: HTMLElement | null = document.getElementById('content')

        function scroll() {
            let scrollDistance = content && content.scrollTop
            if (scrollDistance === 0 && scrollDistance <= 350) {
                setCurrent('one')
            } else if (scrollDistance && (scrollDistance > 350 && scrollDistance < 1000)) {
                setCurrent('two')
            } else if (scrollDistance && (scrollDistance >= 1000)) {
                setCurrent('three')
            }
        }

        content && content.addEventListener('scroll', () => {
            scroll()
        })
        return () => {
            content && content.removeEventListener('scroll', scroll)
        }
    }, [data])

    const getProd = (type: string, setter: Function): void => {
        data && data.map((item: TItem) => (item.type === type) && setter((prevState: Array<TItem>) => [
            ...prevState,
            item
        ]))
    }

    useEffect(() => {
        getProd('bun', setBun)
        getProd('main', setMain)
        getProd('sauce', setSauce)
    }, [data])

    return (
        <>
            {!isLoading
                ? <section className={styles.block}>
                    <div className={styles.title}>
                        <p className="text text_type_main-large">Соберите бургер</p>
                    </div>
                    <div className={styles.tab}>
                        <a href="#one"><Tab active={current === 'one'} value={'one'}
                                            onClick={() => setCurrent('one')}>Булки</Tab></a>
                        <a href="#two"><Tab active={current === 'two'} value={'two'}
                                            onClick={() => setCurrent('two')}>Соусы</Tab></a>
                        <a href="#three"><Tab active={current === 'three'} value={'three'}
                                              onClick={() => setCurrent('three')}>Начинки</Tab></a>
                    </div>
                    <div className={styles.content} id='content'>
                        <div id="one" className={styles.subtitle}>
                            <p className="text text_type_main-medium">Булки</p>
                        </div>
                        <div className={styles.wrapper}>
                            {bun.map((p) => (
                                <Card key={p._id} product={p}/>
                            ))}
                        </div>
                        <div id="two" className={styles.subtitle}>
                            <p className="text text_type_main-medium">Соусы</p>
                        </div>
                        <div className={styles.wrapper}>
                            {sauce.map((p, index) => (
                                <Card key={p._id} product={p} index={index}/>
                            ))}
                        </div>
                        <div id="three" className={styles.subtitle}>
                            <p className="text text_type_main-medium">Начинки</p>
                        </div>
                        <div className={styles.wrapper}>
                            {main.map((p, index) => (
                                <Card key={p._id} product={p} index={index}/>
                            ))}
                        </div>
                    </div>
                </section>
                : <Preloader/>
            }
        </>
    )
}