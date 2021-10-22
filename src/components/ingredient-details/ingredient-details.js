import React from "react";
import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import {Ingredient} from "../ingredient/ingredient";

export const IngredientDetails = () => {
    const {id} = useParams()

    const ingredients = useSelector(state => state.burger.ingredients)
    const ingredient = useSelector(state => state.burger.currentIngredient)
    const ingredient2 = ingredients.find(item => item._id === id)

    return (
        <>
            {ingredient2 ? <Ingredient ingredient={ingredient2}/> : <Ingredient ingredient={ingredient}/>}
        </>
    )
}