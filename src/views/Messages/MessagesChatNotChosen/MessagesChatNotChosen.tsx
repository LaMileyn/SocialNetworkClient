import React, {FC, useEffect} from 'react';
import styles from './MessagesChatNotChosen.module.scss';
import lottie from "lottie-web";
import gif from "../../../assets/gif/notChosenChat.json";

interface IProps {
}

const MessageChatNotChosen: FC<IProps> = (props) => {

    useEffect( () =>{
        lottie.loadAnimation({
            container: document.getElementById(`anim1`)!,
            animationData: gif
        })
    },[])
    return (
        <div className={styles.notChosen}>
            <div id={"anim1"} className={styles.img}></div>
            <p>Please choose a chat or <br/> <span>create a new one</span></p>
        </div>
    );
}

export default MessageChatNotChosen;