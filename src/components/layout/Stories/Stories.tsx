import React, {FC} from 'react';
import styles from './Stories.module.scss';
import {Add} from "@mui/icons-material";
import {Avatar} from "@mui/material";

const Stories: FC = (props) => {
    return (
        <div className={styles.stories}>
            <div className={styles.addStory}>
                <div className={styles.addIcon}>
                    <Add />
                </div>
                <span className={styles.author}>Add story</span>
            </div>
            {
                [...Array(6)].map((el, index) => (
                    <div className={styles.story} style={
                        { backgroundImage : "url('https://avatarko.ru/img/kartinka/33/muzhchina_spinoj_32846.jpg')"}
                    } key={index}>
                        <Avatar
                            sx={{ width : 50, height : 50, border : 2, borderColor: "white"}}
                            src={"https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-spina-74.jpg"}
                        />
                        <span className={styles.author}>Nelsy Locwood</span>
                    </div>
                ))
            }
        </div>
    );
}

export default Stories;