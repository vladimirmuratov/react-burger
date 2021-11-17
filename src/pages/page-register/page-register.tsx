import React, {FC, useCallback, useEffect, useState} from "react";
import style from "./page-register.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {postRegisterData} from "../../services/user/actions";
import {setCookie} from "../../services/utils";
import {useDispatch, useSelector} from "../../services/hooks";

export const RegisterPage: FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [form, setForm] = useState<{ name: string | ''; email: string | ''; password: string | ''; }>({
        'name': '',
        'email': '',
        'password': ''
    })

    const {error} = useSelector((state) => state.user)
    const {isAuth} = useSelector((state) => state.user)
    const {refreshToken} = useSelector((state) => state.user?.user)
    const {accessToken} = useSelector((state) => state.user?.user)

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

    const onSubmitHandler = useCallback(async (e) => {
        e.preventDefault()
        await dispatch(postRegisterData(form))
    }, [dispatch, form])

    const onChangeHandler = useCallback((e: { preventDefault: () => void; target: { name: string; value: string; }; }) => {
        e.preventDefault()
        setForm({...form, [e.target.name]: e.target.value})
    }, [form])

    return (
        <div className={style.wrapper}>
            <form className={style.content} onSubmit={onSubmitHandler}>
                <p className="text text_type_main-large">Регистрация</p>
                {error && <p className="text text_type_main-default" style={{color: 'red'}}>{error}</p>}
                <div className={style.input}>
                    <Input type="text" placeholder="Имя" onChange={onChangeHandler} value={form.name} name="name"
                           size="default"/>
                </div>
                <div className={style.input}>
                    <Input type="email" placeholder="Email" onChange={onChangeHandler} value={form.email} name="email"
                           size="default"/>
                </div>
                <div className={style.input}>
                    <PasswordInput name="password" onChange={onChangeHandler} value={form.password} size="default"/>
                </div>
                <div className={style.button}>
                    <Button type="primary" size="medium">Регистрация</Button>
                </div>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы?&nbsp;
                    <Link to="/login">Войти</Link>
                </p>
            </form>
        </div>
    )
}