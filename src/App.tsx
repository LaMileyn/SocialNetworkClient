import './utils/styles/main.scss'
import {useEffect} from "react";
import {useAppSelector} from "./utils/hooks";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import AuthPage from "./views/Auth/AuthPage/AuthPage";

const App = () => {

    const theme = useAppSelector( state => state.theme);
    useEffect( () =>{
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("theme",theme)
    },[theme])

    return (
        <div className="App">
            <AuthPage/>
        </div>
    );
}

export default App;
