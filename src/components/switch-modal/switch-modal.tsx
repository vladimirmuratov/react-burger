import React, {FC, useCallback} from "react";
import {Route, Switch, useLocation, useHistory} from "react-router-dom";
import {MainPage} from "../../pages/page-main/page-main";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {LoginPage} from "../../pages/page-login/page-login";
import {RegisterPage} from "../../pages/page-register/page-register";
import {ForgotPasswordPage} from "../../pages/page-forgot-password/page-forgot-password";
import {ResetPasswordPage} from "../../pages/page-reset-password/page-reset-password";
import {ProtectedRoute} from "../protected-route/protected-route";
import {ProfilePage} from "../../pages/page-profile/page-profile";
import {ProfileOrdersPage} from "../../pages/page-profile-orders/page-profile-orders";
import {NotFound404} from "../../pages/page-not-found/page-not-found";
import {Modal} from "../modal/modal";
import {deleteCurrentIngredient} from "../../services/ingredients/actions";
import {ProfileOrderCard} from "../../pages/profile-order-card/profile-order-card";
import {FeedPage} from "../../pages/page-feed/page-feed";
import {ILocationState} from "./switch-modal-types";
import {useDispatch} from "../../services/hooks";
import {FeedCard} from "../../pages/feed-card/feed-card";
import {toggleModal} from "../../services/modal/actions";

export const SwitchModal: FC = () => {
    const history = useHistory()
    let location = useLocation<ILocationState>()
    const action = history.action === 'PUSH' || history.action === 'REPLACE'
    // let background = action && location.state && location.state.background
    let background = action && location?.state?.background

    const dispatch = useDispatch()

    const onModalIngDetailClose = useCallback(() => {
        dispatch(toggleModal(false))
        dispatch(deleteCurrentIngredient())
        history.goBack()
    }, [dispatch, history])

    const onModalClose = useCallback(() => {
        dispatch(toggleModal(false))
        history.goBack()
    }, [dispatch, history])

    return (
        <>
            <Switch location={background || location}>
                <Route exact={true} path="/" render={() => <MainPage/>}/>
                <Route exact={true} path="/feed" render={() => <FeedPage/>}/>
                <Route exact={true} path="/feed/:id" render={() => <FeedCard/>}/>
                <Route exact={true} path="/ingredients/:id" render={() => <IngredientDetails/>}/>
                <Route exact={true} path="/login" render={() => <LoginPage/>}/>
                <Route exact={true} path="/register" render={() => <RegisterPage/>}/>
                <Route exact={true} path="/forgot-password" render={() => <ForgotPasswordPage/>}/>
                <Route exact={true} path="/reset-password" render={() => <ResetPasswordPage/>}/>
                <ProtectedRoute exact={true} path="/profile">
                    <ProfilePage/>
                </ProtectedRoute>
                <ProtectedRoute exact={true} path="/profile/orders">
                    <ProfileOrdersPage/>
                </ProtectedRoute>
                <ProtectedRoute exact={true} path="/profile/orders/:id">
                    <ProfileOrderCard/>
                </ProtectedRoute>
                <Route exact={true} path="*" render={() => <NotFound404/>}/>
            </Switch>
            {background && (
                <>
                    <Route
                        path='/ingredients/:id'
                        children={
                            <Modal title="Детали ингредиента" onClose={onModalIngDetailClose}>
                                <IngredientDetails/>
                            </Modal>
                        }
                    />
                    <Route
                        path='/feed/:id'
                        children={
                            <Modal onClose={onModalClose}>
                                <FeedCard/>
                            </Modal>
                        }
                    />
                    <Route
                        path='/profile/orders/:id'
                        children={
                            <Modal onClose={onModalClose}>
                                <ProfileOrderCard/>
                            </Modal>
                        }
                    />
                </>
            )}
        </>
    )
}