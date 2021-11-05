import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {AppHeader} from "../app-header/app-header";
import {fetchData} from "../../services/ingredients/actions";
import {useDispatch} from "react-redux";
import {SwitchModal} from "../switch-modal/switch-modal";
import style from './app.module.css';
import {getProfileData} from "../../services/user/actions";

function App() {
    const dispatch = useDispatch()
    const refreshToken = localStorage.getItem('refreshToken')

    useEffect(() => {
        dispatch(fetchData())
        if(refreshToken){
            dispatch(getProfileData())
        }
    }, [dispatch, refreshToken])

    return (
        <Router>
            <AppHeader/>
            <main className={style.wrapper}>
                <SwitchModal/>
            </main>
        </Router>
    );
}

export default App;
