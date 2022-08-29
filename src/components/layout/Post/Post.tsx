import React, {FC, useEffect, useState} from 'react';
import styles from './Post.module.scss';
import {Avatar, IconButton} from "@mui/material";
import {
    AccessAlarm, CheckCircleRounded, Comment,
    FavoriteRounded, RemoveRedEyeOutlined,
    SendOutlined
} from "@mui/icons-material";
import {IPost, IUser} from "../../../models";
import PostOptionsMenu from "./PostOptionsMenu/PostOptionsMenu";
import {Link} from "react-router-dom";
import ConfirmModal from "../Modal/ConfirmModal/ConfirmModal";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {deletePost, likePost} from "../../../store/posts/posts.actions";


interface IProps {
    post: IPost,
    isOwner: boolean
}

const Post: FC<IProps> = ({post, isOwner}) => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.auth)
    const [modalDelete, setModalDelete] = useState<boolean>(false);
    const [modalUpdate, setModalUpdate] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean>(false)
    useEffect(() => {
        setLiked((post.likes as string[]).includes(user!.userInfo!.id))
        console.log(post.likes)
    }, [user, post])
    const postLikeHandler = () => {
        dispatch(likePost({
                    postId: post._id,
                    userId: user!.userInfo!.id,
                    liked,
                }
            )
        )
        setLiked(!liked)
    }
    const postDeleteHandler = () =>{
        dispatch(deletePost(post._id))
    }
    return (
        <div className={styles.post}>
            <ConfirmModal open={modalDelete} text={"Are you sure you want to delete this post?"} onConfirm={postDeleteHandler} setOpen={setModalDelete}/>
            <div className={styles.left}>
                <Link to={`/profile/${(post.user as IUser)._id}`}>
                    <Avatar
                        src={`/images/${(post.user as IUser).profilePicture}`}/>
                </Link>
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
                        {isOwner &&
                            <div className={styles.top__optionsMenu}>
                                <PostOptionsMenu post={post} openDeleteMenu={setModalDelete}
                                                 openUpdateMenu={setModalUpdate}/>
                            </div>
                        }

                    </div>

                </div>
                <div className={styles.right__mainContent}>
                    <p>{post.desc}</p>
                    {post.img &&
                        <div className={styles.photos}>
                            <img
                                src={"/images/" + post.img}/>
                        </div>
                    }
                </div>
                <div className={styles.right__bottom}>
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
            </div>
        </div>
    );
}

export default Post;