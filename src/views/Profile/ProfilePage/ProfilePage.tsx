import React, {FC, useEffect} from 'react';
import styles from './ProfilePage.module.scss';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {getProfile} from "../../../store/profile/profile.actions";


const ProfilePage : FC = (props) => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const { profile, fetching } = useAppSelector( state => state.profile)
    const { user } = useAppSelector( state => state.auth)
    useEffect(() => {
        const id =  params.id || user!.userInfo!.id
        if (!profile || (profile && profile._id !== id) ) dispatch(getProfile(id))
    }, [params])
    if (fetching) return <div>Loading...</div>
    return (
        <section className={styles.profilePage}>
            <div className={styles.top}>
                { profile
                    ? <img className={styles.top__background} src="https://i.ytimg.com/vi/Jzw9f774wag/maxresdefault.jpg" alt=""/>
                    : <img src="https://i.ytimg.com/vi/Jzw9f774wag/maxresdefault.jpg" alt=""/>
                }
            </div>
        </section>
    );
}

export default ProfilePage;