import React, {FC} from 'react';
import styles from './ProfileCenter.module.scss';
import BlockHeaderBorder from "../../../components/layout/BlockHeaderBorder/BlockHeaderBorder";
import {Button} from "@mui/material";
import {useAppSelector, useDialogCreate} from "../../../utils/hooks";
import {IUser} from "../../../models";
import SharePost from "../../../components/layout/SharePost/SharePost";
import ProfileCenterRequestButton from "./ProfileCenterRequestButton/ProfileCenterRequestButton";
import ProfileCenterPosts from "./ProfileCenterPosts/ProfileCenterPosts";


interface IProps {
    profile: IUser
}

const ProfileCenter: FC<IProps> = ({profile}) => {

    const {user} = useAppSelector(state => state.auth);
    const [dialogStartHandler,isLoading] = useDialogCreate()

    return (
        <div className={styles.profileCenter}>
            {user?.userInfo?._id === profile._id ?
                <div className={styles.postCreateAre}>
                    <SharePost/>
                </div>
                :
                <div className={styles.friendActionBar}>
                    <BlockHeaderBorder>
                        Friends Requests
                    </BlockHeaderBorder>
                    <div className={styles.friendActionBar__btns}>
                        <ProfileCenterRequestButton profile={profile} user={user}/>
                        <Button variant={"contained"} color={"primary"} disabled={isLoading} onClick={ () => dialogStartHandler(profile,user,true)}>
                            Message
                        </Button>
                    </div>
                </div>
            }
        <ProfileCenterPosts/>
        </div>
    );
}

export default ProfileCenter;