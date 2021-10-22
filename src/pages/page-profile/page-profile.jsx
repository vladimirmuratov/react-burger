import React, {useEffect, useRef, useState} from "react";
import style from './page-profile.module.css';
import {SideBar} from "../../components/sidebar/sidebar";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {clearSuccessUpdateFlag, getProfileData, updateProfileData} from "../../services/user/actions";
import {Preloader} from "../../components/preloader/preloader";

export const ProfilePage = () => {
    const dispatch = useDispatch()
    const error = useSelector(state => state.user.error)
    const successUpdate = useSelector(state => state.user.successUpdate)
    const profile = useSelector(state => state.user.profile)
    const isLoading = useSelector(state => state.user.isLoading)

    const [form, setForm] = useState({
        'name': '',
        'email': '',
        'password': ''
    })
    const [isDisabledName, setIsDisabledName] = useState(true)
    const [isDisabledEmail, setIsDisabledEmail] = useState(true)
    const [isDisabledPass, setIsDisabledPass] = useState(true)
    const [successMessage, setSuccessMessage] = useState('')
    const [isChanged, setIsChanged] = useState(false)

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passRef = useRef(null)

    useEffect(() => {
        dispatch(getProfileData())
    }, [dispatch])

    useEffect(() => {
        setForm({...form, name: profile.name ? profile.name : '', email: profile.email ? profile.email : ''})
    }, [profile])

    useEffect(() => {
        let timer
        if (successUpdate) {
            setSuccessMessage('Данные успешно обновлены')
            timer = setTimeout(() => {
                setSuccessMessage('')
                dispatch(clearSuccessUpdateFlag())
            }, 3000)
            setIsChanged(false)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [successUpdate, dispatch])

    const changeHandler = (e) => {
        e.preventDefault()
        setForm({...form, [e.target.name]: e.target.value})
        setIsChanged(true)
    }

    const iconClickHandlerName = (e) => {
        e.preventDefault()
        setIsDisabledName(false)
        setTimeout(() => nameRef.current.focus(), 0)
    }

    const iconClickHandlerEmail = (e) => {
        e.preventDefault()
        setIsDisabledEmail(false)
        setTimeout(() => emailRef.current.focus(), 0)
    }

    const iconClickHandlerPass = (e) => {
        e.preventDefault()
        setIsDisabledPass(false)
        setTimeout(() => passRef.current.focus(), 0)
    }

    const saveHandler = () => {
        dispatch(updateProfileData(form))
    }

    const prevDataHandler = () => {
        setForm({
            ...form,
            name: profile.name ? profile.name : '',
            email: profile.email ? profile.email : '',
            password: ''
        })
        setIsChanged(false)
    }

    return (
        <div className={style.wrapper}>
            <div>
                <SideBar/>
            </div>
            <div className={style.form}>
                {isLoading
                    ?   <div className={style.loader}>
                            <Preloader/>
                        </div>
                    : <>
                        {error && <p className="text text_type_main-default" style={{color: 'red'}}>{error}</p>}
                        {successMessage &&
                        <p className="text text_type_main-default ml-10" style={{color: 'green'}}>{successMessage}</p>}
                        <Input value={form.name}
                               name="name"
                               onChange={changeHandler}
                               onIconClick={iconClickHandlerName}
                               onBlur={() => setIsDisabledName(true)}
                               type="text"
                               placeholder="Имя"
                               ref={nameRef}
                               icon="EditIcon"
                               size="default"
                               errorText={'Ошибка'}
                               disabled={isDisabledName}
                        />
                        <Input value={form.email}
                               name="email"
                               onChange={changeHandler}
                               onIconClick={iconClickHandlerEmail}
                               onBlur={() => setIsDisabledEmail(true)}
                               type="email"
                               placeholder="Логин"
                               ref={emailRef}
                               icon="EditIcon"
                               size="default"
                               errorText={'Ошибка'}
                               disabled={isDisabledEmail}
                        />
                        <Input value={form.password}
                               name="password"
                               onChange={changeHandler}
                               onIconClick={iconClickHandlerPass}
                               onBlur={() => setIsDisabledPass(true)}
                               type="password"
                               ref={passRef}
                               placeholder="Пароль"
                               icon="EditIcon"
                               size="default"
                               errorText={'Ошибка'}
                               disabled={isDisabledPass}
                        />
                        {isChanged &&
                        <div className={style.blockButton}>
                            <Button type="secondary" size="small" onClick={prevDataHandler}>Отменить</Button>
                            <Button type="primary" size="small" onClick={saveHandler}>Сохранить</Button>
                        </div>
                        }
                    </>
                }
            </div>
        </div>
    )
}