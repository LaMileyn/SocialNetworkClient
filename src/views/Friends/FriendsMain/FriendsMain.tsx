import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import styles from './FriendsMain.module.scss';
import BlockHeaderBorder from "../../../components/layout/BlockHeaderBorder/BlockHeaderBorder";
import Tabs, {ITab} from "../../../components/layout/Tabs/Tabs";
import {useAppDispatch, useAppSelector, useDebounce} from "../../../utils/hooks";
import {getUserOnlineStatus} from "../../../utils/functions";
import {getUsers} from "../../../store/users/users.actions";
import {useParams} from "react-router-dom";
import FullSectionLoader from "../../../components/layout/FullSectionLoader/FullSectionLoader";
import FriendsRequestsExtra from "./FriendsRequestsExtra/FriendsRequestsExtra";
import FriendsList from "../FriendsList/FriendsList";
import FriendsSearchBar from "../FriendsSearchBar/FriendsSearchBar";

interface IProps {
}

const FriendsMain: FC<IProps> = (props) => {

    const dispatch = useAppDispatch();
    const {id : paramsId} = useParams();

    const [activeTab, setActiveTab] = useState<string>("all")
    const [searchFriendsValue, setSearchFriendsValue] = useState<string>("")
    const [inputValue, setInputValue] = useState<string>("")

    const debouncedSearchText = useDebounce(inputValue, 300)

    const {user: me} = useAppSelector(state => state.auth)
    const {users: friendsList, fetching, error,} = useAppSelector(state => state.users)
    const {followersRequests} = useAppSelector( state => state.friends )
    const {onlineUsers} = useAppSelector(state => state.socket)

    const onlineFriends = useMemo(() => {
        if (!onlineUsers || !friendsList) return []
        return friendsList.filter(user => me?.userInfo?._id !== user._id && getUserOnlineStatus(onlineUsers, user._id))
    }, [onlineUsers, friendsList])

    const onChangeInputFunction = useCallback((value: string) => {
        setInputValue(value)
    }, [])

    useEffect(() => {
        setActiveTab("all")
        dispatch(getUsers({
            search: debouncedSearchText,
            isFriend: true,
            id :  paramsId ? paramsId :me!.userInfo!._id
        }))
    }, [debouncedSearchText])

    const tabList: ITab[] = useMemo(() => {
        const tabs: ITab[] = [
            {tabText: "All friends", secondaryText: ( friendsList?.length.toString() || "0" ), value: "all"}
        ]
        const extraTabsForMe: ITab[] = [
            {tabText: "Online friends", secondaryText: ( onlineFriends?.length.toString() || "0" ), value: "online"}
        ]
        return paramsId ? tabs : tabs.concat(extraTabsForMe)
    }, [friendsList, onlineUsers])

    const filteredFriends = useMemo(() => {
        if (!friendsList) return [];
        if (activeTab === "online") return onlineFriends.filter(user => user.username.toLowerCase().includes(searchFriendsValue.toLowerCase()))
        return friendsList.filter(user => user.username.toLowerCase().includes(searchFriendsValue.toLowerCase()))
    }, [friendsList, onlineUsers, activeTab])

    if (!friendsList) return <FullSectionLoader size={"standart"}/>
    return (
        <div className={styles.mainBlock}>
            {
                followersRequests.length > 0 && <FriendsRequestsExtra followersRequests={followersRequests}/>
            }
            <div className={styles.mainPart}>
                <BlockHeaderBorder>
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabList={tabList}/>
                </BlockHeaderBorder>
                <FriendsSearchBar value={inputValue} onChangeInput={onChangeInputFunction}/>
                <FriendsList data={filteredFriends}/>
            </div>
        </div>
    );
}

export default FriendsMain;