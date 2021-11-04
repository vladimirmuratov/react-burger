import React, {FC, useCallback, useEffect, useState} from "react";
import style from './page-reset-password.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage, saveResetPassword} from "../../services/user/actions";
import {Preloader} from "../../components/preloader/preloader";

export const ResetPasswordPage: FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [form, setForm] = useState<{ token: string | ''; password: string | ''; }>({'token': '', 'password': ''})

    const isAuth = useSelector((state: any) => state.user.isAuth)
    const message = useSelector((state: any) => state.user.message)
    const error = useSelector((state: any) => state.user.error)
    const isLoading = useSelector((state: any) => state.user.isLoading)
    const isForgotEmailForm = useSelector((state: any) => state.user.isForgotEmailForm)

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

    const onChange = (e: { preventDefault: () => void; target: { name: string; value: string; }; }) => {
        e.preventDefault()
        setForm({...form, [e.target.name]: e.target.value})
    }

    const saveHandler = useCallback(async () => {
        if (form.token && form.password)
            await dispatch(saveResetPassword(form))
    }, [dispatch, form])

    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <p className="text text_type_main-large">Восстановление пароля</p>
                {isLoading && <Preloader/>}
                {message && <p className="text text_type_main-medium" style={{color: 'green'}}>{message}</p>}
                {error && <p className="text text_type_main-default" style={{color: 'red'}}>{error}</p>}
                <div className={style.input}>
                    <PasswordInput name="password" onChange={onChange} value={form.password} size="default"/>
                </div>
                <div className={style.input}>
                    <Input type="text" placeholder="Введите код из письма" onChange={onChange} value={form.token}
                           name="token" size="default"/>
                </div>
                <div className={style.button}>
                    <Button type="primary" size="medium" onClick={saveHandler}>Сохранить</Button>
                </div>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?&nbsp;
                    <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    )
}