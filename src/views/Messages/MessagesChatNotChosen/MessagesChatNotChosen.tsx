import React, {Dispatch, FC, SetStateAction, useEffect} from 'react';
import styles from './MessagesChatNotChosen.module.scss';
import lottie from "lottie-web";
import gif from "../../../assets/gif/notChosenChat.json";

interface IProps {
    setDialogCreating : Dispatch<SetStateAction<boolean>>
}
const MessageChatNotChosen: FC<IProps> = ({ setDialogCreating }) => {

    useEffect( () =>{
        lottie.loadAnimation({
            container: document.getElementById(`anim1`)!,
            animationData: gif
        })
    },[])
    return (
        <div className={styles.notChosen}>
            <div id={"anim1"} className={styles.img}></div>
            <p>Please choose a chat or <br/> <span onClick={ () =>setDialogCreating(true)}>create a new one</span></p>
        </div>
    );
}

export default MessageChatNotChosen;