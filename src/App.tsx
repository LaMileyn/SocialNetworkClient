import './utils/styles/main.scss'
import {useEffect} from "react";
import {useAppSelector} from "./utils/hooks";
import MainLayout from "./components/layout/MainLayout/MainLayout";

const App = () => {

    const theme = useAppSelector( state => state.theme);
    useEffect( () =>{
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("theme",theme)
    },[theme])

    return (
        <div className="App">
            <MainLayout/>
        </div>
    );
}

export default App;
