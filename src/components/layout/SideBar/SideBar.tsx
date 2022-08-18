import React, {FC} from 'react';
import styles from './SideBar.module.scss';
import {Avatar} from "@mui/material";
import {NavLink} from "react-router-dom";
import {
    ExploreOffOutlined,
    ManOutlined,
    Message,
    MoreHoriz,
    NoteAltOutlined,
    Notifications, OtherHousesRounded, PersonOutlined
} from "@mui/icons-material";
import logo from './../../../assets/images/logoLarge.png'

const SideBar: FC = (props) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={logo}/>
                </div>
            </div>
            <div className={styles.center}>
                <nav className={styles.navigation}>
                    <ul className={styles.list}>
                        <li className={styles.list__item}>
                            <NavLink to={'/feed'} className={({isActive}) => isActive && styles.active}>
                                <OtherHousesRounded className={styles.navIcon}/>
                                <span>Feed</span>
                            </NavLink>
                        </li>
                        <li className={styles.list__item}>
                            <NavLink to={'/explore'} className={({isActive}) => isActive && styles.active}>
                                <ExploreOffOutlined className={styles.navIcon}/>
                                <span>Explore</span>
                            </NavLink>
                        </li>
                        <li className={styles.list__item}>
                            <NavLink to={'/notifications'} className={({isActive}) => isActive && styles.active}>
                                <Notifications className={styles.navIcon}/>
                                <span>Notifications</span>
                            </NavLink>
                        </li>
                        <li className={styles.list__item}>
                            <NavLink to={'/message'} className={({isActive}) => isActive && styles.active}>
                                <Message className={styles.navIcon}/>
                                <span>Messages</span>
                            </NavLink>
                        </li>
                        <li className={styles.list__item}>
                            <NavLink to={'/lists'} className={({isActive}) => isActive && styles.active}>
                                <NoteAltOutlined className={styles.navIcon}/>
                                <span>Lists</span>
                            </NavLink>
                        </li>
                        <li className={styles.list__item}>
                            <NavLink to={'/profile'} className={({isActive}) => isActive && styles.active}>
                                <PersonOutlined className={styles.navIcon}/>
                                <span>Profile</span>
                            </NavLink>
                        </li>
                        <li className={styles.list__item}>
                            <NavLink to={'/more'} className={({isActive}) => isActive && styles.active}>
                                <MoreHoriz className={styles.navIcon}/>
                                <span>More</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default SideBar;