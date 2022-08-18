import React, {FC, useEffect} from 'react';
import lottie from "lottie-web";
import styles from './NotFoundPage.module.scss'
import notFound from "../../../assets/gif/notFound.json";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";


const NotFoundPage : FC = (props) => {

    useEffect(() => {
        lottie.loadAnimation({
            container: document.getElementById(`anim`)!,
            animationData: notFound
        })

    }, [])

    return (
        <section className={styles.notFound}>
            <h1>Page Not Found..</h1>
            <h2>Interactivity Guide</h2>
            <p>This is a quick demo for using the Social Network to add interactivity to your applications</p>
            <Button variant={"contained"} color={"info"}>
                <Link to={'/'}>
                    Let`s go home
                </Link>
            </Button>
            <div className={styles.lottie} id="anim"></div>
        </section>
    );
}

export default NotFoundPage;