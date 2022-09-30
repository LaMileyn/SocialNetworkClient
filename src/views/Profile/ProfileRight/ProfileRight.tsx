import React, {FC, useEffect, useState} from 'react';
import styles from './ProfileRight.module.scss';
import BlockHeaderBorder from "../../../components/layout/BlockHeaderBorder/BlockHeaderBorder";
import {RefreshRounded} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import {IUser} from "../../../models";
import ProfileFriendsList from "./ProfileFriendsList/ProfileFriendsList";
import {useFetching} from "../../../utils/hooks";
import userService from "../../../services/user-service";
import FullSectionLoader from "../../../components/layout/FullSectionLoader/FullSectionLoader";

interface IProps {
    id: string
}

const ProfileRight: FC<IProps> = ({id}) => {

    const [friends, setFriends] = useState<Array<IUser>>([]);
    const [fetchFriends, friendsLoading, friendsLoadingError] = useFetching(async () => {
        const {data} = await userService.getFriends(id)
        setFriends(data)
    })
    useEffect(() => {
        fetchFriends()
    }, [id])

    return (
        <div className={styles.profileRight}>
            <BlockHeaderBorder icon={
                <IconButton onClick={ () => fetchFriends()}>
                    <RefreshRounded style={{
                        color: "var(--color-text-main)"
                    }}/>
                </IconButton>}>
                Friends
            </BlockHeaderBorder>
            {friendsLoading && <FullSectionLoader size={"small"}/>}
            {!friendsLoading && <ProfileFriendsList friends={friends}/>}
            <div className={styles.bottom}>
                <Button>See all</Button>
            </div>
        </div>
    );
}

export default ProfileRight;