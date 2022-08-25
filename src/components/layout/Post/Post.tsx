import React, {FC} from 'react';
import styles from './Post.module.scss';
import {Avatar, IconButton} from "@mui/material";
import {
    AccessAlarm, CheckCircleRounded, Comment,
    FavoriteRounded, RemoveRedEyeOutlined,
    SendOutlined
} from "@mui/icons-material";

const Post: FC = (props) => {
    return (
        <div className={styles.post}>
            <div className={styles.left}>
                <Avatar
                    src={"https://kartinkin.net/uploads/posts/2021-07/1625762622_31-kartinkin-com-p-brutalnii-paren-art-art-krasivo-35.jpg"}/>
            </div>
            <div className={styles.right}>
                <div className={styles.right__top}>
                    <div className={styles.right__userInfo}>
                        <div className={styles.username}>John Ramsey</div>
                        <CheckCircleRounded/>
                        <div className={styles.accountId}>@littleSociopat</div>
                    </div>
                    <div className={styles.right__timeCreated}>
                        <AccessAlarm sx={{
                            width: 20,
                            height: 20
                        }}/>
                        35 mins
                    </div>
                </div>
                <div className={styles.right__mainContent}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium commodi corporis deserunt
                        id ipsum labore non nostrum, porro quae quisquam, soluta suscipit ullam vitae voluptates.</p>
                    <div className={styles.photos}>
                        <img src={"https://kartinkin.net/uploads/posts/2021-07/1625762622_31-kartinkin-com-p-brutalnii-paren-art-art-krasivo-35.jpg"}/>
                    </div>
                </div>
                <div className={styles.right__bottom}>
                    <div className={styles.iconItem}>
                        <IconButton color={"warning"}>
                            <FavoriteRounded/>
                        </IconButton>
                        <span>123</span>
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
                        <span>8</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;