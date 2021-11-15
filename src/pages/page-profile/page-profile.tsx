import React, {FC, useEffect, useRef, useState} from "react";
import style from './page-profile.module.css';
import {SideBar} from "../../components/sidebar/sidebar";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {clearSuccessUpdateFlag, getProfileData, updateProfileData} from "../../services/user/actions";
import {Preloader} from "../../components/preloader/preloader";
import {useDispatch, useSelector} from "../../services/hooks";

export const ProfilePage: FC = () => {
    const dispatch = useDispatch()
    const {error} = useSelector((state) => state.user)
    const {successUpdate} = useSelector((state) => state.user)
    const {profile} = useSelector((state) => state.user)
    const {isLoading} = useSelector((state) => state.user)

    const [form, setForm] = useState<{ name: string | ''; email: string | ''; password: string | ''; }>({
        'name': '',
        'email': '',
        'password': ''
    })
    const [isDisabledName, setIsDisabledName] = useState<boolean>(true)
    const [isDisabledEmail, setIsDisabledEmail] = useState<boolean>(true)
    const [isDisabledPass, setIsDisabledPass] = useState<boolean>(true)
    const [successMessage, setSuccessMessage] = useState<string | ''>('')
    const [isChanged, setIsChanged] = useState<boolean>(false)

    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
            dispatch(getProfileData())
    }, [dispatch])

    useEffect(() => {
        setForm({...form, name: profile.name ? profile.name : '', email: profile.email ? profile.email : ''})
    }, [profile])

    useEffect(() => {
        let timer: NodeJS.Timeout
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

    const changeHandler = (e: { preventDefault: () => void; target: { name: string; value: string; }; }) => {
        e.preventDefault()
        setForm({...form, [e.target.name]: e.target.value})
        setIsChanged(true)
    }

    const iconClickHandlerName = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setIsDisabledName(false)
        setTimeout(() => nameRef.current && nameRef.current.focus(), 0)
    }

    const iconClickHandlerEmail = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setIsDisabledEmail(false)
        setTimeout(() => emailRef.current && emailRef.current.focus(), 0)
    }

    const iconClickHandlerPass = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setIsDisabledPass(false)
        setTimeout(() => passRef.current && passRef.current.focus(), 0)
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
            <div className={style.wrapper_form}>
                {isLoading
                    ? <div className={style.loader}>
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