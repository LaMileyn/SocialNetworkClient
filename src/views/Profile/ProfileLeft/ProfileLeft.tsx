import React, {FC} from 'react';
import styles from './ProfileLeft.module.scss';

import {
    CheckCircleRounded,
    LocationOnOutlined,

} from "@mui/icons-material";
import {IUser} from "../../../models";
import {useAppSelector} from "../../../utils/hooks";
import ProfileChangeAvatar from "../ProfileChangeAvatar/ProfileChangeAvatar";
import Meta from "./Meta/Meta";
import Squares from "./Squares/Squares";
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
                <Meta profile={profile}/>
            </div>
            <Squares profile={profile} user={user}/>
        </div>
    );
}

export default ProfileLeft;