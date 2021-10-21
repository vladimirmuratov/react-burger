import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route} from 'react-router-dom';

export const ProtectedRoute = ({children, ...rest}) => {
    const isAuth = useSelector(state => state.user.isAuth)

    return (
        <Route
            {...rest}
            render={({location}) =>
                isAuth ? (
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