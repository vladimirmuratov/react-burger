import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {AppHeader} from "../app-header/app-header";
import {fetchData} from "../../services/ingredients/actions";
import {useDispatch} from "react-redux";
import {SwitchModal} from "../switch-modal/switch-modal";
import style from './app.module.css';

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

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
