import React, {FC, useEffect} from 'react';
import styles from './FullScreenLoader.module.scss';
import lottie from "lottie-web";
import loader from "../../../assets/gif/lottieLoader.json";

const FullScreenLoader : FC = (props) => {

    useEffect(() => {
        lottie.loadAnimation({
            container: document.getElementById(`anim`)!,
            animationData: loader
        })

    }, [])
    return (
        <div className={styles.fullScreen}>
            <div id="anim"></div>
        </div>
    );
}

export default FullScreenLoader;