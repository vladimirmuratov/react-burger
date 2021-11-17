import React, {FC, useCallback, useEffect, useState} from "react";
import style from './page-reset-password.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {clearMessage, saveResetPassword} from "../../services/user/actions";
import {Preloader} from "../../components/preloader/preloader";
import {useDispatch, useSelector} from "../../services/hooks";

export const ResetPasswordPage: FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [form, setForm] = useState<{ token: string | ''; password: string | ''; }>({'token': '', 'password': ''})

    const {isAuth} = useSelector((state) => state.user)
    const {message} = useSelector((state) => state.user)
    const {error} = useSelector((state) => state.user)
    const {isLoading} = useSelector((state) => state.user)
    const {isForgotEmailForm} = useSelector((state) => state.user)

    if (!isForgotEmailForm) {
        history.replace({pathname: '/forgot-password'})
    }

    useEffect(() => {
        if (isAuth) {
            history.replace({pathname: '/'})
        }
    }, [isAuth, history])

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (message) {
            timer = setTimeout(() => {
                history.replace({pathname: '/login'})
                dispatch(clearMessage())
            }, 3000)
        }
        return () => clearTimeout(timer)
    }, [dispatch, history, message])

    const onChangeHandler = useCallback((e: { preventDefault: () => void; target: { name: string; value: string; }; }) => {
        e.preventDefault()
        setForm({...form, [e.target.name]: e.target.value})
    }, [form])

    const onSubmitHandler = useCallback(async (e) => {
        e.preventDefault()
        if (form.token && form.password)
            await dispatch(saveResetPassword(form))
    }, [dispatch, form])

    return (
        <div className={style.wrapper}>
            <form className={style.content} onSubmit={onSubmitHandler}>
                <p className="text text_type_main-large">Восстановление пароля</p>
                {isLoading && <Preloader/>}
                {message && <p className="text text_type_main-medium" style={{color: 'green'}}>{message}</p>}
                {error && <p className="text text_type_main-default" style={{color: 'red'}}>{error}</p>}
                <div className={style.input}>
                    <PasswordInput name="password" onChange={onChangeHandler} value={form.password} size="default"/>
                </div>
                <div className={style.input}>
                    <Input type="text" placeholder="Введите код из письма" onChange={onChangeHandler} value={form.token}
                           name="token" size="default"/>
                </div>
                <div className={style.button}>
                    <Button type="primary" size="medium">Сохранить</Button>
                </div>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?&nbsp;
                    <Link to="/login">Войти</Link>
                </p>
            </form>
        </div>
    )
}