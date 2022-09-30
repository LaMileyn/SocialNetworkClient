import React, {FC, useEffect, useMemo, useState} from 'react';
import styles from './FriendsRequests.module.scss';
import BlockHeaderBorder from "../../../components/layout/BlockHeaderBorder/BlockHeaderBorder";
import Tabs, {ITab} from "../../../components/layout/Tabs/Tabs";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import FriendsList from "../FriendsList/FriendsList";
import {getFollowersRequests, getFollowingRequests} from "../../../store/friends/friends.actions";

interface IProps {
}

const FriendsRequests: FC<IProps> = (props) => {

    const dispatch = useAppDispatch()
    const {  followersRequests, followingRequests } = useAppSelector( state => state.friends)

    const [activeTab,setActiveTab] = useState<string>("followers")

    useEffect( () =>{
        dispatch(getFollowersRequests())
        dispatch(getFollowingRequests())
    },[])

    const tabList: ITab[] = useMemo(() => {
        const tabs: ITab[] = [
            {tabText: "Followers Requests", secondaryText:  followersRequests.length.toString() || "0", value: "followers"}
        ]
        const extraTabsForMe: ITab[] = [
            {tabText: "Following Requests", secondaryText: followingRequests.length.toString() || "0", value: "following"}
        ]
        return followingRequests.length === 0 ? tabs : tabs.concat(extraTabsForMe)
    }, [followersRequests, followingRequests])



    return (
        <div className={styles.requests}>
            <BlockHeaderBorder>
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabList={tabList}/>
            </BlockHeaderBorder>
            <FriendsList data={ activeTab === "followers" ? followersRequests : followingRequests }/>
        </div>
    );
}

export default FriendsRequests;