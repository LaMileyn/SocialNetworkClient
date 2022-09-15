import React, {FC} from 'react';
import styles from './Header.module.scss';
import {Link} from "react-router-dom";
import {Notifications, SearchRounded} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useAppSelector} from "../../../utils/hooks";

import HeaderProfileMenu from "./HeaderProfileMenu/HeaderProfileMenu";




const Header: FC = (props) => {
    const {user} = useAppSelector(state => state.auth)

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.extraLinks}>
                    <Link to={"/about"}>About</Link>
                    <Link to={"/help"}>Help</Link>
                </div>
                <div className={styles.search}>
                    <div className={styles.inputWrapper}>
                        <SearchRounded className={styles.iconSearch}/>
                        <input type="text" placeholder={"Search on social..."}/>
                    </div>
                </div>
                <div className={styles.userAndNotifications}>
                    <div className={styles.notifications}>
                        <IconButton className={styles.btnIcon}>
                            <Notifications className={styles.iconNotif}/>
                            <span className={styles.iconBadge}>4</span>
                        </IconButton>
                    </div>
                    <div className={styles.user}>
                        <span className={styles.user__name}>
                            Hey, <strong>{user?.userInfo?.username}</strong>
                        </span>
                        <span className={styles.user__avatar}>
                            <HeaderProfileMenu/>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;