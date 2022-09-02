import React, {FC} from 'react';
import styles from './MessagesChatFooter.module.scss'
import {IconButton} from "@mui/material";
import {Attachment, Close, Edit, EmojiEmotions, Send} from "@mui/icons-material";

interface IProps {
}

const MessagesChatFooter: FC<IProps> = (props) => {
    return (
        <div className={styles.footer}>

            <div className={styles.messageEdit}>
                <span>
                    <Edit/>
                    Message Editing
                </span>
                <IconButton>
                    <Close/>
                </IconButton>
            </div>

            <div className={styles.bottom}>
                <div className={styles.bottom__attachBtn}>
                    <IconButton>
                        <Attachment/>
                    </IconButton>
                </div>
                <div className={styles.bottom__field}>
                    <div className={styles.inputWrapper}>
                        <input type="text" placeholder={"Your message here.."} autoFocus/>
                        <IconButton>
                            <EmojiEmotions/>
                        </IconButton>
                    </div>
                </div>
                <div className={styles.bottom__send}>
                    <IconButton>
                        <Send/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default MessagesChatFooter;