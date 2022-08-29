import React, {FC} from 'react';
import styles from './SettingsWelcome.module.scss';
import {
    ArrowRightAltOutlined,
    CardTravelOutlined,
    HelpOutlined,
    HomeOutlined,
    LogoutRounded,
    NotificationsOutlined,
    PasswordOutlined
} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../utils/hooks";
import {Alert} from "@mui/material";


interface ICategoryLink {
    image: JSX.Element,
    text: string,
    to : string
}

interface ISettingsCategory {
    title: string,
    links: ICategoryLink[]
}

const SettingsCategorys: ISettingsCategory[] = [
    {
        title: "General",
        links: [
            {text: "Account Information", image: <HomeOutlined/>, to : "general/account-info"},
            {text: "Social Account", image: <HomeOutlined/>, to : "general/social-account"},
        ]
    },
    {
        title: "Account",
        links: [
            {text: "My Cards", image: <CardTravelOutlined/>,to : "account/cards"},
            {text: "Passwords", image: <PasswordOutlined/>,to : "account/password"},
        ]
    },
    {
        title: "Other",
        links: [
            {text: "Notification", image: <NotificationsOutlined/>,to : "other/notification"},
            {text: "Help", image: <HelpOutlined/>,to : "other/help"},
            {text: "logout", image: <LogoutRounded/>,to : "other/logout"},
        ]
    },
]

const SettingsWelcome: FC = (props) => {

    const navigate = useNavigate()
    const { currentUser } = useAppSelector( state => state.settings)

    return (
        <div className={styles.welcome}>
            <div className={styles.title}>
                <h2>Settings</h2>
            </div>
            {
                !currentUser?.activated && <div className={styles.alertEmail}>
                    <Alert variant="outlined" severity="warning" sx={{ color : "var(--color-text-main)"}}>
                        Your account is not activated, check your email.
                    </Alert>
                </div>
            }
            <div className={styles.categorys}>
                {
                    SettingsCategorys.map(category => {
                        return (
                            <div className={styles.category} key={category.title}>
                                <span>{category.title}</span>
                                <div className={styles.links}>
                                    {
                                        category.links.map(link => {
                                            return (
                                                <div className={styles.link} onClick={ () => navigate(link.to)}>
                                                    <div className={styles.link__left}>
                                                        <div className={styles.link__round}>
                                                            {link.image}
                                                        </div>
                                                        <span>{link.text}</span>
                                                    </div>
                                                    <div className={styles.link__right}>
                                                        <ArrowRightAltOutlined/>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
}

export default SettingsWelcome;