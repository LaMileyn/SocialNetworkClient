import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './AuthSlider.module.scss';
import gif from './../../../assets/gif/socNetw.json'
import gif2 from './../../../assets/gif/social2.json'
import gif3 from './../../../assets/gif/social3.json'
import lottie from 'lottie-web';
import cn from 'classnames'

interface ISliderData {
    id: string,
    title: string,
    subtitle: string,
}

const sliderData: ISliderData[] = [
    {
        id: "anim1",
        title: "Social Media is a great power for everyone!",
        subtitle: "A balanced surfing is a good business"
    },
    {
        id: "anim2",
        title: "Change The Quality Of Your life",
        subtitle: "A balanced surfing is a good business",
    },
    {id: "anim3", title: "You know about everything you talk", subtitle: "A balanced surfing is a good business"},
]

const AuthSlider: FC = (props) => {
    const animRef = useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = useState<number>(2);

    useEffect(() => {
        lottie.loadAnimation({
            container: document.getElementById(`anim1`)!,
            animationData: gif
        })
        lottie.loadAnimation({
            container: document.getElementById(`anim2`)!,
            animationData: gif2
        })
        lottie.loadAnimation({
            container: document.getElementById(`anim3`)!,
            animationData: gif3
        })
    }, [])
    useEffect( () =>{
       const timeOut = setInterval( () => {
           setCurrentIndex( prev => prev === sliderData.length - 1 ? 0 : prev + 1)
       },4500)
       return () => clearInterval(timeOut)
    },[])
    return (
        <div className={styles.slider}>
            <div className={styles.lottieImages}>
                {
                    sliderData.map((el, index) => {
                        let position = "nextSlide";
                        if (index === currentIndex) {
                            position = "currentSlide"
                        }
                        if (index === currentIndex - 1 || (currentIndex === 0 && index === sliderData.length - 1)) {
                            position = "lastSlide"
                        }
                        return <div className={cn(styles.lottie, styles[position])} id={el.id}></div>
                    })
                }
            </div>
            <div className={styles.textData}>
                {
                    sliderData.map((el, index) => {
                        return (
                            <div className={cn(styles.text,{ [styles.active] : index === currentIndex})}>
                                <div className={styles.title}>{el.title}</div>
                                <span className={styles.subtitle}>{el.subtitle}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.dots}>
                {
                    sliderData.map((el, index) => {
                        return <div className={cn(styles.dots__item, {[styles.active]: index === currentIndex})}
                                    key={el.id}></div>

                    })
                }
            </div>
        </div>
    );
}

export default AuthSlider;