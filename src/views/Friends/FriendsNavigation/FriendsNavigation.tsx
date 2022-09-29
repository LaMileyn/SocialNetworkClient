import React, {FC} from 'react';
import styles from './FriendsNavigation.module.scss'
import {useAppSelector} from "../../../utils/hooks";
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import {Avatar} from "@mui/material";

interface IProps {
}

const FriendsNavigation: FC<IProps> = (props) => {

    const {id} = useParams();
    const navigate = useNavigate()

    const { currentUser, followersRequests } = useAppSelector(state => state.friends)



    return (
        <div className={styles.nav}>
            {
                id && <div className={styles.friendInfo} onClick={ () => navigate(`/profile/${id}`)}>
                    {currentUser
                        && (
                            <>
                                <Avatar src={`/images/${currentUser.profilePicture}`}/>
                                <div className={styles.right}>
                                    <div className={styles.right__username}>{currentUser.username}</div>
                                    <div className={styles.right__text}>Go to the profile</div>
                                </div>
                            </>
                        )
                    }
                </div>
            }
            <ul className={styles.list}>
                <li className={styles.list__item}>
                    <NavLink to={id ? `/friends/${id}` : "/friends"} className={({isActive}) => isActive ? styles.active : null} end>
                        <span>{id ? `${currentUser?.username} friends` : `My friends`}</span>
                    </NavLink>
                </li>
                {
                    !id && <>
                        <li className={styles.list__item}>
                            <NavLink to={`/friends/requests`} className={({isActive}) => isActive ? styles.active : null}>
                                <span>Requests</span>
                                { followersRequests.length > 0 && <span className={styles.notific}>{followersRequests.length}</span>}
                            </NavLink>
                        </li>
                        <li className={styles.list__item}>
                            <NavLink to={`/friends/find`} className={({isActive}) => isActive ? styles.active : null}>
                                <span>Search</span>
                            </NavLink>
                        </li>
                    </>
                }
            </ul>
        </div>
    );
}

export default FriendsNavigation;