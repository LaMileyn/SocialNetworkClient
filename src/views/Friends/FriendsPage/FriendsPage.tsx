import React, {FC, useEffect} from 'react';
import styles from './Friends.module.scss';
import {Outlet, useParams} from 'react-router-dom'
import {useAppDispatch} from "../../../utils/hooks";
import FriendsNavigation from "../FriendsNavigation/FriendsNavigation";
import {getCurrentUser, getFollowersRequests, getFollowingRequests} from "../../../store/friends/friends.actions";

const FriendsPage: FC = (props) => {

    const {id} = useParams()
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (id) dispatch(getCurrentUser(id))
    }, [id])

    return (
        <section className={styles.friends}>
            <div className={styles.wrapper}>
                <Outlet/>
                <FriendsNavigation/>
            </div>
        </section>
    );
}

export default FriendsPage;