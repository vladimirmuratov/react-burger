import React, {FC, useEffect} from "react";
import styles from './ingredient.module.css';
import {TProps} from "./ingredient-types";
import {getCookie} from "../../services/utils";
import {useDispatch} from "react-redux";
import {getProfileData} from "../../services/user/actions";

export const Ingredient: FC<TProps> = ({ingredient}) => {
    // const dispatch = useDispatch()
   /* const accessToken = getCookie('accessToken')

    useEffect(() => {
        if(accessToken){
            dispatch(getProfileData())
        }
    }, [dispatch, accessToken])*/

    return(
        <div className={styles.content}>
            <div className={styles.img}>
                <img src={ingredient.image} alt={ingredient.name}/>
            </div>
            <p className="text text_type_main-medium p-2">{ingredient.name}</p>
            <div className={styles.footer}>
                <div className="mr-5">
                    <p className="text text_type_main-default text_color_inactive">Каллории, ккал</p>
                    <p className="text text_type_main-default text_color_inactive text_type_digits-default">{ingredient.calories}</p>
                </div>
                <div className="mr-5">
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive text_type_digits-default">{ingredient.proteins}</p>
                </div>
                <div className="mr-5">
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive text_type_digits-default">{ingredient.fat}</p>
                </div>
                <div>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive text_type_digits-default">{ingredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}