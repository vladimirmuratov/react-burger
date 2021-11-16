import React, {FC, useCallback, useEffect, useState} from "react";
import style from './page-login.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory, useLocation} from "react-router-dom";
import {postLoginData} from "../../services/user/actions";
import {setCookie} from "../../services/utils";
import {TLocation} from "./page-login-types";
import {useDispatch, useSelector} from "../../services/hooks";

export const LoginPage: FC = () => {
    const history = useHistory()
    const {state} = useLocation<TLocation>()

    const dispatch = useDispatch()

    const [form, setForm] = useState<{ email: string; password: string; }>({'email': '', 'password': ''})

    const {isAuth} = useSelector((state) => state.user)
    const {error} = useSelector((state) => state.user)
    const {refreshToken} = useSelector((state) => state?.user?.user)
    const {accessToken} = useSelector((state) => state?.user?.user)

    useEffect(() => {
        if (isAuth) {
            refreshToken && localStorage.setItem('refreshToken', refreshToken)
            accessToken && setCookie('accessToken', accessToken)
            setForm({'email': '', 'password': ''})
            const link = (state && state.from) || '/';
            history.replace(link)
        }
    }, [isAuth, refreshToken, accessToken, history, state])

    const onChange = (e: { preventDefault: () => void; target: { name: string; value: string; }; }) => {
        e.preventDefault()
        setForm({...form, [e.target.name]: e.target.value})
    }

    const onSubmitHandler = useCallback(async (e) => {
        e.preventDefault()
        if (form.email && form.password) {
            await dispatch(postLoginData(form))
        }
    }, [dispatch, form])

    return (
        <div className={style.wrapper}>
            <form className={style.content} onSubmit={onSubmitHandler}>
                <p className="text text_type_main-large">Вход</p>
                {error && <p className="text text_type_main-default" style={{color: 'red'}}>{error}</p>}
                <div className={style.input}>
                    <Input type="email" placeholder="Email" onChange={onChange} value={form.email} name="email"
                           size="default"/>
                </div>
                <div className={style.input}>
                    <PasswordInput name="password" onChange={onChange} value={form.password} size="default"/>
                </div>
                <div className={style.button}>
                    <Button type="primary" size="medium">Войти</Button>
                </div>
                <p className="text text_type_main-default text_color_inactive">
                    Вы - новый пользователь?&nbsp;
                    <Link to="/register">Зарегистрироваться</Link>
                </p>
                <p className="text text_type_main-default text_color_inactive mt-4">
                    Забыли пароль?&nbsp;
                    <Link to="/forgot-password">Восстановить пароль</Link>
                </p>
            </form>
        </div>
    )
}