import React, {FC} from 'react';
import styles from './ProfileLeft.module.scss';
import {Avatar} from "@mui/material";
import {CheckCircleRounded, LocationOnOutlined, LocationOnRounded} from "@mui/icons-material";

const ProfileLeft: FC = (props) => {
    return (
        <div className={styles.profileLeft}>
            <div className={styles.profileArrow}>
                <CheckCircleRounded/>
            </div>
            <div className={styles.user}>
                <Avatar
                    src={"https://kartinkin.net/uploads/posts/2021-07/1625762622_31-kartinkin-com-p-brutalnii-paren-art-art-krasivo-35.jpg"}
                    sx={{
                        width: 75,
                        height: 75
                    }}/>
                <span className={styles.user__fullName}>Jack Sherigan</span>
                <span className={styles.user__url}>@itisnowhere</span>
                <span className={styles.user__location}>
                    <LocationOnOutlined/>
                    New York, USA
                </span>
                <span className={styles.user__status}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae culpa ea earum,
                    enim facilis fuga ratione voluptatibus? Autem impedit porro quae voluptatem voluptatum.
                </span>
            </div>
            <div className={styles.meta}>
                <div className={styles.meta__item}>
                    <span className={styles.meta__title}>Posts</span>
                    <span className={styles.meta__value}>124</span>
                </div>
                <div className={styles.meta__item}>
                    <span className={styles.meta__title}>Friends</span>
                    <span className={styles.meta__value}>245</span>
                </div>
                <div className={styles.meta__item}>
                    <span className={styles.meta__title}>Music</span>
                    <span className={styles.meta__value}>3456</span>
                </div>
            </div>
        </div>
    );
}

export default ProfileLeft;