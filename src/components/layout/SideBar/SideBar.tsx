import React, {FC} from 'react';
import styles from './SideBar.module.scss';
import {NavLink} from "react-router-dom";
import {
    ExploreOffOutlined, GamesOutlined,
    Message,
    MoreHoriz,
    NoteAltOutlined,
    Notifications, OtherHousesRounded, PersonOutlined
} from "@mui/icons-material";
import logo from './../../../assets/images/logoLarge.png'


interface IRoute {
    to : string,
    icon : JSX.Element,
    title : string
}
const routes : IRoute[] = [
    {
        to : "/feed",
        icon : <OtherHousesRounded className={styles.navIcon}/>,
        title : "Feed"
    },
    {
        to : "/explore",
        icon : <ExploreOffOutlined className={styles.navIcon}/>,
        title : "Explore"
    },
    {
        to : "/notifications",
        icon : <Notifications className={styles.navIcon}/>,
        title : "Notifications"
    },
    {
        to : "/messages",
        icon : <Message className={styles.navIcon}/>,
        title : "Messages"
    },
    {
        to : "/games",
        icon : <GamesOutlined className={styles.navIcon}/>,
        title : "Games"
    },
    {
        to : "/profile",
        icon : <PersonOutlined className={styles.navIcon}/>,
        title : "Profile"
    },
    {
        to : "/more",
        icon : <MoreHoriz className={styles.navIcon}/>,
        title : "More"
    },
]
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
                        {
                            routes.map( ({ icon , to, title}) => (
                                <li className={styles.list__item} key={to}>
                                    <NavLink to={to} className={({isActive}) => isActive && styles.active}>
                                        {icon}
                                        <span>{title}</span>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default SideBar;