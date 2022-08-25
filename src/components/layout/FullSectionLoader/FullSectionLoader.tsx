import React, {FC, useEffect} from 'react';
import styles from './FullSectionLoader.module.scss';
import lottie from "lottie-web";
import loader from "../../../assets/gif/lottieLoader.json";
import cn from 'classnames'

interface IProps {
    size? : "small" | "standart" | "large"
}
const FullSectionLoader : FC<IProps> = ({ size = "standart"}) => {

    useEffect(() => {
        lottie.loadAnimation({
            container: document.getElementById(`anim`)!,
            animationData: loader
        })

    }, [])
    return (
        <div className={styles.loaderWrapper}>
            <div id="anim" className={styles[size]}></div>
        </div>
    );
}

export default FullSectionLoader;