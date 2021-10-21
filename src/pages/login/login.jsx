import React, {useCallback, useEffect, useState} from "react";
import style from './login.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {postLoginData} from "../../services/user/actions";
import {setCookie} from "../../services/utils";
import {Preloader} from "../../components/preloader/preloader";

export const LoginPage = () => {
    const history = useHistory()
    const {state} = useLocation()

    const dispatch = useDispatch()

    const [form, setForm] = useState({'email': '', 'password': ''})

    const isAuth = useSelector(state => state.user.isAuth)
    const error = useSelector(state => state.user.error)
    const refreshToken = useSelector(state => state.user.user.refreshToken)
    const accessToken = useSelector(state => state.user.user.accessToken)
    const isLoading = useSelector(state => state.user.isLoading)

    useEffect(() => {
        if (isAuth) {
            refreshToken && localStorage.setItem('refreshToken', refreshToken)
            accessToken && setCookie('accessToken', accessToken)
            setForm({'email': '', 'password': ''})
            const link = (state && state.from) || '/';
            history.replace(link)
        }
    }, [isAuth, refreshToken, accessToken, history, state])

    const onChange = (e) => {
        e.preventDefault()
        setForm({...form, [e.target.name]: e.target.value})
    }

    const clickHandler = useCallback(async () => {
        if (form.email && form.password) {
            await dispatch(postLoginData(form))
        }
    }, [dispatch, form])

    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <p className="text text_type_main-large">Вход</p>
                {isLoading && <Preloader/>}
                {error && <p className="text text_type_main-default" style={{color: 'red'}}>{error}</p>}
                <div className={style.input}>
                    <Input type="email" placeholder="Email" onChange={onChange} value={form.email} name="email"
                           size="default"/>
                </div>
                <div className={style.input}>
                    <PasswordInput name="password" onChange={onChange} value={form.password} size="default"/>
                </div>
                <div className={style.button}>
                    <Button type="primary" size="medium" onClick={clickHandler}>Войти</Button>
                </div>
                <p className="text text_type_main-default text_color_inactive">
                    Вы - новый пользователь?&nbsp;
                    <Link to="/register">Зарегистрироваться</Link>
                </p>
                <p className="text text_type_main-default text_color_inactive mt-4">
                    Забыли пароль?&nbsp;
                    <Link to="/forgot-password">Восстановить пароль</Link>
                </p>
            </div>
        </div>
    )
}