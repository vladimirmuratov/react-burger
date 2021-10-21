import React from "react";
import {Route, Switch, useLocation, useHistory} from "react-router-dom";
import {MainPage} from "../../pages/main/main";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {LoginPage} from "../../pages/login/login";
import {RegisterPage} from "../../pages/register/register";
import {ForgotPasswordPage} from "../../pages/forgot-password/forgot-password";
import {ResetPasswordPage} from "../../pages/reset-password/reset-password";
import {ProtectedRoute} from "../protected-route/protected-route";
import {ProfilePage} from "../../pages/profile/profile";
import {OrdersPage} from "../../pages/orders/orders";
import {NotFound404} from "../../pages/not-found/not-found";
import {Modal} from "../modal/modal";
import {useDispatch} from "react-redux";
import {deleteCurrentIngredient, openModalIngredient} from "../../services/ingredients/actions";
import {OrderPage} from "../../pages/order/order";

export const SwitchModal = () => {
    const history = useHistory()
    let location = useLocation()
    const action = history.action ==='PUSH' || history.action ==='REPLACE'
    let background = action && location.state && location.state.background

    const dispatch = useDispatch()

    const handleModalClose = () => {
        dispatch(openModalIngredient(false))
        dispatch(deleteCurrentIngredient())
        history.goBack()
    }

    return (
        <>
            <Switch location={background || location}>
                <Route exact={true} path="/" render={() => <MainPage/>}/>
                <Route exact={true} path="/ingredients/:id" render={() => <IngredientDetails/>}/>
                <Route exact={true} path="/login" render={() => <LoginPage/>}/>
                <Route exact={true} path="/register" render={() => <RegisterPage/>}/>
                <Route exact={true} path="/forgot-password" render={() => <ForgotPasswordPage/>}/>
                <Route exact={true} path="/reset-password" render={() => <ResetPasswordPage/>}/>
                <ProtectedRoute exact={true} path="/profile">
                    <ProfilePage/>
                </ProtectedRoute>
                <ProtectedRoute exact={true} path="/profile/orders">
                    <OrdersPage/>
                </ProtectedRoute>
                <ProtectedRoute exact={true} path="/profile/orders/:orderNum">
                    <OrderPage/>
                </ProtectedRoute>
                <Route exact={true} path="*" render={() => <NotFound404/>}/>
            </Switch>
            {background && (
                <Route
                    path='/ingredients/:id'
                    children={
                        <Modal title="Детали ингредиента" onClose={handleModalClose}>
                            <IngredientDetails/>
                        </Modal>
                    }
                />
            )}
        </>
    )
}