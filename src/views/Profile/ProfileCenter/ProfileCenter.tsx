import React, {FC, useState} from 'react';
import styles from './ProfileCenter.module.scss';
import BlockHeaderBorder from "../../../components/layout/BlockHeaderBorder/BlockHeaderBorder";
import {MoreHoriz} from "@mui/icons-material";
import Tabs, {ITab} from "../../../components/layout/Tabs/Tabs";
import {IconButton} from "@mui/material";
import Posts from "../../../components/layout/Posts/Posts";
import {useAppSelector} from "../../../utils/hooks";
import {IUser} from "../../../models";
import SharePost from "../../../components/layout/SharePost/SharePost";
import {useParams} from "react-router-dom";


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

    const { user } = useAppSelector( state => state.auth )
    const { id } = useParams()
    const [activeTab, setActiveTab] = useState<"all" | "fixed">("all")

    return (
        <div className={styles.profileCenter}>
            {   user?.userInfo?.id === profile._id &&
                <div className={styles.postCreateAre}>
                    <SharePost/>
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