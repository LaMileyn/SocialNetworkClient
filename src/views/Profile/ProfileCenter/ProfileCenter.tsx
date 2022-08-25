import React, {FC, useState} from 'react';
import styles from './ProfileCenter.module.scss';
import BlockHeaderBorder from "../../../components/layout/BlockHeaderBorder/BlockHeaderBorder";
import {MoreHoriz} from "@mui/icons-material";
import Tabs, {ITab} from "../../../components/layout/Tabs/Tabs";
import Post from "../../../components/layout/Post/Post";


const tabList : ITab[] = [
    {
        tabText : "Posts",
        value : "all"
    },
    {
        tabText : "Fixed Posts",
        value : "fixed"
    },
]

const ProfileCenter : FC = (props) => {
    const [activeTab,setActiveTab] = useState<"all" | "fixed">("all")

    return (
        <div className={styles.profileCenter}>
            <BlockHeaderBorder icon={<MoreHoriz style={{
                color: "var(--color-text-main)"
            }} />}>
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabList={tabList}/>
            </BlockHeaderBorder>
            <div className={styles.postsBlock}>
                {[...Array(5)].map( (el,index) =>{
                    return(
                        <Post key={index} />
                    )
                })}
            </div>
        </div>
    );
}

export default ProfileCenter;