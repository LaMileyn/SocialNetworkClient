import React, {FC} from 'react';
import styles from './SharePost.module.scss';
import {Avatar, Button} from "@mui/material";
import {useAppSelector} from "../../../utils/hooks";
import {BrowseGalleryOutlined, EmojiEmotionsOutlined, PersonOutlined} from "@mui/icons-material";

const SharePost : FC = (props) => {
    const { user } = useAppSelector( state => state.auth)
    return (
        <div className={styles.share}>
            <div className={styles.top}>
                <Avatar src={""}/>
                <div className={styles.inputWrapper}>
                    <input type="text" placeholder={"What`s on your mind, " + user?.userInfo.username + " ?"}/>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.bottom__button}>
                    <Button variant="text" startIcon={<BrowseGalleryOutlined  style={{color : "greenyellow"}}/>} style={{color : "var(--color-text-main)"}}>
                        Photo/Video
                    </Button>
                </div>
                <div className={styles.bottom__button}>
                    <Button variant="text" startIcon={<PersonOutlined  style={{color : "#2174de"}}/>} style={{ color : "var(--color-text-main)"}}>
                        Tag Friends
                    </Button>
                </div>
                <div className={styles.bottom__button}>
                    <Button variant="text" startIcon={<EmojiEmotionsOutlined style={{color : "darkorange"}}/>} style={{color : "var(--color-text-main)"}}>
                        Feeling/Activity
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SharePost;