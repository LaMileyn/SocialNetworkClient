import React, {FC, useState} from 'react';
import styles from "../ProfileCenter.module.scss";
import BlockHeaderBorder from "../../../../components/layout/BlockHeaderBorder/BlockHeaderBorder";
import {IconButton} from "@mui/material";
import {MoreHoriz} from "@mui/icons-material";
import Tabs, {ITab} from "../../../../components/layout/Tabs/Tabs";
import Posts from "../../../../components/layout/Posts/Posts";
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
}

const ProfileCenterPosts: FC<IProps> = (props) => {

    const {id} = useParams();
    const [activeTab, setActiveTab] = useState<"all" | "fixed">("all")

    return (
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
    );
}

export default ProfileCenterPosts;