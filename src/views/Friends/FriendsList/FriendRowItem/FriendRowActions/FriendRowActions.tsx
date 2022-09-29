import React, {FC, useMemo} from 'react';
import {IUser} from "../../../../../models";
import styles from './FriendRowActions.module.scss'
import {useAppDispatch, useAppSelector, useDialogCreate} from "../../../../../utils/hooks";
import {Button} from "@mui/material";
import {acceptFriendship, rejectFriendship} from "../../../../../store/users/users.actions";
import {Link} from "react-router-dom";


interface IProps {
    user: IUser
}

const FriendRowActions: FC<IProps> = ({user}) => {

    const dispatch = useAppDispatch()
    const {user: me} = useAppSelector(state => state.auth)

    const [dialogStartHandler,isLoading] = useDialogCreate()

    const friendStatus = useMemo(() => {
        const object = {
            followers: user.followers,
            followingRequests: user.followingRequests,
            followersRequests: user.followersRequests,
        }
        let res = undefined;
        for (let values of Object.entries(object)) {
            if ((values[1] as string[]).includes(me!.userInfo!._id)) res = values[0];
        }
        return res;
    }, [user])

    return (
        <div className={styles.actions}>
            {friendStatus === "followers" && <>
                <span className={styles.friendAction} onClick={ () => dialogStartHandler(user,me,true)}>Write message</span>
                <Link to={`/profile/${user._id}`}>
                    <span className={styles.friendAction}>Go to profile</span>
                </Link>
            </>
            }
            { friendStatus === "followingRequests" && <Button onClick={ () => dispatch(acceptFriendship(user))} variant={"outlined"}>
                Accept to friends
            </Button>}
            { friendStatus === "followingRequests" && <Button onClick={ () => dispatch(rejectFriendship(user._id))} variant={"outlined"}>
                Reject the request
            </Button>}
        </div>
    );
}

export default FriendRowActions;