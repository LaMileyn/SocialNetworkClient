import React, {FC, useMemo} from 'react';
import {Button} from "@mui/material";
import {
    acceptFriend,
    cancelFollow,
    followPerson,
    rejectFriend,
    unFollowPerson
} from "../../../../store/profile/profile.actions";
import {useAppDispatch} from "../../../../utils/hooks";
import {IUser, UserDto} from "../../../../models";


interface IProps {
    user : UserDto | null,
    profile : IUser
}

const ProfileCenterRequestButton: FC<IProps> = ({  profile, user }) => {

    const dispatch = useAppDispatch();

    const friendStatus  = useMemo( () =>{
        const object = {
            followers: profile.followers,
            followingRequests: profile.followingRequests,
            followersRequests: profile.followersRequests,
        }
        let res = undefined;
        for( let values of Object.entries(object)){
            if ((values[1] as string[]).includes(user!.userInfo!._id)) res = values[0];
        }
        return res;
    },[profile])

    return (
        <>
            { friendStatus === "followers"
                && <Button variant={"outlined"} onClick={ () =>
                    dispatch(unFollowPerson({ userToUnfollowId : profile._id, myId : user!.userInfo!._id }))} >UnFollow</Button>}
            { friendStatus === "followersRequests" && <Button onClick={ () => dispatch(cancelFollow({ receiverId : profile._id, myId : user!.userInfo!._id }))} variant={"outlined"}>Sended</Button>}
            { friendStatus === "followingRequests" && <Button onClick={ () => dispatch(acceptFriend({ userToAcceptId : profile._id, myId : user!.userInfo!._id }))} variant={"outlined"}>
                Accept to friends
            </Button>}
            { friendStatus === "followingRequests" && <Button onClick={ () => dispatch(rejectFriend({ userToRejectId : profile._id, myId : user!.userInfo!._id }))} variant={"outlined"}>
                Reject the request
            </Button>}
            { !friendStatus  && <Button onClick={ () =>
                dispatch(followPerson({ userToFollowId : profile._id, myId : user!.userInfo!._id }))} variant={"contained"}>Add to friends</Button>}
        </>
    );
}

export default ProfileCenterRequestButton;