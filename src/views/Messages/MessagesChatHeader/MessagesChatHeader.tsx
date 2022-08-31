import React, {FC} from 'react';
import styles from './MessagesChatHeader.module.scss';
import {Avatar, IconButton} from "@mui/material";
import {MoreHoriz} from "@mui/icons-material";

interface IProps {
}

const MessagesChatHeader: FC<IProps> = (props) => {
    const isGroupChat = false
    return (
        <div className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <Avatar src={"https://placepic.ru/wp-content/uploads/2021/02/kinopoisk_ru_Brad_Pi-41.jpg"}
                            sx={{borderRadius: 2, width : 40, height: 40}}/>
                    <div className={styles.left__info}>
                        <div className={styles.left__title}>
                            Chat App - Landing Page
                        </div>
                        { isGroupChat && <div className={styles.left__members}>
                            15 members
                        </div> }
                        { !isGroupChat && <div className={styles.left__status}>
                            <span className={styles.left__circleStatus}></span>
                            online
                        </div> }
                    </div>
                </div>
                <div className={styles.right}>
                    <IconButton color={"info"}>
                        <MoreHoriz sx={{ width : 35, height: 35}} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default MessagesChatHeader;