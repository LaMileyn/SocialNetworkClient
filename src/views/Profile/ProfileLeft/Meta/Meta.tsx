import React, {FC} from 'react';
import styles from "./Meta.module.scss";
import {IUser} from "../../../../models";
import MetaItem from "../MetaItem/MetaItem";


interface IProps {
    profile : IUser
}
export interface MetaProfileLeft {
    title : string,
    value : string | number
}

const Meta: FC<IProps> = ({ profile }) => {
    const metaArr : MetaProfileLeft[] = [
        { title : "Posts", value : profile.posts.length },
        { title : "Friends", value : profile.followers.length },
        { title : "Music", value : "3456" },
    ]
    return (
        <div className={styles.meta}>
            {
                metaArr.map( (meta) =>{
                    return (
                        <MetaItem {...meta} key={meta.title}/>
                    )
                })
            }
        </div>
    );
}

export default Meta;