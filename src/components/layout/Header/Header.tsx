import React, {FC} from 'react';
import styles from './Header.module.scss';
import {Avatar} from "@mui/material";
import {Link} from "react-router-dom";
import {SearchRounded} from "@mui/icons-material";


const Header : FC = (props) => {
    return (
        <div className={styles.header}>
            <div className={styles.extraLinks}>
                <Link to={"/about"}>About</Link>
                <Link to={"/help"}>Helo</Link>
            </div>
            <div className={styles.search}>
                <div className={styles.inputWrapper}>
                    <SearchRounded />
                    <input type="text" placeholder={"Search on social..."}/>
                </div>
            </div>
            <div className={styles.userAndNotifications}>
                <div className={styles.notifications}></div>
                <div className={styles.user}>
                    <span className={styles.user__name}></span>
                    <span className={styles.user__avatar}>
                        <Avatar src={"https://i.pinimg.com/736x/65/67/de/6567de19cb26194d52ad6648c829207d.jpg"}/>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Header;