import React, {FC} from 'react';
import styles from './Dialog.module.scss';
import {Avatar} from "@mui/material";

interface IProps {
}

const Dialog: FC<IProps> = (props) => {
    return (
        <div className={styles.dialog}>
            <div className={styles.avatar}>
                <Avatar src={"https://placepic.ru/wp-content/uploads/2021/02/kinopoisk_ru_Brad_Pi-41.jpg"}
                        sx={{borderRadius: 2, width : 60, height: 60}}/>
            </div>
            <div className={styles.right}>
                <div className={styles.right__top}>
                    <span className={styles.right__title}>Crypto - Mobile App</span>
                    <span className={styles.right__time}>10:35 PM</span>
                </div>
                <div className={styles.right__bottom}>
                    <p>Вы: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, beatae cumque deleniti
                        doloremque hic ipsa, iure natus nesciunt praesentium quibusdam quidem repellat similique ut
                        veritatis.</p>
                </div>
            </div>
        </div>
    );
}

export default Dialog;