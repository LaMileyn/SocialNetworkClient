import React, {FC, useMemo} from 'react';
import styles from './AuthPage.module.scss';
import AuthSlider from "../AuthSlider/AuthSlider";
import {useLocation} from "react-router-dom";
import {Button} from "@mui/material";
import logo from './../../../assets/images/logoLarge.png'
import AuthForm from "../AuthForm/AuthForm";

const AuthPage: FC = (props) => {

    const location = useLocation()
    const isLogin = useMemo( () =>{
        return location.pathname.includes("/login")
    },[location.pathname])

    return (
        <section className={styles.auth}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <AuthSlider/>
                </div>
                <div className={styles.right}>
                    <div className={styles.right__wrapper}>
                        <div className={styles.right__top}>
                            <div className={styles.right__logotype}>
                                <img src={logo} alt=""/>
                            </div>
                            <h2>{ isLogin
                                ? "Hello Again!"
                                : "Welcome!"
                            }</h2>
                            <p>{ isLogin
                                ? "Lorem ipsum is a fish you don`t appreciate her honestly at all enim massa pelletesque velit odit"
                                : "Lorem ipsum is a fish you don`t appreciate her honestly at all enim massa pelletesque velit odit"
                            }</p>
                        </div>
                        <AuthForm isLogin={isLogin}/>
                    </div>
                    <div className={styles.right__bottom}>
                        <p>{ !isLogin
                            ? "Already have an account?"
                            : "Don`t have an account yet? "
                        }</p>
                        <Button variant={"text"} color={"primary"}>
                            {isLogin ? "Sign Up" : "Sign In" }
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AuthPage;