import React, {FC, useCallback, useEffect, useState} from "react";
import style from "./page-forgot-password.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage, forgotFormFull, resetPassword} from "../../services/user/actions";
import {Preloader} from "../../components/preloader/preloader";

export const ForgotPasswordPage: FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [emailVal, setEmailVal] = useState<string | ''>('')
    const [isValid, setIsValid] = useState<boolean>(false)

    const isAuth = useSelector((state: any) => state.user.isAuth)
    const message = useSelector((state: any) => state.user.message)
    const error = useSelector((state: any) => state.user.error)
    const isLoading = useSelector((state: any) => state.user.isLoading)

    useEffect(() => {
        if (isAuth) {
            history.replace({pathname: '/'})
        }
    }, [isAuth, history])

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>
        if (isValid) {
            if (message) {
                timer = setTimeout(() => {
                    dispatch(forgotFormFull())
                    history.replace({pathname: '/reset-password'})
                    dispatch(clearMessage())
                }, 3000)
            }
        }
        return () => clearTimeout(timer)
    }, [history, dispatch, isValid, message])

    const onChange = (e: { preventDefault: () => void; target: { value: React.SetStateAction<string>; }; }) => {
        e.preventDefault()
        setEmailVal(e.target.value)
    }

    const clickHandler = useCallback(async () => {
        if (emailVal) {
            await dispatch(resetPassword(emailVal))
            history.push({state: {pathname: history.location.pathname, email: emailVal}})
            setIsValid(true)
        }
    }, [dispatch, emailVal, history])

    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
                {isLoading && <Preloader/>}
                {message && <p className="text text_type_main-medium" style={{color: 'green'}}>{message}</p>}
                {error && <p className="text text_type_main-default" style={{color: 'red'}}>{error}</p>}
                <div className={style.input}>
                    <Input type="email" placeholder="Email" onChange={onChange} value={emailVal} name="email"
                           size="default"/>
                </div>
                <div className={style.button}>
                    <Button type="primary" size="medium" onClick={clickHandler}>Восстановить</Button>
                </div>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?&nbsp;
                    <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    )
}