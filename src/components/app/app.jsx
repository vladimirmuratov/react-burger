import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {AppHeader} from "../app-header/app-header";
import {fetchData} from "../../services/ingredients/actions";
import {useDispatch} from "react-redux";
import {SwitchModal} from "../switch-modal/switch-modal";
import {getCookie} from "../../services/utils";
import {getProfileData} from "../../services/user/actions";
import style from './app.module.css';

function App() {
    const dispatch = useDispatch()
    const accessToken = getCookie('accessToken')

    useEffect(() => {
        dispatch(fetchData())
        if(accessToken){
            dispatch(getProfileData())
        }
    }, [dispatch, accessToken])

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
