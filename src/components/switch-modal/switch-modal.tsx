import React, {FC} from "react";
import {Route, Switch, useLocation, useHistory} from "react-router-dom";
import {MainPage} from "../../pages/page-main/page-main";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {LoginPage} from "../../pages/page-login/page-login";
import {RegisterPage} from "../../pages/page-register/page-register";
import {ForgotPasswordPage} from "../../pages/page-forgot-password/page-forgot-password";
import {ResetPasswordPage} from "../../pages/page-reset-password/page-reset-password";
import {ProtectedRoute} from "../protected-route/protected-route";
import {ProfilePage} from "../../pages/page-profile/page-profile";
import {HistoryOrdersPage} from "../../pages/page-history-orders/page-history-orders";
import {NotFound404} from "../../pages/page-not-found/page-not-found";
import {Modal} from "../modal/modal";
import {useDispatch} from "react-redux";
import {deleteCurrentIngredient, openModal} from "../../services/ingredients/actions";
import {HistoryOrderPage} from "../../pages/page-order/page-order";
import {FeedPage} from "../../pages/page-feed/page-feed";
import {ILocationState} from "./switch-modal-types";

export const SwitchModal: FC = () => {
    const history = useHistory()
    let location = useLocation<ILocationState>()
    const action = history.action ==='PUSH' || history.action ==='REPLACE'
    // let background = action && location.state && location.state.background
    let background = action && location?.state?.background

    const dispatch = useDispatch()

    const handleModalClose = () => {
        dispatch(openModal(false))
        dispatch(deleteCurrentIngredient())
        history.goBack()
    }

    return (
        <>
            <Switch location={background || location}>
                <Route exact={true} path="/" render={() => <MainPage/>}/>
                <Route exact={true} path="/feed" render={() => <FeedPage/>}/>
                <Route exact={true} path="/ingredients/:id" render={() => <IngredientDetails/>}/>
                <Route exact={true} path="/login" render={() => <LoginPage/>}/>
                <Route exact={true} path="/register" render={() => <RegisterPage/>}/>
                <Route exact={true} path="/forgot-password" render={() => <ForgotPasswordPage/>}/>
                <Route exact={true} path="/reset-password" render={() => <ResetPasswordPage/>}/>
                <ProtectedRoute exact={true} path="/profile">
                    <ProfilePage/>
                </ProtectedRoute>
                <ProtectedRoute exact={true} path="/profile/orders">
                    <HistoryOrdersPage/>
                </ProtectedRoute>
                <ProtectedRoute exact={true} path="/profile/orders/:orderNum">
                    <HistoryOrderPage/>
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