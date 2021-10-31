import React, {FC, useCallback, useEffect, useState} from "react";
import style from "./page-register.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {postRegisterData} from "../../services/user/actions";
import {setCookie} from "../../services/utils";

export const RegisterPage: FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [form, setForm] = useState<{ name: string | ''; email: string | ''; password: string | ''; }>({
        'name': '',
        'email': '',
        'password': ''
    })

    const error = useSelector((state: any) => state.user.error)
    const isAuth = useSelector((state: any) => state.user.isAuth)
    const refreshToken = useSelector((state: any) => state.user.user.refreshToken)
    const accessToken = useSelector((state: any) => state.user.user.accessToken)

    useEffect(() => {
        if (isAuth) {
            history.replace({pathname: '/'})
        }
    }, [isAuth, history])

    useEffect(() => {
        if (isAuth) {
            refreshToken && localStorage.setItem('refreshToken', refreshToken)
            accessToken && localStorage.setItem('accessToken', accessToken)
            accessToken && setCookie('accessToken', accessToken)
            setForm({'name': '', 'email': '', 'password': ''})
            history.goBack()
        }
    }, [isAuth, history, refreshToken, accessToken])

    const clickHandler = useCallback(async () => {
        await dispatch(postRegisterData(form))
    }, [dispatch, form])

    const changeHandler = (e: { preventDefault: () => void; target: { name: string; value: string; }; }) => {
        e.preventDefault()
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <p className="text text_type_main-large">Регистрация</p>
                {error && <p className="text text_type_main-default" style={{color: 'red'}}>{error}</p>}
                <div className={style.input}>
                    <Input type="text" placeholder="Имя" onChange={changeHandler} value={form.name} name="name"
                           size="default"/>
                </div>
                <div className={style.input}>
                    <Input type="email" placeholder="Email" onChange={changeHandler} value={form.email} name="email"
                           size="default"/>
                </div>
                <div className={style.input}>
                    <PasswordInput name="password" onChange={changeHandler} value={form.password} size="default"/>
                </div>
                <div className={style.button}>
                    <Button type="primary" onClick={clickHandler} size="medium">Регистрация</Button>
                </div>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы?&nbsp;
                    <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    )
}