import React, {FC, useMemo, useState} from 'react';
import styles from './ProfileCenter.module.scss';
import BlockHeaderBorder from "../../../components/layout/BlockHeaderBorder/BlockHeaderBorder";
import {MoreHoriz} from "@mui/icons-material";
import Tabs, {ITab} from "../../../components/layout/Tabs/Tabs";
import {Button, IconButton} from "@mui/material";
import Posts from "../../../components/layout/Posts/Posts";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {IUser} from "../../../models";
import SharePost from "../../../components/layout/SharePost/SharePost";
import {useParams} from "react-router-dom";
import {
    acceptFriend,
    cancelFollow,
    followPerson,
    rejectFriend,
    unFollowPerson
} from "../../../store/profile/profile.actions";


const tabList: ITab[] = [
    {
        tabText: "Posts",
        value: "all"
    },
    {
        tabText: "Fixed Posts",
        value: "fixed"
    },
]

interface IProps {
    profile: IUser
}

const ProfileCenter: FC<IProps> = ({profile}) => {

    const dispatch = useAppDispatch();
    const { user } = useAppSelector( state => state.auth );
    const { id } = useParams();

    const [activeTab, setActiveTab] = useState<"all" | "fixed">("all")

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
    console.log(friendStatus)
    console.log(profile)
    return (
        <div className={styles.profileCenter}>
            {   user?.userInfo?._id === profile._id ?
                <div className={styles.postCreateAre}>
                    <SharePost/>
                </div>
                :
                <div className={styles.friendActionBar}>
                    <BlockHeaderBorder>
                        Friends Requests
                    </BlockHeaderBorder>
                    <div className={styles.friendActionBar__btns}>
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
                    </div>
                </div>
            }
            <div className={styles.postsArea}>
                <BlockHeaderBorder icon={<IconButton><MoreHoriz style={{
                    color: "var(--color-text-main)"
                }}/></IconButton>}>
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabList={tabList}/>
                </BlockHeaderBorder>
                <div className={styles.postsBlock}>
                    <Posts userId={id}/>
                </div>
            </div>
        </div>
    );
}

export default ProfileCenter;