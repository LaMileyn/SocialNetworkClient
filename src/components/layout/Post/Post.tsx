import React, {FC} from 'react';
import styles from './Post.module.scss';
import {Avatar, IconButton} from "@mui/material";
import {
    AccessAlarm, CheckCircleRounded, Comment,
    FavoriteRounded, MoreHoriz, MoreVert, RemoveRedEyeOutlined,
    SendOutlined
} from "@mui/icons-material";
import {IPost, IUser} from "../../../models";
import PostOptionsMenu from "./PostOptionsMenu/PostOptionsMenu";


interface IProps {
    post: IPost,
    isOwner : boolean
}

const Post: FC<IProps> = ({post, isOwner}) => {

    return (
        <div className={styles.post}>
            <div className={styles.left}>
                <Avatar
                    src={`/images/${(post.user as IUser).profilePicture}`}/>
            </div>
            <div className={styles.right}>
                <div className={styles.right__top}>
                    <div className={styles.right__userInfo}>
                        <div className={styles.username}>{(post.user as IUser).username}</div>
                        <CheckCircleRounded/>
                        <div className={styles.accountId}>@{(post.user as IUser)._id}</div>
                    </div>
                    <div className={styles.right__optionsAndTime}>
                        <div className={styles.right__timeCreated}>
                            <AccessAlarm sx={{
                                width: 20,
                                height: 20
                            }}/>
                            {post.createdAt.split("T")[0]}
                        </div>
                        {   isOwner &&
                            <div className={styles.top__optionsMenu}>
                                <PostOptionsMenu post={post}/>
                            </div>
                        }

                    </div>

                </div>
                <div className={styles.right__mainContent}>
                    <p>{post.desc}</p>
                    {   post.img &&
                        <div className={styles.photos}>
                            <img
                                src={"/images/"+post.img}/>
                        </div>
                    }
                </div>
                <div className={styles.right__bottom}>
                    <div className={styles.iconItem}>
                        <IconButton color={"warning"}>
                            <FavoriteRounded/>
                        </IconButton>
                        <span>{post.likes.length}</span>
                    </div>
                    <div className={styles.iconItem}>
                        <IconButton>
                            <Comment/>
                        </IconButton>
                        <span>8</span>
                    </div>
                    <div className={styles.iconItem}>
                        <IconButton>
                            <SendOutlined/>
                        </IconButton>
                        <span>19</span>
                    </div>
                    <div className={styles.iconItem}>
                        <RemoveRedEyeOutlined/>
                        <span>{post.views}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;