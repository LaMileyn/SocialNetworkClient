import React, {FC} from 'react';
import styles from './ProfileLeft.module.scss';

import {
    CameraAltOutlined,
    CheckCircleRounded,
    GroupOutlined,
    LocationOnOutlined,
    MusicNoteOutlined,
    SettingsOutlined
} from "@mui/icons-material";
import {IUser} from "../../../models";
import {useAppSelector} from "../../../utils/hooks";
import {Link} from "react-router-dom";
import ProfileChangeAvatar from "../ProfileChangeAvatar/ProfileChangeAvatar";
interface IProps {
    profile: IUser
}

const ProfileLeft: FC<IProps> = ({profile}) => {

    const {user} = useAppSelector(state => state.auth);

    return (
        <div className={styles.profileLeft}>
            <div className={styles.profileLeft__top}>
                <div className={styles.profileArrow}>
                    <CheckCircleRounded/>
                </div>
                <div className={styles.user}>
                    <ProfileChangeAvatar profile={profile} user={user}/>
                    <span className={styles.user__fullName}>{profile.username}</span>
                    <span className={styles.user__url}>@{profile._id}</span>
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
                        <span className={styles.meta__value}>{profile.posts.length}</span>
                    </div>
                    <div className={styles.meta__item}>
                        <span className={styles.meta__title}>Friends</span>
                        <span className={styles.meta__value}>{profile?.followers.length}</span>
                    </div>
                    <div className={styles.meta__item}>
                        <span className={styles.meta__title}>Music</span>
                        <span className={styles.meta__value}>3456</span>
                    </div>
                </div>
            </div>
            <div className={styles.profileLeft__bottom}>
                <div className={styles.bottomSquares}>
                    <div className={styles.square}>
                        <GroupOutlined/>
                        Friends
                    </div>
                    <div className={styles.square}>
                        <MusicNoteOutlined/>
                        Music
                    </div>
                    <div className={styles.square}>
                        <CameraAltOutlined/>
                        Photos
                    </div>
                    {
                        profile._id === user?.userInfo?._id &&
                        <Link to={"/settings"} className={styles.square}>
                            <SettingsOutlined/>
                            Settings
                        </Link>

                    }
                </div>
            </div>
        </div>
    );
}

export default ProfileLeft;