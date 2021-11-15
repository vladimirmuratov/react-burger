import React, {FC, useEffect} from "react";
import {Redirect, Route} from 'react-router-dom';
import {TProps} from "./protected-route-types";
import {getProfileData} from "../../services/user/actions";
import {useDispatch} from "../../services/hooks";

export const ProtectedRoute: FC<TProps> = ({children, ...rest}) => {
    const dispatch = useDispatch()
    const refreshToken = localStorage.getItem('refreshToken')

    useEffect(() => {
        if (refreshToken) {
            dispatch(getProfileData())
        }
    }, [dispatch, refreshToken])

    return (
        <Route
            {...rest}
            render={({location}) =>
                refreshToken ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}