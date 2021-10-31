import React, {FC} from "react";
import {useSelector} from "react-redux";
import {Redirect, Route} from 'react-router-dom';
import {TProps} from "./protected-route-types";

export const ProtectedRoute: FC<TProps> = ({children, ...rest}) => {
    const isAuth = useSelector((state: any) => state.user.isAuth)

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