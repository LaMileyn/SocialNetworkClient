import React, {FC, useEffect, useState} from 'react';
import styles from "./PostIcons.module.scss";
import {IconButton} from "@mui/material";
import {Comment, FavoriteRounded, RemoveRedEyeOutlined, SendOutlined} from "@mui/icons-material";
import {IPost, UserDto} from "../../../../models";
import {likePost} from "../../../../store/posts/posts.actions";
import {useAppDispatch} from "../../../../utils/hooks";


interface IProps {
    post: IPost,
    user: UserDto | null;
}



const PostIcons: FC<IProps> = ({post, user}) => {

    const dispatch = useAppDispatch();
    const [liked, setLiked] = useState<boolean>(false)
    useEffect(() => {
        setLiked((post.likes as string[]).includes(user!.userInfo!._id))
    }, [user, post])


    const postLikeHandler = () => {
        dispatch(likePost({
                    postId: post._id,
                    userId: user!.userInfo!._id,
                    liked,
                }
            )
        )
        setLiked(!liked)
    }
    return (
        <div className={styles.icons}>
            <div className={styles.iconItem}>
                <IconButton color={"warning"} onClick={postLikeHandler}>
                    <FavoriteRounded style={{color: liked ? "red" : "var(--color-grey-middle)"}}/>
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
    );
}

export default PostIcons;