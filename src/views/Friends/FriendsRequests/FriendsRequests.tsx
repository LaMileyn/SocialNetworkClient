import React, {FC, useMemo, useState} from 'react';
import styles from './FriendsRequests.module.scss';
import BlockHeaderBorder from "../../../components/layout/BlockHeaderBorder/BlockHeaderBorder";
import Tabs, {ITab} from "../../../components/layout/Tabs/Tabs";
import {useAppSelector} from "../../../utils/hooks";
import FriendsList from "../FriendsList/FriendsList";

interface IProps {
}

const FriendsRequests: FC<IProps> = (props) => {

    const {  followersRequests, followingRequests } = useAppSelector( state => state.friends)

    const [activeTab,setActiveTab] = useState<string>("followers")

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