import React, {FC, useMemo} from 'react';
import {IUser} from "../../../../../models";
import styles from './FriendRowActions.module.scss'
import {useAppDispatch, useAppSelector, useDialogCreate} from "../../../../../utils/hooks";
import {Button} from "@mui/material";
import {acceptFriendship, cancelFollow, followPerson, rejectFriendship} from "../../../../../store/users/users.actions";
import {Link, useNavigate} from "react-router-dom";


interface IProps {
    user: IUser
}

const FriendRowActions: FC<IProps> = ({user}) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {user: me} = useAppSelector(state => state.auth)
    const { users } = useAppSelector( state => state.users )


    const [dialogStartHandler,isLoading] = useDialogCreate()

    const friendStatus = useMemo(() => {
        if (!users) return undefined;
        let currentUser = users.find( u => u._id === user._id)
        if (!currentUser) currentUser = user;
        const object = {
            followers: currentUser.followers,
            followingRequests: currentUser.followingRequests,
            followersRequests: currentUser.followersRequests,
        }
        console.log(object)
        let res = undefined;
        for (let values of Object.entries(object)) {
            if ((values[1] as string[]).includes(me!.userInfo!._id)) res = values[0];
        }
        return res;
    }, [user,users])

    return (
        <div className={styles.actions}>
            {friendStatus === "followers" && user._id !== me?.userInfo?._id && <>
                <span className={styles.friendAction} onClick={ () => dialogStartHandler(user,me,true)}>Write message</span>
                <Link to={`/profile/${user._id}`}>
                    <span className={styles.friendAction}>Go to profile</span>
                </Link>
            </>
            }
            { friendStatus === "followingRequests" && <Button onClick={ () => dispatch(acceptFriendship({
                userToAccept : user,
                myId : me!.userInfo!._id
            }))} variant={"outlined"}>
                Accept to friends
            </Button>}
            { friendStatus === "followingRequests" && <Button onClick={ () => dispatch(rejectFriendship({
                userToRejectId: user._id,
                myId : me!.userInfo!._id
            }))} variant={"outlined"}>
                Reject the request
            </Button>}
            { friendStatus === "followersRequests" && <Button onClick={ () => dispatch(cancelFollow({
                userToCancelId: user._id,
                myId : me!.userInfo!._id
            }))} variant={"outlined"}>
                Sended
            </Button>}
            { !friendStatus &&  user._id !== me?.userInfo?._id && <Button onClick={ () => dispatch(followPerson({
                personToFollow : user,
                myId :  me!.userInfo!._id
            }))} variant={"contained"}>
                Add friend
            </Button>}
            { !friendStatus &&  user._id === me?.userInfo?._id && <Button onClick={ () => navigate("/profile")} variant={"contained"}>
                Your profile
            </Button>}
        </div>
    );
}

export default FriendRowActions;