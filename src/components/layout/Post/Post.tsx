import React, {FC} from 'react';
import styles from './Post.module.scss';
import {Avatar, IconButton} from "@mui/material";
import {
    AccessAlarm, CheckCircleRounded, Comment,
    FavoriteRounded, RemoveRedEyeOutlined,
    SendOutlined
} from "@mui/icons-material";
import {IPost, IUser} from "../../../models";



interface IProps {
    post : IPost
}
const Post: FC<IProps> = ({ post }) => {
    return (
        <div className={styles.post}>
            <div className={styles.left}>
                <Avatar
                    src={"https://kartinkin.net/uploads/posts/2021-07/1625762622_31-kartinkin-com-p-brutalnii-paren-art-art-krasivo-35.jpg"}/>
            </div>
            <div className={styles.right}>
                <div className={styles.right__top}>
                    <div className={styles.right__userInfo}>
                        <div className={styles.username}>{(post.user as IUser).username}</div>
                        <CheckCircleRounded/>
                        <div className={styles.accountId}>@littleSociopat</div>
                    </div>
                    <div className={styles.right__timeCreated}>
                        <AccessAlarm sx={{
                            width: 20,
                            height: 20
                        }}/>
                        {post.createdAt}
                    </div>
                </div>
                <div className={styles.right__mainContent}>
                    <p>{post.desc}</p>
                    <div className={styles.photos}>
                        <img src={"https://kartinkin.net/uploads/posts/2021-07/1625762622_31-kartinkin-com-p-brutalnii-paren-art-art-krasivo-35.jpg"}/>
                    </div>
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