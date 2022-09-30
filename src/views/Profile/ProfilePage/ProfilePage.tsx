import React, {FC, useEffect} from 'react';
import styles from './ProfilePage.module.scss';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {getProfile} from "../../../store/profile/profile.actions";
import FullSectionLoader from "../../../components/layout/FullSectionLoader/FullSectionLoader";
import ProfileLeft from "../ProfileLeft/ProfileLeft";
import ProfileCenter from "../ProfileCenter/ProfileCenter";
import ProfileRight from "../ProfileRight/ProfileRight";
import ProfileBackground from "../ProfileBackground/ProfileBackground";


const ProfilePage : FC = (props) => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const { profile } = useAppSelector( state => state.profile)
    const { user } = useAppSelector( state => state.auth)

    useEffect(() => {
        const id =  params.id || user!.userInfo!._id
        if (!profile || (profile && profile._id !== id) ) dispatch(getProfile(id))
    }, [params])

    if (!profile) return <FullSectionLoader size={"large"}/>
    return (
        <section className={styles.profilePage}>
            <ProfileBackground profile={profile}/>
            <div className={styles.main}>
                <ProfileLeft profile={profile}/>
                <ProfileCenter profile={profile}/>
                <ProfileRight id={profile._id}/>
            </div>
        </section>
    );
}

export default ProfilePage;