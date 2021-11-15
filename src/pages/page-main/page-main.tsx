import React, {FC} from "react";
import styles from './page-main.module.css';
import {BurgerIngredients} from "../../components/burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../../components/burger-constructor/burger-constructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export const MainPage: FC = () => {

    return (
        <div className={styles.wrapper}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </DndProvider>
        </div>
    )
}