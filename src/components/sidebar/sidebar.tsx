import React, {FC, useCallback, useEffect} from "react";
import style from './sidebar.module.css';
import {NavLink, useHistory} from "react-router-dom";
import {clearUserData, logout} from "../../services/user/actions";
import {deleteCookie} from "../../services/utils";
import {useDispatch, useSelector} from "../../services/hooks";

export const SideBar: FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {message} = useSelector((state) => state.user)

    const logoutHandler = useCallback((e) => {
        e.preventDefault()
        history.replace({pathname: '/login'})
        dispatch(logout())
        dispatch(clearUserData())
        deleteCookie('accessToken')
        localStorage.removeItem('refreshToken')
    }, [dispatch, history])

    useEffect(() => {
        if (message) {
            history.replace({pathname: '/login'})
        }
    }, [history, message])

    return (
        <div className={style.wrapper}>
            <NavLink exact to="/profile" className={style.link} activeClassName={style.activeLink}>Профиль</NavLink>
            <NavLink exact to="/profile/orders" className={style.link} activeClassName={style.activeLink}>История
                заказов</NavLink>
            <NavLink exact to="/login" onClick={logoutHandler} className={style.link}
                     activeClassName={style.activeLink}>Выход</NavLink>
            <p className="text text_type_main-default text_color_inactive mt-10">В этом разделе вы
                сможите <br/> изменить свои персогальные данные</p>
        </div>
    )
}