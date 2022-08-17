import Header from "./components/layout/Header/Header";
import './utils/styles/main.scss'
import {useEffect} from "react";
import {useAppSelector} from "./utils/hooks";

const App = () => {

    const theme = useAppSelector( state => state.theme);
    useEffect( () =>{
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("theme",theme)
    },[theme])
    return (
        <div className="App">
            <Header/>
        </div>
    );
}

export default App;
