import React from "react";
import {useParams} from 'react-router-dom';
import {Ingredient} from "../ingredient/ingredient";
import {TParams} from "./ingredient-details-types";
import {TItem} from "../../types";
import {useSelector} from "../../services/hooks";

export const IngredientDetails = () => {
    const {id}: TParams = useParams()

    const ingredients = useSelector((state) => state.burger.ingredients)
    const ingredient = useSelector((state) => state.burger.currentIngredient)
    const ingredient2 = ingredients.find((item: TItem) => item._id === id)

    return (
        <>
            {ingredient2 ? <Ingredient ingredient={ingredient2}/> : <Ingredient ingredient={ingredient}/>}
        </>
    )
}