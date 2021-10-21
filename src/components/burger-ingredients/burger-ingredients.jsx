import React, {useEffect, useState} from "react";
import {Card} from "./card/card";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import {useSelector} from "react-redux";
import {Preloader} from "../preloader/preloader";

export const BurgerIngredients = () => {
    const data = useSelector(state => state.burger.ingredients)
    const isLoading = useSelector(state => state.burger.isLoading)

    const [bun, setBun] = useState([])
    const [main, setMain] = useState([])
    const [sauce, setSauce] = useState([])
    const [current, setCurrent] = useState('one')

    useEffect(() => {
        const content = document.getElementById('content')

        function scroll() {
            let scrollDistance = content.scrollTop
            if (scrollDistance === 0 && scrollDistance <= 350) {
                setCurrent('one')
            } else if (scrollDistance > 350 && scrollDistance < 1000) {
                setCurrent('two')
            } else if (scrollDistance >= 1000) {
                setCurrent('three')
            }
        }

        content.addEventListener('scroll', () => {
            scroll()
        })
        return () => {
            content.removeEventListener('scroll', scroll)
        }
    }, [data])

    const getProd = (type, setter) => {
        data && data.map(item => (item.type === type) && setter(prevState => [
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
                            {bun.map((p, index) => (
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