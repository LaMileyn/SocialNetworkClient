import './utils/styles/main.scss'
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "./utils/hooks";
import {checkAuth} from "./store/auth/auth.actions";
import {CircularProgress} from "@mui/material";
import AppRouter from "./components/routing/AppRouter";
import FullSectionLoader from "./components/layout/FullSectionLoader/FullSectionLoader";

const App = () => {
    const dispatch = useAppDispatch()

    const theme = useAppSelector( state => state.theme);
    const [loading,setLoading] = useState<boolean>(true)

    useEffect( () =>{
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("theme",theme);
    },[theme])
    useEffect( () =>{
        ( async () => {
            if (localStorage.getItem("token")) {
                await dispatch(checkAuth())
            }
            setLoading(false)
        })()
    },[dispatch])


    if ( loading ) return <FullSectionLoader size={"large"}/>
    return (
        <div className="App">
            <AppRouter/>
        </div>
    );
}

export default App;
